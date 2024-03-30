import React, { useState, useEffect, useRef } from 'react';
import CardContainer from './cardContainer';
import { Button } from 'react-bootstrap';
import UnsignedDocsTable from './dataTables/unsignedDocsTable';
import { fetchUnsignedDocumentList } from '../api/documents_reqeusts';
import AuthDocumentViewer from './authDocumentViewer';
const StaffFormViewer = (requestsList) => {
    console.log('StaffFormViewer', requestsList)
    const [showUnAuthRequestsList, setShowUnAuthRequestsList] = useState(false);
    const [showAuthRequestsList, setShowAuthRequestsList] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [choosenRequest, setChoosenRequest] = useState('');
    
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
            <div>
                <Button onClick={toggleAuthorizedRequestsTable} style={{ ...tagStyle, fontSize: '16px', marginRight: '20px' }}>Show Signed Requests</Button>
                <Button onClick={toggleUnAuthorizedRequestsTable} style={tagStyle}>Show Requests</Button>
            </div>
            {showAuthRequestsList}
            {showUnAuthRequestsList && <UnsignedDocsTable documents={requestsList.requestsList} handleReview={handleReview} />}
            {showReviewForm && <AuthDocumentViewer documentId={choosenRequest}/>}
        </CardContainer>
    );
};

export default StaffFormViewer;
