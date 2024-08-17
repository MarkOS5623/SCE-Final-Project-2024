import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { fetchUnsignedDocumentList } from '../../api/documents_requests';

const translations = {
    en: {
        requestID: "Request ID",
        request: "Request",
        action: "Action",
        review: "Review",
        searchPlaceholder: "Search requests..."
    },
    he: {
        requestID: "מספר בקשה",
        request: "בקשה",
        action: "פעולה",
        review: "ביקורת",
        searchPlaceholder: "חפש בקשות..."
    },
    ar: {
        requestID: "رقم الطلب",
        request: "الطلب",
        action: "الإجراء",
        review: "مراجعة",
        searchPlaceholder: "ابحث عن الطلبات..."
    }
};

const PendingRequestsTable = () => {
    const { language } = useContext(LanguageContext);
    const [requestList, setRequestsList] = useState({ docs: [], ids: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const unsignedDocumentList = await fetchUnsignedDocumentList();
                console.log('Fetched Data:', unsignedDocumentList); 
                if (unsignedDocumentList && Array.isArray(unsignedDocumentList.docs) && Array.isArray(unsignedDocumentList.ids)) {
                    setRequestsList(unsignedDocumentList);
                } else {
                    console.log('Unsigned document response is not valid');
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRequests = requestList.docs.filter((doc, index) =>
        doc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        requestList.ids[index].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleReview = (documentId) => {
        navigate(`/formmanager/requests/${documentId}`); 
    };

    return (
        <>
            <h1>Request Manager</h1>
            <FormControl
                type="text"
                placeholder={translations[language].searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-3"
            />
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{translations[language].requestID}</th>
                        <th>{translations[language].request}</th>
                        <th>{translations[language].action}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests.length === 0 ? (
                        <tr>
                            <td colSpan="4">No matching requests found</td>
                        </tr>
                    ) : (
                        filteredRequests.map((doc, index) => (
                            <tr key={requestList.ids[index] || index}>
                                <td>{index + 1}</td>
                                <td>{requestList.ids[index]}</td>
                                <td>{doc}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleReview(requestList.ids[index])}
                                    >
                                        {translations[language].review}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default PendingRequestsTable;
