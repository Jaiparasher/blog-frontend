import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateCommentForm from "../components/CreateCommentForm";
import Loader from "../components/Loader";
import { fetchPost } from "../features/posts/postSlice";
import { fetchComments } from "../features/comments/commentSlice";

const PostDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col w-full px-7 py-5">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg  p-6 mb-8">
            {post && post.photo && (
              <div className="overflow-hidden flex justify-center items-center">
              <img
                src={post.photo}
                alt={post.title}
                className="max-w-[50%] rounded-lg mb-6 h-auto object-cover"
              />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{post && post.title}</h1>
            <div className="container px-4 py-1">
            <p className="text-lg text-gray-700 break-words max-w-full">{post && post.content}</p>
            </div>
          </div>
          <CreateCommentForm postId={post && post._id} />
          {comments && comments.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6 mt-8">
              <h3 className="text-2xl font-semibold mb-4">Comments</h3>
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-b border-gray-300 py-4"
                >
                  <div className="flex items-center mb-2">
                    <img className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 mr-4" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" about="avatar"/>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {comment.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
