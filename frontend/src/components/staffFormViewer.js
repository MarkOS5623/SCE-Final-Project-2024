import React, { useState, useEffect, useRef } from 'react';
import CardContainer from './cardContainer';
import { Button } from 'react-bootstrap';
import { SfdtExport, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';

const StaffFormViewer = () => {
    const [requestsList, setRequestsList] = useState([]);
    const [showUnAuthRequestsList, setShowUnAuthRequestsList] = useState(false);
    const [showAuthRequestsList, setShowAuthRequestsList] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [choosenRequest, setChoosenRequest] = useState('');
    const documentContainerRef = useRef(null);

    useEffect(() => {

    }, []);
    
    const tagStyle = { width: '35%', fontSize: '20px', padding: '15px 25px' }

    const handleReview = async (course, reason) => {
 
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
            <div>
                <Button onClick={toggleUnAuthorizedRequestsTable} style={{ ...tagStyle, fontSize: '16px', marginRight: '20px' }}>Show Signed Requests</Button>
                <Button onClick={toggleAuthorizedRequestsTable} style={tagStyle}>Show Requests</Button>
            </div>
            {showAuthRequestsList }
            {showUnAuthRequestsList}
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
