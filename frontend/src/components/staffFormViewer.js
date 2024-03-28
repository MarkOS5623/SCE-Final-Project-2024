import React, { useState, useEffect, useRef } from 'react';
import CardContainer from './cardContainer';
import { Button } from 'react-bootstrap';
import { SfdtExport, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import UnsignedDocsTable from './dataTables/unsignedDocsTable';
import { fetchUnsignedDocumentList } from '../api/documents_reqeusts';

const StaffFormViewer = () => {
    const [requestsList, setRequestsList] = useState([]);
    const [showUnAuthRequestsList, setShowUnAuthRequestsList] = useState(false);
    const [showAuthRequestsList, setShowAuthRequestsList] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [choosenRequest, setChoosenRequest] = useState('');
    const documentContainerRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
              const response = await fetchUnsignedDocumentList(); 
              if (Array.isArray(response.data.docs)) {
                console.log(response.data.docs)
                setRequestsList(response.data.docs);
              } else {
                console.error('Response data is not an array:', response.data.docs);
              }
            } catch (error) {
              console.error('Fetching of docs failed:', error.message);
            }
          }
          fetchData();
    }, []);
    
    const tagStyle = { width: '35%', fontSize: '20px', padding: '15px 25px' }

    const handleReview = async (doc) => {
 
    };

    const toggleUnAuthorizedRequestsTable = () => {
        setShowUnAuthRequestsList(!showUnAuthRequestsList);
        setShowAuthRequestsList(false);
        setShowReviewForm(false);
    };
    
    const toggleAuthorizedRequestsTable = () => {
        setShowAuthRequestsList(!showAuthRequestsList);
        setShowUnAuthRequestsList(false);
        setShowReviewForm(false);
    };

    const toggleShowReviewForm = () => {
        setShowReviewForm(!showReviewForm);
        setShowUnAuthRequestsList(false);
        setShowAuthRequestsList(false);
    };

    return (
        <CardContainer style={{ width: '800px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Button onClick={toggleAuthorizedRequestsTable} style={{ ...tagStyle, flexGrow: 1, marginRight: '20px', height: '60px' }}>Show Signed Requests</Button>
                <Button onClick={toggleUnAuthorizedRequestsTable} style={{ ...tagStyle, flexGrow: 1, height: '60px' }}>Show Requests</Button>
            </div>
            <div style={{ height: '15px' }}></div>
            {showAuthRequestsList}
            {showUnAuthRequestsList && <UnsignedDocsTable documents={requestsList} handleReview={handleReview} />}
            {showReviewForm }
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef}>
                    <Inject services={[WordExport, SfdtExport]} />
                </DocumentEditorContainerComponent>
            </div>
        </CardContainer>
    );
};

export default StaffFormViewer;
