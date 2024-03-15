import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Col, Row, Button } from 'react-bootstrap';
import MyRequestsList from '../components/MyRequestsList';
import TextEditor from '../components/docs/textEditor';
import backgroundImage from '../assests/background.png'; // Import the background image
import './Editor.css';
import ViewTextPage from './ViewTextPage'; // Import the ViewTextPage component

function StudentHomePage() {
    const { user, userAuthoredDocuments } = useContext(UserContext);

    const [rightPanel, setRightPanel] = useState(null); // Initialize rightPanel with null
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [isMyRequestsVisible, setIsMyRequestsVisible] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null); // State to hold the selected document ID

    useEffect(() => {
        // Fetch admin messages from backend when component mounts
    }, []);

    const toggleEditorVisibility = () => {
        setIsEditorVisible(!isEditorVisible); // Toggle editor visibility
        setIsMyRequestsVisible(false); // Hide My Requests panel
    };

    const showMyRequests = () => {
        setIsMyRequestsVisible(!isMyRequestsVisible); // Toggle My Requests visibility
        setIsEditorVisible(false); // Hide editor panel
    };

    const handleViewClick = (documentId) => {
        // Set the selected document ID
        setSelectedDocumentId(documentId);
    };

    const actionPanel = () => {
        return (
            <div className='d-flex flex-column gap-2'>
                <Button onClick={toggleEditorVisibility} className='btn btn-primary'>Create new request</Button>
                <Button onClick={showMyRequests} className='btn btn-primary'>My requests</Button>
                <Button className='btn btn-primary'>My authorizations</Button>
            </div>
        );
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="mt-0">
                <Row>
                    <Col md={2}>{actionPanel()}</Col>
                    <Col md={8}>
                        <div className="right-panel">
                            {isEditorVisible && <TextEditor />} {/* Render editor only when visible */}
                            {isMyRequestsVisible && <MyRequestsList requests={userAuthoredDocuments} onDocumentClick={handleViewClick} />} {/* Render My Requests only when visible */}
                            {selectedDocumentId && <ViewTextPage documentId={selectedDocumentId} />} {/* Render ViewTextPage when a document is selected */}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StudentHomePage;
