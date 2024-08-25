import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../features/posts/postSlice';
import Loader from '../components/Loader';
import PostList from '../components/PostList';

const HomePage = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, error } = useSelector(state => state.posts); // Changed loading to isLoading
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(!token){
        navigate('/register');
    }

    if (isLoading) return <Loader />; // Changed loading to isLoading
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="px-10">
            <form onSubmit={handleSearch} className="mb-4">
                {/* Using the search bar component */}
                <div className='flex items-center justify-center h-24 rounded-md'>
                <div className="mb-4 flex w-full sm:w-3/4 flex-wrap items-stretch">
                    <input
                        type="search"
                        className="m-0 block flex-auto rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-800 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-primary"
                        placeholder="Search posts..."
                        aria-label="Search"
                        aria-describedby="button-addon2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="button-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="black"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                </div>
            </form>
            <h2 className="text-2xl font-bold my-4">Recent Posts</h2>
            <PostList posts={posts} />
        </div>
    );
};

export default HomePage;
