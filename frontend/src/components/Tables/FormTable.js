import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const FormTable = ({ forms, handleDelete }) => {
    const { language } = useContext(LanguageContext);
    // Translations for different languages
    const translations = {
        en: {
            formsHeader: "Forms",
            actionHeader: "Action",
            deleteButton: "Delete"
        },
        he: {
            formsHeader: "טפסים",
            actionHeader: "פעולה",
            deleteButton: "מחק"
        },
        ar: {
            formsHeader: "النماذج",
            actionHeader: "العملية",
            deleteButton: "حذف"
        }
    };

    if (
        typeof forms !== 'object' || 
        forms === null || 
        !Array.isArray(forms.docs)
      ) {
        forms = { docs: [] };
      }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{translations[language].formsHeader}</th>
                    <th>{translations[language].actionHeader}</th>
                </tr>
            </thead>
            <tbody>
                {forms.docs.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{doc}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleDelete(doc)}>
                                {translations[language].deleteButton}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default FormTable;
