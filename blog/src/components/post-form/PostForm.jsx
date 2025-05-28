import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  //this gives watch method to continious watch the form field
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
      if (file) {
        service.deleteFile(post.featuredImage);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string")
      return value
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    return "";
  });

  useEffect(() => {
    if (post)
      setValue("slug", slugTransform(post.$id, { shouldValidate: true }));
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col md:flex-row gap-4 p-5 bg-white shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-5 flex-2">
        <div>
          <Input
            label="Title"
            {...register("title", { required: true })}
            placeholder="Enter post title"
            className="w-full"
          />
        </div>
        <div>
          <Input
            label="Slug"
            {...register("slug", { required: true })}
            placeholder="Generated slug"
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
            className="w-full"
          />
        </div>
        <div>
          <RTE
            label="Content"
            control={control}
            name="content"
            defaultValue={getValues("content")}
            placeholder="Write your post content here..."
            className="min-h-[200px] border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 flex-1">
        <div>
          <Input
            label="Featured Image"
            type="file"
            {...register("image", { required: !post })} // required if post is not provided
            accept="image/*"
            className="w-full"
          />
          {post && (
            <div className="mt-2 text-center">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt="Featured"
                className="w-full max-w-xs h-auto rounded-md border border-gray-300 mx-auto"
              />
            </div>
          )}
        </div>
        <div>
          <Select
            options={["active", "inactive"]}
            label="Status"
            defaultValue={post ? post.status : "active"}
            {...register("status", { required: true })}
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className="w-full py-2 text-white rounded-md hover:opacity-90"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
