import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import PostList from '../components/PostList';
import { searchPosts } from '../features/posts/postSlice';

const SearchedPostsPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    console.log(query);
    
    const { posts, loading, error } = useSelector(state => state.posts);

    useEffect(() => {
        if (query) {
            dispatch(searchPosts(query));
        }
    }, [dispatch,query]);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="px-10">
            <h2 className="text-2xl font-bold my-4">Search Results for "{query}"</h2>
            <PostList posts={posts} />
        </div>
    );
};

export default SearchedPostsPage;
