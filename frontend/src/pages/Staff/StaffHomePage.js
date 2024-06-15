import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../../components/Templates/TextEditor';
import '../Editor.css';
import StaffFormViewer from '../../components/FormViewers/staffFormViewer';
import { fetchUnsignedDocumentList, fetchSignedDocumentList } from '../../api/documents_reqeusts';

function StaffHomePage() {
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [isAutorizerVisible, setisAutorizerVisible] = useState(false);
    const [requestsList, setRequestsList] = useState({});
    const [signedRequestsList, setSignedRequestsList] = useState({});

    const toggleEditorVisibility = () => {
        setIsEditorVisible(!isEditorVisible); 
        setisAutorizerVisible(false);
    };

    const toggleAutorizerVisibility = () => {
        setisAutorizerVisible(!isAutorizerVisible); 
        setIsEditorVisible(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
              const unsignedDocumentList = await fetchUnsignedDocumentList(); 
              const signedDocumentList = await fetchSignedDocumentList(); 
              console.log(unsignedDocumentList.data)
              if (unsignedDocumentList.status) {
                setRequestsList(unsignedDocumentList.data);
                setSignedRequestsList(signedDocumentList.data)
              } else {
                console.log('Response data is not an array or is empty');
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
                            {isAutorizerVisible && <StaffFormViewer requestsList={requestsList} signedRequestsList={signedRequestsList}/>}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StaffHomePage;
