import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const RequestFillingTable = ({ documents, toggleFillFrom }) => {
    const { language } = useContext(LanguageContext);

    // Translations for different languages
    const translations = {
        en: {
            requests: "Requests",
            action: "Action",
            fill: "Fill"
        },
        he: {
            requests: "בקשות",
            action: "פעולה",
            fill: "מלא"
        },
        ar: {
            requests: "الطلبات",
            action: "الإجراء",
            fill: "ملء"
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{translations[language].requests}</th>
                    <th>{translations[language].action}</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{doc}</td>
                        <td>
                            <Button variant="primary" onClick={() => toggleFillFrom(doc)}>{translations[language].fill}</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RequestFillingTable;
