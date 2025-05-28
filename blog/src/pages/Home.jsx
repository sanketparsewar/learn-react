import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard, Button } from "../components";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    service.getAllPosts({ isActive: true, limit: 8 }).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      } else setLoading(false);
    });
  }, []);

  return loading ? (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold text-gray-600 animate-pulse">
        Loading...
      </div>
    </Container>
  ) : posts.length === 0 ? (
    <Container className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">
        No posts available!
      </h2>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </Container>
  ) : (
    <Container className="min-h-screen">
      <div className="mb-5">
        <img
          src="https://zomatoblog.com/wp-content/uploads/2025/04/1.png"
          alt="Banner"
          className="w-full md:h-70 object-cover sm:h-50 shadow"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {posts.map((post) => (
          <div key={post.$id} className="flex justify-center">
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/all-posts")}
          className="px-4 py-2 text-blue-500 hover:text-blue-800 cursor-pointer "
        >
          View more ...
        </button>
      </div>
    </Container>
  );
}

export default Home;
