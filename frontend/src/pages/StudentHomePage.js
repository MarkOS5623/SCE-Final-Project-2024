import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar'; 

function StudentHomePage() {
    const [adminMessages, setAdminMessages] = useState([]);

    useEffect(() => {
        // Fetch admin messages from backend when component mounts
        fetchAdminMessages();
    }, []);

    const fetchAdminMessages = async () => {
        try {
            // Make a GET request to fetch admin messages from backend
            const response = await fetch('/api/admin/messages');
            const data = await response.json();
            // Update state with fetched admin messages
            setAdminMessages(data);
        } catch (error) {
            console.error('Error fetching admin messages:', error);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <Link to="/create-request" className="btn btn-primary">Create a new student request</Link>
                    </div>
                    <div className="col">
                        <Link to="/edit-request" className="btn btn-primary">Edit request</Link>
                    </div>
                    <div className="col">
                        <Link to="/view-form" className="btn btn-primary">View form that needs signing</Link>
                    </div>
                </div>
            </div>
            {/* Frame for Admin Messages */}
            <div className="container mt-4 border border-primary">
                <h3>Messages</h3>
                <ul>
                    {adminMessages.map(message => (
                        <li key={message.id}>{message.content}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default StudentHomePage;
