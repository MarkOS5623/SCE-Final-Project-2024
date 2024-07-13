import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContextProvider';

const RequestHistoryTable = ({ documents }) => {
    const { language } = useContext(LanguageContext);
    console.log(documents)
    // Translations for different languages
    const translations = {
        en: {
            requestID: "Request ID",
            request: "Request",
            status: "Status"
        },
        he: {
            requestID: "מספר בקשה",
            request: "בקשה",
            status: "סטטוס"
        },
        ar: {
            requestID: "رقم الطلب",
            request: "الطلب",
            status: "الحالة"
        }
    };

    // Ensure documents has default values
    if (!documents) {
        documents = { docs: [], ids: [], statuses: [] };
    }

    return (
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{translations[language].requestID}</th>
                    <th>{translations[language].request}</th>
                    <th>{translations[language].status}</th>
                </tr>
            </thead>
            <tbody>
                {documents.docs.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{documents.ids[index]}</td>
                        <td>{doc}</td>
                        <td>{documents.statuses[index]}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RequestHistoryTable;
