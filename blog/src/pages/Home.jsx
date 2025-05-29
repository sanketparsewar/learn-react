import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard, Button } from "../components";
import { useNavigate } from "react-router-dom";

function Home() {
  // State to hold posts
  const [posts, setPosts] = useState([]);

  // State to show loading spinner
  const [loading, setLoading] = useState(true);

  // Hook for navigation
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    service.getAllPosts({ isActive: true, limit: 8 }).then((posts) => {
      if (posts) {
        // If posts exist, store them in state
        setPosts(posts.documents);
        setLoading(false);
      } else setLoading(false); // Handle null case
    });
  }, []);

  // Show loading indicator while fetching
  return loading ? (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold text-gray-600 animate-pulse flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 animate-spin"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg><span>Loading...</span>
      </div>
    </Container>
  ) : posts.length === 0 ? (
    // If no posts available
    <Container className=" flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">
        No posts available!
      </h2>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        onClick={() => window.location.reload()} // Reload page to refetch
      >
        Refresh
      </button>
    </Container>
  ) : (
    // When posts are available
    <Container>
      {/* Banner image section */}
      <div className="mb-5">
        <img
          src="https://zomatoblog.com/wp-content/uploads/2025/04/1.png"
          alt="Banner"
          className="w-full md:h-70 object-cover sm:h-50 shadow"
        />
      </div>

      {/* Grid layout for posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {posts.map((post) => (
          <div key={post.$id} className="flex justify-center">
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {/* Button to navigate to all posts */}
      <div className="text-center">
        <button
          onClick={() => navigate("/all-posts")}
          className="px-4 mt-5 py-2 text-blue-500 hover:text-blue-800 cursor-pointer "
        >
          View more ...
        </button>
      </div>
    </Container>
  );
}

export default Home;
