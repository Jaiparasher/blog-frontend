import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <Link
        to="/"
        className="bg-[#6947BF] text-white py-2 px-4 rounded-lg hover:bg-black"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
