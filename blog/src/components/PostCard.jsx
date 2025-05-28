import React, { useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ post }) {
  return (
    post && (
      <Link to={`/post/${post.$id}`}>
        <div className="w-full p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-transform duration-400 transform hover:scale-105">
          <div className="flex justify-center mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-md md:w-[17rem] md:h-[200px] object-cover sm:max-w-full  "
            />
          </div>
          <div
            className={`${
              post.status == "active" ? "" : "flex justify-between"
            }`}
          >
            <span
              hidden={post.status == "active"}
              className="bg-red-300 rounded-2xl px-2 text-red-800"
            >
              In Active
            </span>
            <p className="text-sm text-gray-500 text-end">
              {new Date(post.$createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </p>
          </div>

          <h2 className="text-lg font-semibold text-start">{post.title}</h2>
          <div className="prose max-w-prose text-gray-700">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.split(" ").slice(0, 5).join(" ") + "...",
              }}
            ></div>
          </div>
        </div>
      </Link>
    )
  );
}

export default PostCard;
