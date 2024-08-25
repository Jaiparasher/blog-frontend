import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './features/store';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
// import EditPost from './pages/EditPost';
import PrivateRoute from './routes/PrivateRoute';
import Header from './components/Header';
import { getCurrentUser } from './features/auth/authSlice';
import SearchedPostsPage from './pages/SearchedPostsPage';
// import Footer from './components/Footer';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);
    return (
        <>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex flex-row justify-center items-center w-full">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/posts/:id" element={<PostDetailPage />} />
                            <Route path="/search" element={<SearchedPostsPage />} />
                            <Route
                                path="/posts/create"
                                element={
                                    <PrivateRoute>
                                        <CreatePostPage />
                                    </PrivateRoute>
                                }
                            />
                            {/* <Route
                                path="/posts/edit/:id"
                                element={
                                    <PrivateRoute>
                                        <EditPost />
                                    </PrivateRoute>
                                }
                            /> */}
                        </Routes>
                    </main>
                    {/* <Footer /> */}
                </div>
            </Router>
        </>
    );
}

export default App;
