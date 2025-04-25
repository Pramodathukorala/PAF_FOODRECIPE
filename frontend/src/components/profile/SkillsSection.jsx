import React, { useState } from 'react';

const SkillsSection = ({ skills = new Set(), isEditing, onUpdate, isCurrentUser }) => {
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;

        const updatedSkills = new Set(skills);
        updatedSkills.add(newSkill.trim());
        onUpdate({ skills: Array.from(updatedSkills) });
        setNewSkill('');
    };

    const handleRemoveSkill = (skill) => {
        const updatedSkills = new Set(skills);
        updatedSkills.delete(skill);
        onUpdate({ skills: Array.from(updatedSkills) });
    };

    return (
        <div className="skills-section">
            <div className="section-header">
                <h3>Skills</h3>
            </div>

            {isEditing && isCurrentUser && (
                <form onSubmit={handleAddSkill} className="add-skill-form">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="skill-input"
                    />
                    <button type="submit" className="add-item-btn">
                        Add Skill
                    </button>
                </form>
            )}

            <div className="skill-list">
                {Array.from(skills).map((skill, index) => (
                    <div
                        key={index}
                        className={`skill-item ${!isCurrentUser ? 'endorsable' : ''}`}
                    >
                        {skill}
                        {isEditing && isCurrentUser && (
                            <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="remove-skill-btn"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsSection;