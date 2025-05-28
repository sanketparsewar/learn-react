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
      <div className="w-full flex justify-end pt-2 pe-10">
        {isAuthor && (
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/edit-post/${post.$id}`)}
              className="px-4 py-1 cursor-pointer border-blue-400 border-b text-blue-800 rounded-md shadow-md hover:bg-blue-400 transition-all"
            >
              Edit
            </button>
            <button
              onClick={deletePost}
              className="px-4 py-1 cursor-pointer border-red-400 border-b text-red-800 rounded-md shadow-md hover:bg-red-400 transition-all"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center p-6 pt-0">
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
    </Container>
  ) : (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-medium text-gray-500">Loading...</div>
    </Container>
  );
}

export default Post;
