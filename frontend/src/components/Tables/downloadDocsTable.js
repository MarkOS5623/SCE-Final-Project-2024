import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary

const DownloadDocsTable = ({ documents, handleDownload }) => {
    const { language } = useContext(LanguageContext);

    // Translations for different languages
    const translations = {
        en: {
            documentsHeader: "Documents",
            actionHeader: "Action",
            downloadButton: "Download"
        },
        he: {
            documentsHeader: "מסמכים",
            actionHeader: "פעולה",
            downloadButton: "הורדה"
        },
        ar: {
            documentsHeader: "المستندات",
            actionHeader: "العملية",
            downloadButton: "تحميل"
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{translations[language].documentsHeader}</th>
                    <th>{translations[language].actionHeader}</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{doc}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleDownload(doc)}>
                                {translations[language].downloadButton}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DownloadDocsTable;
