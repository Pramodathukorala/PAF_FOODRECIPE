import React, { useState } from 'react';

const EducationSection = ({ education = [], isEditing, onUpdate, isCurrentUser }) => {
    const [newEducation, setNewEducation] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const handleAddEducation = () => {
        const updatedEducation = [...education, newEducation];
        onUpdate({ education: updatedEducation });
        setNewEducation({
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: ''
        });
    };

    const handleRemoveEducation = (index) => {
        const updatedEducation = education.filter((_, i) => i !== index);
        onUpdate({ education: updatedEducation });
    };

    return (
        <div className="education-section">
            <div className="section-header">
                <h3>Education</h3>
                {isCurrentUser && isEditing && (
                    <button className="add-item-btn" onClick={handleAddEducation}>
                        Add Education
                    </button>
                )}
            </div>

            <div className="item-list">
                {isEditing ? (
                    <>
                        {education.map((edu, index) => (
                            <div key={index} className="list-item">
                                <div className="item-logo">
                                    <i className="bx bx-book"></i>
                                </div>
                                <div className="item-content">
                                    <input
                                        type="text"
                                        value={edu.school}
                                        onChange={(e) => {
                                            const updated = [...education];
                                            updated[index] = { ...edu, school: e.target.value };
                                            onUpdate({ education: updated });
                                        }}
                                        placeholder="School"
                                        className="item-title"
                                    />
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => {
                                            const updated = [...education];
                                            updated[index] = { ...edu, degree: e.target.value };
                                            onUpdate({ education: updated });
                                        }}
                                        placeholder="Degree"
                                        className="item-subtitle"
                                    />
                                    <input
                                        type="text"
                                        value={edu.fieldOfStudy}
                                        onChange={(e) => {
                                            const updated = [...education];
                                            updated[index] = { ...edu, fieldOfStudy: e.target.value };
                                            onUpdate({ education: updated });
                                        }}
                                        placeholder="Field of Study"
                                        className="item-subtitle"
                                    />
                                    <div className="date-inputs">
                                        <input
                                            type="date"
                                            value={edu.startDate}
                                            onChange={(e) => {
                                                const updated = [...education];
                                                updated[index] = { ...edu, startDate: e.target.value };
                                                onUpdate({ education: updated });
                                            }}
                                        />
                                        <input
                                            type="date"
                                            value={edu.endDate}
                                            onChange={(e) => {
                                                const updated = [...education];
                                                updated[index] = { ...edu, endDate: e.target.value };
                                                onUpdate({ education: updated });
                                            }}
                                        />
                                    </div>
                                    <textarea
                                        value={edu.description}
                                        onChange={(e) => {
                                            const updated = [...education];
                                            updated[index] = { ...edu, description: e.target.value };
                                            onUpdate({ education: updated });
                                        }}
                                        placeholder="Description"
                                        className="item-description"
                                    />
                                    <button 
                                        onClick={() => handleRemoveEducation(index)}
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
                                    value={newEducation.school}
                                    onChange={(e) => setNewEducation({
                                        ...newEducation,
                                        school: e.target.value
                                    })}
                                    placeholder="School"
                                    className="item-title"
                                />
                                <input
                                    type="text"
                                    value={newEducation.degree}
                                    onChange={(e) => setNewEducation({
                                        ...newEducation,
                                        degree: e.target.value
                                    })}
                                    placeholder="Degree"
                                    className="item-subtitle"
                                />
                                <input
                                    type="text"
                                    value={newEducation.fieldOfStudy}
                                    onChange={(e) => setNewEducation({
                                        ...newEducation,
                                        fieldOfStudy: e.target.value
                                    })}
                                    placeholder="Field of Study"
                                    className="item-subtitle"
                                />
                                <div className="date-inputs">
                                    <input
                                        type="date"
                                        value={newEducation.startDate}
                                        onChange={(e) => setNewEducation({
                                            ...newEducation,
                                            startDate: e.target.value
                                        })}
                                    />
                                    <input
                                        type="date"
                                        value={newEducation.endDate}
                                        onChange={(e) => setNewEducation({
                                            ...newEducation,
                                            endDate: e.target.value
                                        })}
                                    />
                                </div>
                                <textarea
                                    value={newEducation.description}
                                    onChange={(e) => setNewEducation({
                                        ...newEducation,
                                        description: e.target.value
                                    })}
                                    placeholder="Description"
                                    className="item-description"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    education.map((edu, index) => (
                        <div key={index} className="list-item">
                            <div className="item-logo">
                                <i className="bx bx-book"></i>
                            </div>
                            <div className="item-content">
                                <h4 className="item-title">{edu.school}</h4>
                                <p className="item-subtitle">{edu.degree}</p>
                                <p className="item-subtitle">{edu.fieldOfStudy}</p>
                                <p className="item-date">
                                    {edu.startDate} - {edu.endDate}
                                </p>
                                <p className="item-description">{edu.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EducationSection;