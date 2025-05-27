import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">No Posts Available</h2>
          <p className="text-gray-500 mt-2">Login to read posts or create new ones.</p>
        </div>
      </Container>
    )
  }
  return (
    <Container>
      <div className="flex flex-wrap justify-center gap-6 ">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Home;
