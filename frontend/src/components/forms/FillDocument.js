import React, { useState } from 'react';

const FillDocument = ({ documentName, handleSubmit }) => {
    const [course, setCourse] = useState('');
    const [reason, setReason] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(course, reason);
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Exemption From Course</h2>
            <div>
                <label>Course:</label>
                <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
            <div>
                <label>Reason:</label>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FillDocument;
