import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContextProvider';

const PendingRequestsTable = ({ documents, handleReview }) => {
    const { language } = useContext(LanguageContext);
    console.log(documents)

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

    // Ensure documents has default values
    if (
        typeof documents !== 'object' || 
        documents === null || 
        !Array.isArray(documents.docs) || 
        !Array.isArray(documents.ids)
      ) {
        documents = { docs: [], ids: [] };
      }

    return (
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
                {documents.docs.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{documents.ids[index]}</td>
                        <td>{doc}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleReview(documents.ids[index])}>{translations[language].review}</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default PendingRequestsTable;
