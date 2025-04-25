import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [error, setError] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, [username]);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/auth');
                return;
            }

            const response = await fetch(
                username ? 
                `http://localhost:8080/api/profile/${username}` :
                'http://localhost:8080/api/profile/me',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setProfile(data);
            setIsCurrentUser(!username);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError(error.message);
        }
    };

    const handleUpdateProfile = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            setProfile(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message);
        }
    };

    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/profile/picture', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update profile picture');
            }

            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error updating profile picture:', error);
            setError(error.message);
        }
    };

    const handleConnect = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/profile/connect/${username}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to connect with user');
            }

            fetchProfile();
        } catch (error) {
            console.error('Error connecting with user:', error);
            setError(error.message);
        }
    };

    const handleDisconnect = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/profile/connect/${username}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to disconnect from user');
            }

            fetchProfile();
        } catch (error) {
            console.error('Error disconnecting from user:', error);
            setError(error.message);
        }
    };

    if (error) return <div className="error-message">{error}</div>;
    if (!profile) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info">
                    <div className="profile-picture">
                        <img 
                            src={profile.profilePicture || '/default-avatar.png'} 
                            alt="Profile" 
                        />
                        {isCurrentUser && (
                            <input
                                type="file"
                                onChange={handleProfilePictureChange}
                                accept="image/*"
                                className="profile-picture-input"
                            />
                        )}
                    </div>
                    <div className="profile-details">
                        {isEditing ? (
                            <div className="name-edit">
                                <input
                                    type="text"
                                    value={profile.firstName || ''}
                                    onChange={(e) => handleUpdateProfile({ firstName: e.target.value })}
                                    placeholder="First Name"
                                    className="name-input"
                                />
                                <input
                                    type="text"
                                    value={profile.lastName || ''}
                                    onChange={(e) => handleUpdateProfile({ lastName: e.target.value })}
                                    placeholder="Last Name"
                                    className="name-input"
                                />
                            </div>
                        ) : (
                            <h1>{`${profile.firstName || ''} ${profile.lastName || ''}`}</h1>
                        )}
                        <h2>{profile.headline || 'No headline'}</h2>
                        <p>{profile.location || 'No location'}</p>
                        <div className="profile-stats">
                            <p className="connections">{profile.connectionCount} connections</p>
                            <p className="posts">{profile.postCount} posts</p>
                        </div>
                    </div>
                    {isCurrentUser ? (
                        <button 
                            className="edit-profile-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    ) : (
                        <button 
                            className="connect-btn"
                            onClick={handleConnect}
                        >
                            Connect
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-content">
                <div className="about-section">
                    <h3>About</h3>
                    {isEditing ? (
                        <textarea
                            value={profile.bio || ''}
                            onChange={(e) => handleUpdateProfile({ bio: e.target.value })}
                            placeholder="Write something about yourself..."
                            className="bio-edit"
                        />
                    ) : (
                        <p>{profile.bio || 'No bio yet'}</p>
                    )}
                </div>

                <ExperienceSection 
                    experiences={profile.workExperience || []}
                    isEditing={isEditing}
                    onUpdate={handleUpdateProfile}
                    isCurrentUser={isCurrentUser}
                />

                <EducationSection 
                    education={profile.education || []}
                    isEditing={isEditing}
                    onUpdate={handleUpdateProfile}
                    isCurrentUser={isCurrentUser}
                />

                <SkillsSection 
                    skills={profile.skills || new Set()}
                    isEditing={isEditing}
                    onUpdate={handleUpdateProfile}
                    isCurrentUser={isCurrentUser}
                />
            </div>
        </div>
    );
};

export default Profile;