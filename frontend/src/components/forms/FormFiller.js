import React, { useState } from 'react';

const FormFiller = ({ documentName, handleSubmit }) => {
    const [course, setCourse] = useState('');
    const [reason, setReason] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(course, reason);
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h1 className="m-0 font-weight-bold text-primary">{documentName}</h1>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', color: 'black' }}>Course:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={course} 
                            onChange={(e) => setCourse(e.target.value)}
                            style={{ marginBottom: '10px' }} // Add margin bottom
                            placeholder="Insert course name" 
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', color: 'black' }}>Reason:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            placeholder="Insert reason" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ marginTop: '10px' }} 
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormFiller;
