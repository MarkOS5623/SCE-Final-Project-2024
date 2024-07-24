import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { fetchUnsignedDocumentList } from '../../api/documents_requests';
import ViewDocument from '../DocumentViewers/ViewDocument';

const PendingRequestsTable = () => {
    const { language } = useContext(LanguageContext);
    const [ requestList, setRequestsList ] = useState({docs: [], ids: []})
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [choosenRequest, setChoosenRequest] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const unsignedDocumentList = await fetchUnsignedDocumentList();
                if (unsignedDocumentList.status === 200) {
                    setRequestsList(unsignedDocumentList.data);
                } else {
                    console.log('Unsigned document response is not valid');
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    const toggleShowReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };

    const handleReview = (documentId) => {
        setChoosenRequest(documentId);
        toggleShowReviewForm();
    };

    const translations = {
        en: {
            requestID: "Request ID",
            request: "Request",
            action: "Action",
            review: "Review"
        },
        he: {
            requestID: "מספר בקשה",
            request: "בקשה",
            action: "פעולה",
            review: "ביקורת"
        },
        ar: {
            requestID: "رقم الطلب",
            request: "الطلب",
            action: "الإجراء",
            review: "مراجعة"
        }
    };

    return (
        <>
        <h1>Request Manager</h1>
        {!showReviewForm && (<Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{translations[language].requestID}</th>
                    <th>{translations[language].request}</th>
                    <th>{translations[language].action}</th>
                </tr>
            </thead>
            <tbody>
                {requestList.docs.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{requestList.ids[index]}</td>
                        <td>{doc}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleReview(requestList.ids[index])}>{translations[language].review}</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>)}
        {showReviewForm && <ViewDocument documentId={choosenRequest} flag={true}/>}
        </>
    );
};

export default PendingRequestsTable;
