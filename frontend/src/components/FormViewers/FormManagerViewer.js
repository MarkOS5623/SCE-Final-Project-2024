import React, { useState, useContext } from 'react';
import CardContainer from '../Utils/CardContainer';
import { Button } from 'react-bootstrap';
import PendingRequestsTable from '../Tables/PendingRequestsTable';
import ApprovedRequestsTable from '../Tables/ApprovedRequestsTable';
import ViewDocument from '../DocumentViewers/ViewDocument';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary

const FormManagerViewer = ({ requestsList, signedRequestsNameList, signedRequestsIDList, signedRequestsStatusList }) => {
    const [showUnAuthRequestsList, setShowUnAuthRequestsList] = useState(false);
    const [showAuthRequestsList, setShowAuthRequestsList] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [choosenRequest, setChoosenRequest] = useState('');

    const { language } = useContext(LanguageContext); // Accessing language context

    const tagStyle = { width: '35%', fontSize: '20px', padding: '15px 25px' };

    const handleReview = async (documentId) => {
        setChoosenRequest(documentId);
        toggleShowReviewForm();
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

    // Translations for different languages
    const translations = {
        en: {
            showSignedRequests: "Show Signed Requests",
            showRequests: "Show Requests"
        },
        he: {
            showSignedRequests: "הצג בקשות חתומות",
            showRequests: "הצג בקשות"
        },
        ar: {
            showSignedRequests: "عرض الطلبات الموقعة",
            showRequests: "عرض الطلبات"
        }
    };

    return (
        <CardContainer style={{ width: '150vh', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Button onClick={toggleAuthorizedRequestsTable} style={{ ...tagStyle, flexGrow: 1, marginRight: '20px', height: '60px' }}>{translations[language].showSignedRequests}</Button>
                <Button onClick={toggleUnAuthorizedRequestsTable} style={{ ...tagStyle, flexGrow: 1, height: '60px' }}>{translations[language].showRequests}</Button>
            </div>
            <div style={{ height: '15px' }}></div>
            {showAuthRequestsList && <ApprovedRequestsTable documents={signedRequestsNameList} documentIds={signedRequestsIDList} documentStatuses={signedRequestsStatusList}/>}
            {showUnAuthRequestsList && <PendingRequestsTable documents={requestsList} handleReview={handleReview} />}
            {showReviewForm && <ViewDocument documentId={choosenRequest} flag={true}/>}
        </CardContainer>
    );
};

export default FormManagerViewer;
