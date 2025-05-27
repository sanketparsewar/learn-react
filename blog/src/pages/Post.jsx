import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container } from "../components";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false; // Check if the post has an author and if the current user is the author

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
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
    <div>
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          {post.featuredImage && (
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full max-w-md mb-4"
            />
          )}
          <div className="w-full mb-6">
            <h1 className="text-2xl fontBold" >{post.title}</h1>
          </div>
            {/* <div className="text-gray-600 mb-4">
                {parse(post.content)}
            </div> */}
          <div className="prose max-w-prose">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          {isAuthor && (
            <div className="mt-4">
              <button
                onClick={() => navigate(`/edit-post/${post.$id}`)}
                className="btn btn-primary mr-2"
              >
                Edit Post
              </button>
              <button onClick={deletePost} className="btn btn-danger">
                Delete Post
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
