import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const ApprovedRequestsTable = ({ documents, documentIds, documentStatuses }) => {
    const { language } = useContext(LanguageContext);
    console.log(documents)
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
            {documents && documentIds && documentStatuses ? (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{translations[language].requestsSubject}</th>
                            <th>{translations[language].requestsId}</th>
                            <th>{translations[language].requestsStatus}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{doc}</td>
                                <td>{documentIds[index]}</td>
                                <td>{documentStatuses[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Table striped bordered hover variant="dark">
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
