import React, { useState, useContext } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../components/templates/textEditor';
import './Editor.css';

function StaffHomePage() {
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [isAutorizerVisible, setisAutorizerVisible] = useState(false);

    const toggleEditorVisibility = () => {
        setIsEditorVisible(!isEditorVisible); 
    };

    const toggleAutorizerVisibility = () => {
        setisAutorizerVisible(!isAutorizerVisible); 
    };

    const actionPanel = () => {
        return (
            <div className='d-flex flex-column gap-2' style={{margin: "10px"}}>
                <Button onClick={toggleEditorVisibility} className='btn btn-primary'>{isEditorVisible ? 'Close Editor' : 'Open Editor'}</Button>
                <Button onClick={toggleAutorizerVisibility} className='btn btn-primary'>{isAutorizerVisible ? 'Close Autorizer' : 'Open Authorizer'}</Button>
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
                            {isEditorVisible && <TextEditor/>}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StaffHomePage;
