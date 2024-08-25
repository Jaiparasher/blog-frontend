import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);  // Add state for the photo file
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.posts);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', photo); 
    console.log(formData);
    

    dispatch(createPost(formData)).then(() => {
      navigate('/');
    });
  };
  if(isLoading){
    return (<Loader/>)
  }

  return (
    <div className="flex justify-center items-center w-full h-[86vh] bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="content">Content</label>
            <textarea
              id="content"
              className="w-full p-2 border border-gray-300 rounded"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#6947BF] text-white py-2 rounded-lg hover:bg-black"
            disabled={isLoading}
          >
            {isLoading ? 'Posting...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
