// components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-white text-black shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/"><svg width="116" height="60" viewBox="0 0 116 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.3983 41.5541C27.7265 41.5541 27.1819 41.0095 27.1819 40.3377V37.1591L37.1025 25.0445C37.1128 25.032 37.1184 25.0162 37.1184 24.9999C37.1184 24.9611 37.0869 24.9295 37.048 24.9295H27.1819V20.5345H41.8576C42.5294 20.5345 43.074 21.0792 43.074 21.751V24.9614L33.1852 37.0441C33.1749 37.0567 33.1693 37.0725 33.1693 37.0887C33.1693 37.1276 33.2008 37.1591 33.2397 37.1591H43.2332V41.5541H28.3983Z" fill="#1E2026"/>
<path d="M49.9869 42C48.161 42 46.8021 41.363 45.9104 40.0891C45.0399 38.8152 44.6046 36.8619 44.6046 34.2291V24.7385H49.764V34.1654C49.764 35.3969 49.9339 36.2568 50.2736 36.7451C50.6345 37.2334 51.1441 37.4776 51.8023 37.4776C52.2694 37.4776 52.694 37.3608 53.0762 37.1273C53.4796 36.8725 53.8299 36.5009 54.1272 36.0126C54.4244 35.503 54.6473 34.8555 54.796 34.0699C54.9658 33.2843 55.0507 32.3395 55.0507 31.2354V24.7385H60.2101V41.5541H55.8151V34.9935H55.5922C55.4648 36.6283 55.1781 37.9659 54.7323 39.0063C54.2864 40.0254 53.6707 40.7792 52.8851 41.2675C52.0995 41.7558 51.1335 42 49.9869 42Z" fill="#1E2026"/>
<path d="M61.4104 41.5541L68.4487 20.5345H75.1368L82.1433 41.5541H76.5699L71.8565 24.7066H71.6654L66.92 41.5541H61.4104ZM65.3913 37.8279V34.1973H78.7993V37.8279H65.3913Z" fill="#1E2026"/>
<path d="M86.1641 18C86.1641 18 86.5962 20.2217 88.8181 20.654C88.8181 20.654 86.5962 21.0863 86.1641 23.308C85.7321 21.0863 83.5101 20.654 83.5101 20.654C85.7321 20.2217 86.1641 18 86.1641 18Z" fill="#FFB800"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M83.5504 21.8876V41.5542H88.7416V21.9138C88.1514 22.3438 87.5615 22.9099 87.0825 23.6498C86.7919 24.0986 85.5364 24.0986 85.2458 23.6498C84.7569 22.8948 84.1526 22.3206 83.5504 21.8876Z" fill="#1E2026"/>
</svg>
</Link>
                </div>
                <nav>
                    {status ? (
                        <div>
                            <Link to="/posts/create" className="mr-4 border px-3 py-1 rounded-xl  hover:bg-black hover:text-white hover:px-3 hover:py-2 transition-all">Create Post</Link>
                            <button onClick={handleLogout} className="mr-4 border px-3 py-1 rounded-xl text-white bg-[#6947BF] hover:bg-black hover:px-3 hover:py-2 transition-all">Logout</button>
                        </div>
                    ) : null}
                    {!status?( (
                        <div>
                            <Link to="/login">
                            <button className="mr-4 border px-3 py-1 rounded-xl  hover:bg-black hover:text-white hover:px-3 hover:py-2 transition-all">Login</button> 
                            </Link>
                            <Link to="/signup">
                            <button className="mr-4 border px-3 py-1 rounded-xl text-white bg-[#6947BF] hover:bg-black hover:px-3 hover:py-2 transition-all">Register</button>
                            
                            </Link>
                        </div>
                    )):null}
                </nav>
            </div>
        </header>
    );
};

export default Header;
