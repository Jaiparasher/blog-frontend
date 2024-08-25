import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../features/comments/commentSlice';

const CreateCommentForm = ({ postId }) => {
    const user = useSelector((state) => state.auth.user);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ user: user._id, post: postId, comment }));
        setComment('');
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6947BF]"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-[#6947BF] hover:bg-black text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateCommentForm;
