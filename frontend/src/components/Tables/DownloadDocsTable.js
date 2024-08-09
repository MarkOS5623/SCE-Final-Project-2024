import React, { useState, useEffect, useRef, useContext } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { decodeValue } from '../../api/utils';
import { fetchNoSignatureFormsList, fetchForm } from '../../api/form_requests';
import { pdfConverter } from '../../api/utils';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';

const translations = {
    en: {
        documentsHeader: "Documents",
        actionHeader: "Action",
        downloadButton: "Download",
        searchPlaceholder: "Search documents..."
    },
    he: {
        documentsHeader: "מסמכים",
        actionHeader: "פעולה",
        downloadButton: "הורדה",
        searchPlaceholder: "חפש מסמכים..."
    },
    ar: {
        documentsHeader: "المستندات",
        actionHeader: "العملية",
        downloadButton: "تحميل",
        searchPlaceholder: "ابحث عن المستندات..."
    }
};

const DownloadDocsTable = () => {
    const { language } = useContext(LanguageContext);
    const [noSignDocsList, setNoSignDocsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const documentContainerRef = useRef(null);

    const handleDownload = async (documentName) => {
        const response = await fetchForm(documentName);
        documentContainerRef.current.documentEditor.open(response.text);
        const token = localStorage.getItem('token');
        const tokenData = await decodeValue(JSON.stringify({ token: token }));
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        let NameField = { fieldName: 'Name', value: tokenData.user.fname + ' ' + tokenData.user.lname };
        let DateField = { fieldName: 'Date', value: currentDate.toLocaleDateString('en-US', options) };
        let IDField = { fieldName: 'ID', value: String(tokenData.user.id) };
        documentContainerRef.current.documentEditor.importFormData([NameField, DateField, IDField]);
        pdfConverter(documentContainerRef);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const noSignDocs = await fetchNoSignatureFormsList();
                setNoSignDocsList(noSignDocs.docs);
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDocs = noSignDocsList.filter(doc =>
        doc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <h1>Download Forms</h1>
            <FormControl
                type="text"
                placeholder={translations[language].searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-3"
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{translations[language].documentsHeader}</th>
                        <th>{translations[language].actionHeader}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocs.map((doc, index) => (
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
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef}>
                    <Inject services={[WordExport, SfdtExport]} />
                </DocumentEditorContainerComponent>
            </div>
        </>
    );
};

export default DownloadDocsTable;
