import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard, Input, Select, Pagination } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState("Latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getAllPostsService = () => {
    const limit = 8;
    const offset = (page - 1) * limit;
    setLoading(true);
    service
      .getAllPosts({ isActive: true, limit, search, sort, offset })
      .then((posts) => {
        if (posts) {
          setTotalPages(Math.ceil(posts.total / limit));
          setPosts(posts.documents);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllPostsService();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getAllPostsService();
  }, [search, sort]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <Container className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mt-4 text-gray-800">
        All Posts
      </h1>

      <div className="px-4 flex flex-row gap-2 py-2">
        <Input
          onInput={(e) => {
            setSearch(e.target.value);
          }}
          className="w-full"
          type="text"
          label="Search"
          placeholder="Enter title of post"
        />
        <Select
          label="Sort"
          options={["Latest", "Oldest"]}
          defaultValue={"Latest"}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>

      <div className="flex-grow">
        {loading ? (
          <Container className="my-10 flex items-center justify-center">
            <div className="text-xl font-semibold animate-pulse text-gray-600">
              Loading...
            </div>
          </Container>
        ) : posts.length === 0 ? (
          <Container className="my-10 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-600">
              No posts available
            </h3>
          </Container>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {posts.map((post) => (
              <div key={post.$id} className="flex justify-center">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handleChangePage}
      />
    </Container>
  );
}

export default AllPosts;
