import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <nav className="navbar">
            <div className="nav-content">
                <div className="nav-left">
                    <Link to="/dashboard" className="nav-logo">
                        <i className='bx bx-code-alt'></i>
                        <span>SkillShare</span>
                    </Link>
                    <div className="nav-search">
                        <i className='bx bx-search'></i>
                        <input type="text" placeholder="Search" />
                    </div>
                </div>

                <div className="nav-center">
                    <Link to="/dashboard" className="nav-item">
                        <i className='bx bx-home'></i>
                        <span>Home</span>
                    </Link>
                    <Link to="/network" className="nav-item">
                        <i className='bx bx-group'></i>
                        <span>Network</span>
                    </Link>
                    <Link to="/jobs" className="nav-item">
                        <i className='bx bx-briefcase'></i>
                        <span>Jobs</span>
                    </Link>
                    <Link to="/messages" className="nav-item">
                        <i className='bx bx-message-square-dots'></i>
                        <span>Messages</span>
                    </Link>
                    <Link to="/notifications" className="nav-item">
                        <i className='bx bx-bell'></i>
                        <span>Notifications</span>
                    </Link>
                </div>

                <div className="nav-right">
                    <div className="nav-profile">
                        <Link to="/profile" className="nav-item">
                            <img 
                                src="/default-avatar.png" 
                                alt="Profile"
                                className="nav-avatar"
                            />
                            <span>Me</span>
                        </Link>
                    </div>
                    <button onClick={handleLogout} className="nav-item">
                        <i className='bx bx-log-out'></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;