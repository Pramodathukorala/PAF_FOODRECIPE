import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/profile/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/posts/feed', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newPost })
            });
            
            if (response.ok) {
                setNewPost('');
                fetchPosts();
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:8080/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchPosts();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                {/* Left Sidebar */}
                <div className="dashboard-sidebar left-sidebar">
                    <div className="profile-card">
                        <div className="profile-cover"></div>
                        <div className="profile-info">
                            <Link to="/profile">
                                <img 
                                    src={profile.profilePicture || '/default-avatar.png'} 
                                    alt="Profile" 
                                    className="profile-picture"
                                />
                            </Link>
                            <h2>{profile.firstName} {profile.lastName}</h2>
                            <p>{profile.headline}</p>
                        </div>
                        <div className="profile-stats">
                            <div className="stat">
                                <span className="label">Connections</span>
                                <span className="value">{profile.connectionCount}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Post Views</span>
                                <span className="value">0</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    <div className="post-form">
                        <img 
                            src={profile.profilePicture || '/default-avatar.png'} 
                            alt="Profile" 
                            className="post-avatar"
                        />
                        <form onSubmit={handlePostSubmit}>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Share your thoughts..."
                            />
                            <div className="post-actions">
                                <button type="button" className="post-action">
                                    <i className='bx bx-image-alt'></i>
                                    <span>Photo</span>
                                </button>
                                <button type="button" className="post-action">
                                    <i className='bx bx-video'></i>
                                    <span>Video</span>
                                </button>
                                <button type="button" className="post-action">
                                    <i className='bx bx-calendar-event'></i>
                                    <span>Event</span>
                                </button>
                                <button type="submit" className="post-submit">Post</button>
                            </div>
                        </form>
                    </div>

                    <div className="posts-list">
                        {posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <img 
                                        src={post.author.profilePicture || '/default-avatar.png'} 
                                        alt={post.author.name} 
                                        className="post-avatar"
                                    />
                                    <div className="post-meta">
                                        <Link to={`/profile/${post.author.username}`} className="author-name">
                                            {post.author.firstName} {post.author.lastName}
                                        </Link>
                                        <p className="author-headline">{post.author.headline}</p>
                                        <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <p>{post.content}</p>
                                    {post.media && (
                                        <div className="post-media">
                                            <img src={post.media} alt="Post media" />
                                        </div>
                                    )}
                                </div>
                                <div className="post-footer">
                                    <button 
                                        className={`post-action ${post.liked ? 'liked' : ''}`}
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <i className={`bx ${post.liked ? 'bxs-like' : 'bx-like'}`}></i>
                                        <span>Like</span>
                                    </button>
                                    <button className="post-action">
                                        <i className='bx bx-comment'></i>
                                        <span>Comment</span>
                                    </button>
                                    <button className="post-action">
                                        <i className='bx bx-share'></i>
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="dashboard-sidebar right-sidebar">
                    <div className="news-card">
                        <h3>Learning Resources</h3>
                        <ul className="news-list">
                            <li>
                                <i className='bx bx-trending-up'></i>
                                <div>
                                    <h4>Top Programming Languages 2025</h4>
                                    <p>Trending in Software Development</p>
                                </div>
                            </li>
                            <li>
                                <i className='bx bx-code-block'></i>
                                <div>
                                    <h4>Master React.js</h4>
                                    <p>Popular course among your network</p>
                                </div>
                            </li>
                            <li>
                                <i className='bx bx-book'></i>
                                <div>
                                    <h4>New Learning Paths</h4>
                                    <p>Curated for your skill level</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;