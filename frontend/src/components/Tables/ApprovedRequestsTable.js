import React, { useContext, useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary
import { fetchSignedDocumentList } from '../../api/documents_reqeusts';

const ApprovedRequestsTable = () => {
    const { language } = useContext(LanguageContext);
    const [ processedRequestsList, setProcessedRequestsList ] = useState({docs: [], ids: [], statuses: []});

    useEffect(() => {
        async function fetchData() {
            try {
                const signedDocumentList = await fetchSignedDocumentList();
                if (signedDocumentList.status === 200) {
                    setProcessedRequestsList(signedDocumentList.data);
                } else {
                    console.log('Unsigned document response is not valid');
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    // Translations for different languages
    const translations = {
        en: {
            requestsSubject: "Requests Subject",
            requestsId: "Requests ID",
            requestsStatus: "Requests Status"
        },
        he: {
            requestsSubject: "נושא הבקשות",
            requestsId: "מזהה הבקשות",
            requestsStatus: "סטטוס הבקשות"
        },
        ar: {
            requestsSubject: "موضوع الطلبات",
            requestsId: "معرف الطلبات",
            requestsStatus: "حالة الطلبات"
        }
    };

    return (
        <>
            {processedRequestsList ? (
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
                        {processedRequestsList.docs.map((doc, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{doc}</td>
                                <td>{processedRequestsList.ids[index]}</td>
                                <td>{processedRequestsList.statuses[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
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
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ApprovedRequestsTable;
