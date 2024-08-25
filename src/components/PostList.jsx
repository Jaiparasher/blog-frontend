import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col h-full">
              {post.photo && (
                <img
                  src={post.photo}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 flex-grow overflow-hidden text-ellipsis">
                {post.content.substring(0, 150)}...
              </p>
              <Link
                to={`/posts/${post._id}`}
                className="mt-4 text-[#6947BF] hover:underline self-start"
              >
                Read More
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
