import React, { useState, useContext } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import textEditor from '../components/docs/textEditor';
import './Editor.css';

function StaffHomePage() {
    const [isEditorVisible, setIsEditorVisible] = useState(false);

    const toggleEditorVisibility = () => {
        setIsEditorVisible(!isEditorVisible); 
    };

    return (
        <div>
            <div className="mt-0">
                <Row>
                    <Col md={12}>
                        <div className="action-panel">
                            <Button onClick={toggleEditorVisibility} className='btn btn-primary'>{isEditorVisible ? 'Close Editor' : 'Open Editor'}</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="mt-3">
                <Row>
                    <Col md={12}>
                        <div className="right-panel">
                            {isEditorVisible && <textEditor />}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StaffHomePage;
