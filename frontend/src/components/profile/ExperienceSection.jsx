import React, { useState } from 'react';

const ExperienceSection = ({ experiences = [], isEditing, onUpdate, isCurrentUser }) => {
    const [newExperience, setNewExperience] = useState({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false
    });

    const handleAddExperience = () => {
        const updatedExperiences = [...experiences, newExperience];
        onUpdate({ workExperience: updatedExperiences });
        setNewExperience({
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false
        });
    };

    const handleRemoveExperience = (index) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        onUpdate({ workExperience: updatedExperiences });
    };

    return (
        <div className="experience-section">
            <div className="section-header">
                <h3>Experience</h3>
                {isCurrentUser && isEditing && (
                    <button className="add-item-btn" onClick={handleAddExperience}>
                        Add Experience
                    </button>
                )}
            </div>

            <div className="item-list">
                {isEditing ? (
                    <>
                        {experiences.map((exp, index) => (
                            <div key={index} className="list-item">
                                <div className="item-logo">
                                    {/* Company logo placeholder */}
                                    <i className="bx bx-buildings"></i>
                                </div>
                                <div className="item-content">
                                    <input
                                        type="text"
                                        value={exp.title}
                                        onChange={(e) => {
                                            const updated = [...experiences];
                                            updated[index] = { ...exp, title: e.target.value };
                                            onUpdate({ workExperience: updated });
                                        }}
                                        placeholder="Title"
                                        className="item-title"
                                    />
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => {
                                            const updated = [...experiences];
                                            updated[index] = { ...exp, company: e.target.value };
                                            onUpdate({ workExperience: updated });
                                        }}
                                        placeholder="Company"
                                        className="item-subtitle"
                                    />
                                    <input
                                        type="text"
                                        value={exp.location}
                                        onChange={(e) => {
                                            const updated = [...experiences];
                                            updated[index] = { ...exp, location: e.target.value };
                                            onUpdate({ workExperience: updated });
                                        }}
                                        placeholder="Location"
                                        className="item-subtitle"
                                    />
                                    <div className="date-inputs">
                                        <input
                                            type="date"
                                            value={exp.startDate}
                                            onChange={(e) => {
                                                const updated = [...experiences];
                                                updated[index] = { ...exp, startDate: e.target.value };
                                                onUpdate({ workExperience: updated });
                                            }}
                                        />
                                        {!exp.current && (
                                            <input
                                                type="date"
                                                value={exp.endDate}
                                                onChange={(e) => {
                                                    const updated = [...experiences];
                                                    updated[index] = { ...exp, endDate: e.target.value };
                                                    onUpdate({ workExperience: updated });
                                                }}
                                            />
                                        )}
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={exp.current}
                                                onChange={(e) => {
                                                    const updated = [...experiences];
                                                    updated[index] = { ...exp, current: e.target.checked };
                                                    onUpdate({ workExperience: updated });
                                                }}
                                            />
                                            Current
                                        </label>
                                    </div>
                                    <textarea
                                        value={exp.description}
                                        onChange={(e) => {
                                            const updated = [...experiences];
                                            updated[index] = { ...exp, description: e.target.value };
                                            onUpdate({ workExperience: updated });
                                        }}
                                        placeholder="Description"
                                        className="item-description"
                                    />
                                    <button 
                                        onClick={() => handleRemoveExperience(index)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="list-item">
                            <div className="item-logo">
                                <i className="bx bx-plus"></i>
                            </div>
                            <div className="item-content">
                                <input
                                    type="text"
                                    value={newExperience.title}
                                    onChange={(e) => setNewExperience({
                                        ...newExperience,
                                        title: e.target.value
                                    })}
                                    placeholder="Title"
                                    className="item-title"
                                />
                                <input
                                    type="text"
                                    value={newExperience.company}
                                    onChange={(e) => setNewExperience({
                                        ...newExperience,
                                        company: e.target.value
                                    })}
                                    placeholder="Company"
                                    className="item-subtitle"
                                />
                                <input
                                    type="text"
                                    value={newExperience.location}
                                    onChange={(e) => setNewExperience({
                                        ...newExperience,
                                        location: e.target.value
                                    })}
                                    placeholder="Location"
                                    className="item-subtitle"
                                />
                                <div className="date-inputs">
                                    <input
                                        type="date"
                                        value={newExperience.startDate}
                                        onChange={(e) => setNewExperience({
                                            ...newExperience,
                                            startDate: e.target.value
                                        })}
                                    />
                                    {!newExperience.current && (
                                        <input
                                            type="date"
                                            value={newExperience.endDate}
                                            onChange={(e) => setNewExperience({
                                                ...newExperience,
                                                endDate: e.target.value
                                            })}
                                        />
                                    )}
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={newExperience.current}
                                            onChange={(e) => setNewExperience({
                                                ...newExperience,
                                                current: e.target.checked
                                            })}
                                        />
                                        Current
                                    </label>
                                </div>
                                <textarea
                                    value={newExperience.description}
                                    onChange={(e) => setNewExperience({
                                        ...newExperience,
                                        description: e.target.value
                                    })}
                                    placeholder="Description"
                                    className="item-description"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    experiences.map((exp, index) => (
                        <div key={index} className="list-item">
                            <div className="item-logo">
                                <i className="bx bx-buildings"></i>
                            </div>
                            <div className="item-content">
                                <h4 className="item-title">{exp.title}</h4>
                                <p className="item-subtitle">{exp.company}</p>
                                <p className="item-subtitle">{exp.location}</p>
                                <p className="item-date">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </p>
                                <p className="item-description">{exp.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExperienceSection;