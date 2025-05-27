import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">No posts available</h2>
      </Container>
    );
  }
  return (
    <Container className="min-h-screen py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">All Posts</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AllPosts;
