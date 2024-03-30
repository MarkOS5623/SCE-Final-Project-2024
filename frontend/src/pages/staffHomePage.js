import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../components/templates/textEditor';
import './Editor.css';
import StaffFormViewer from '../components/staffFormViewer';
import { fetchUnsignedDocumentList } from '../api/documents_reqeusts';

function StaffHomePage() {
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [isAutorizerVisible, setisAutorizerVisible] = useState(false);
    const [requestsList, setRequestsList] = useState({});

    const toggleEditorVisibility = () => {
        setIsEditorVisible(!isEditorVisible); 
    };

    const toggleAutorizerVisibility = () => {
        setisAutorizerVisible(!isAutorizerVisible); 
    };

    useEffect(() => {
        async function fetchData() {
            try {
              const response = await fetchUnsignedDocumentList(); 
              if (Array.isArray(response.data.docs)) {
                console.log(response.data)
                setRequestsList(response.data);
              } else {
                console.error('Response data is not an array:', response.data.docs);
              }
            } catch (error) {
              console.error('Fetching of docs failed:', error.message);
            }
          }
        fetchData();
    }, []);

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
                            {isAutorizerVisible && <StaffFormViewer requestsList={requestsList}/>}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StaffHomePage;
