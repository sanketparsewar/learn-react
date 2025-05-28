import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div>
      <Container className="min-h-screen">
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold text-gray-600 animate-pulse">
        Loading...
      </div>
    </Container>
  );
}

export default EditPost;
