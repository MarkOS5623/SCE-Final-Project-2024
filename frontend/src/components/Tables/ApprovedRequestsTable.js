import React, { useContext, useState, useEffect } from 'react';
import { Table, FormControl } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { fetchSignedDocumentList } from '../../api/documents_requests';

const translations = {
    en: {
        requestsSubject: "Requests Subject",
        requestsId: "Requests ID",
        requestsStatus: "Requests Status",
        searchPlaceholder: "Search requests..."
    },
    he: {
        requestsSubject: "נושא הבקשות",
        requestsId: "מזהה הבקשות",
        requestsStatus: "סטטוס הבקשות",
        searchPlaceholder: "חפש בקשות..."
    },
    ar: {
        requestsSubject: "موضوع الطلبات",
        requestsId: "معرف الطلبات",
        requestsStatus: "حالة الطلبات",
        searchPlaceholder: "ابحث عن الطلبات..."
    }
};

const ApprovedRequestsTable = () => {
    const { language } = useContext(LanguageContext);
    const [processedRequestsList, setProcessedRequestsList] = useState({docs: [], ids: [], statuses: []});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const signedDocumentList = await fetchSignedDocumentList();
                if (signedDocumentList) {
                    setProcessedRequestsList(signedDocumentList);
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

    const filteredRequests = processedRequestsList.docs.filter((doc, index) => 
        doc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        processedRequestsList.ids[index].toLowerCase().includes(searchQuery.toLowerCase()) ||
        processedRequestsList.statuses[index].toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <h1>Request Manager History</h1>
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
                        <th>{translations[language].requestsSubject}</th>
                        <th>{translations[language].requestsId}</th>
                        <th>{translations[language].requestsStatus}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests.map((doc, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{doc}</td>
                            <td>{processedRequestsList.ids[index]}</td>
                            <td>{processedRequestsList.statuses[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default ApprovedRequestsTable;
