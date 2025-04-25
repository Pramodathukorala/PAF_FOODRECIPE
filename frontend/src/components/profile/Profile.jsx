import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const { username } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
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
                const data = await response.json();
                setProfile(data);
                setIsCurrentUser(!username);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [username]);

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
            const data = await response.json();
            setProfile(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
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
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    if (!profile) return <div>Loading...</div>;

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
                        <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
                        <h2>{profile.headline}</h2>
                        <p>{profile.location}</p>
                        <p className="connections">{profile.connectionCount} connections</p>
                    </div>
                    {isCurrentUser && (
                        <button 
                            className="edit-profile-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-content">
                <div className="about-section">
                    <h3>About</h3>
                    <p>{profile.bio}</p>
                </div>

                <ExperienceSection 
                    experiences={profile.workExperience}
                    isEditing={isEditing}
                    onUpdate={handleUpdateProfile}
                    isCurrentUser={isCurrentUser}
                />

                <EducationSection 
                    education={profile.education}
                    isEditing={isEditing}
                    onUpdate={handleUpdateProfile}
                    isCurrentUser={isCurrentUser}
                />

                <SkillsSection 
                    skills={profile.skills}
                    isEditing={isEditing}
                    onUpdate={handleUpdateProfile}
                    isCurrentUser={isCurrentUser}
                />
            </div>
        </div>
    );
};

export default Profile;