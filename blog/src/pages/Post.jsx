import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container } from "../components";
import DOMPurify from "dompurify";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [sanitizedHtmlContent, setSanitizedHtmlContent] = useState("");
  const isAuthor = post && userData ? post.userId === userData.$id : false; // Check if the post has an author and if the current user is the author

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setSanitizedHtmlContent(DOMPurify.sanitize(post.content));
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <Container className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center p-6 ">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          {post.title}
        </h1>
        {post.featuredImage && (
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full max-w-2xl rounded-lg shadow-lg mb-6"
          />
        )}
        <div className="w-full mb-6 text-right">
          <h2 className="text-sm font-medium text-gray-500">
            {new Date(post.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </h2>
        </div>
        <div className="prose max-w-prose text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}></div>
        </div>
      </div>
      <div className="w-full flex justify-end pt-2 pe-5">
        {isAuthor && (
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/edit-post/${post.$id}`)}
              className="px-4 py-1 cursor-pointer border-blue-400 border-b text-blue-800 rounded-md shadow-md hover:bg-blue-400 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              onClick={deletePost}
              className="px-4 py-1 cursor-pointer border-red-400 border-b text-red-800 rounded-md shadow-md hover:bg-red-400 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </Container>
  ) : (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-medium text-gray-500">Loading...</div>
    </Container>
  );
}

export default Post;
