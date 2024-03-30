import React, { useState } from 'react';
import CardContainer from './cardContainer';
import { Button } from 'react-bootstrap';
import UnsignedDocsTable from './dataTables/unsignedDocsTable';
import AuthDocumentViewer from './authDocumentViewer';
import SignedDocsTable from './dataTables/signedDocsTable';

const StaffFormViewer = ({ requestsList, signedRequestsList }) => {
    const [showUnAuthRequestsList, setShowUnAuthRequestsList] = useState(false);
    const [showAuthRequestsList, setShowAuthRequestsList] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [choosenRequest, setChoosenRequest] = useState('');
    console.log('requestsList',  requestsList)
    const tagStyle = { width: '35%', fontSize: '20px', padding: '15px 25px' }

    const handleReview = async (documentId) => {
        setChoosenRequest(documentId)
        toggleShowReviewForm()
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
        <CardContainer style={{ width: 'auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Button onClick={toggleAuthorizedRequestsTable} style={{ ...tagStyle, flexGrow: 1, marginRight: '20px', height: '60px' }}>Show Signed Requests</Button>
                <Button onClick={toggleUnAuthorizedRequestsTable} style={{ ...tagStyle, flexGrow: 1, height: '60px' }}>Show Requests</Button>
            </div>
            <div style={{ height: '15px' }}></div>
            {showAuthRequestsList && <SignedDocsTable documents={signedRequestsList}/>}
            {showUnAuthRequestsList && <UnsignedDocsTable documents={requestsList} handleReview={handleReview} />}
            {showReviewForm && <AuthDocumentViewer documentId={choosenRequest}/>}
        </CardContainer>
    );
};

export default StaffFormViewer;
