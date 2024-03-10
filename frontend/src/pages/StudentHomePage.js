import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Col, Row, Button } from 'react-bootstrap';
import MyRequestsList from '../components/MyRequestsList';

function StudentHomePage() {
    const {user, userAuthoredDocuments} = useContext(UserContext);

    const [adminMessages, setAdminMessages] = useState([]);
    const [rightPanel, setRightPanel] = useState(<></>);

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

    const showMyRequests = () => {
        setRightPanel(<MyRequestsList requests={userAuthoredDocuments} />)
    }

    const actionPanel = () => {
        return (
            <div className='d-flex flex-column gap-1'>
                <Button className='btn btn-primary'>Create new requestButton</Button>
                <Button onClick={showMyRequests} className='btn btn-primary'>My requests</Button>
                <Button className='btn btn-primary'>My authorizations</Button>
            </div>
        )
    }

    return (
        <div>
            <div className="mt-4">
                <Row>
                    <Col md={2}>{actionPanel()}</Col>
                    <Col md={8}>{rightPanel}</Col>
                </Row>
                {/* <div className="row">
                    <div className="col">
                        <Link to="/create-request" className="btn btn-primary">Create a new student request</Link>
                    </div>
                    <div className="col">
                        <Link to="/edit-request" className="btn btn-primary">Edit request</Link>
                    </div>
                    <div className="col">
                        <Link to="/view-form" className="btn btn-primary">View form that needs signing</Link>
                    </div>
                </div> */}
            </div>
            {/* Frame for Admin Messages */}
            {/* <div className="container mt-4 border border-primary">
                <h3>Messages</h3>
                <ul>
                    {adminMessages.map(message => (
                        <li key={message.id}>{message.content}</li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
}
export default StudentHomePage;

