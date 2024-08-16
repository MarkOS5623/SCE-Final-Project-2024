import React, { useState, useEffect, useRef, useContext } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { decodeValue } from '../../api/utils';
import { fetchFormWithSignatureList, fetchForm } from '../../api/form_requests';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';
import FormFiller from '../Forms/FormFiller';
import { saveDocument } from '../../api/documents_requests';

const translations = {
    en: {
        documentsHeader: "Documents",
        actionHeader: "Action",
        downloadButton: "File",
        searchPlaceholder: "Search documents..."
    },
    he: {
        documentsHeader: "מסמכים",
        actionHeader: "פעולה",
        downloadButton: "מלא",
        searchPlaceholder: "חפש מסמכים..."
    },
    ar: {
        documentsHeader: "المستندات",
        actionHeader: "العملية",
        downloadButton: "تحميل",
        searchPlaceholder: "ابحث في المستندات..."
    }
};

const DownloadDocsTable = () => {
    const { language } = useContext(LanguageContext);
    const [noSignDocsList, setNoSignDocsList] = useState([]);
    const [showFillForm, setShowFillForm] = useState(false);
    const [choosenDocument, setChoosenDocument] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const documentContainerRef = useRef(null);

    const toggleFillFrom = (doc) => {
        setChoosenDocument(doc);
        setShowFillForm(!showFillForm);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const noSignDocs = await fetchFormWithSignatureList();
                setNoSignDocsList(noSignDocs.docs);
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDocs = noSignDocsList.filter(doc =>
        doc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = async (course, reason) => {
        try {
            const response = await fetchForm(choosenDocument);
            if (response) {
                documentContainerRef.current.documentEditor.open(response.text);
                const token = localStorage.getItem('token');
                const tokenData = await decodeValue(JSON.stringify({ token: token }));
                const currentDate = new Date();
                const options = { year: 'numeric', month: 'long', day: '2-digit' };
                let NameField = { fieldName: 'Name', value: tokenData.user.fname + ' ' + tokenData.user.lname };
                let DateField = { fieldName: 'Date', value: currentDate.toLocaleDateString('en-US', options) };
                let IDField = { fieldName: 'ID', value: String(tokenData.user.id) };
                let couresField = { fieldName: 'Course', value: course };
                let reasonField = { fieldName: 'Reason', value: reason };
                documentContainerRef.current.documentEditor.importFormData([NameField, DateField, IDField, couresField, reasonField]);
                const documentData = documentContainerRef.current.documentEditor.serialize();
                await saveDocument(documentData, response.title, response.signatoryTiers, tokenData.user._id, response.type);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    return (
        <>
            <h1>Request Maker</h1>
            {!showFillForm ? (
                <>
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
                            {filteredDocs.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No matching documents found</td>
                                </tr>
                            ) : (
                                filteredDocs.map((doc, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{doc}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => toggleFillFrom(doc)}>
                                                {translations[language].downloadButton}
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </>
            ) : (
                <div style={{ marginBottom: '20px' }}>
                    <FormFiller handleSubmit={handleSubmit} documentName={choosenDocument} handleCancel={toggleFillFrom} />
                </div>
            )}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef}>
                    <Inject services={[WordExport, SfdtExport]} />
                </DocumentEditorContainerComponent>
            </div>
        </>
    );
};

export default DownloadDocsTable;
