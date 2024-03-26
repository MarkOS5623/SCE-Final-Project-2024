import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Col, Row, Button } from 'react-bootstrap';
import MyRequestsList from '../components/MyRequestsList';
import FormViewer from '../components/templates/formViewer';
import './Editor.css';

function StudentHomePage() {
    const { user, userAuthoredDocuments } = useContext(UserContext);
    const [isRequestFormVisible, setIsRequestFormVisible] = useState(false);
    const [isMyRequestsVisible, setIsMyRequestsVisible] = useState(false);

    const toggleEditorVisibility = () => {
        setIsRequestFormVisible(!isRequestFormVisible); // Toggle editor visibility
        setIsMyRequestsVisible(false); // Hide My Requests panel
    };

    const showMyRequests = () => {
        setIsMyRequestsVisible(!isMyRequestsVisible); // Toggle My Requests visibility
        setIsRequestFormVisible(false); // Hide editor panel
    };

    const actionPanel = () => {
        return (
            <div className='d-flex flex-column gap-2' style={{margin: "10px"}}>
                <Button onClick={toggleEditorVisibility} className='btn btn-primary'>Make a new request</Button>
                <Button onClick={showMyRequests} className='btn btn-primary'>My requests</Button>
            </div>
        );
    };
    return (
        <div>
            <div className="mt-0">
                <Row>
                    <Col md={2}>{actionPanel()}</Col>
                    <Col md={8}>
                        <div className="right-panel">
                            {isRequestFormVisible && <FormViewer />} 
                            {isMyRequestsVisible && <MyRequestsList requests={userAuthoredDocuments} />}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StudentHomePage;
