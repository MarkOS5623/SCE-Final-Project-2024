import React, { useState, useEffect, useRef, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { decodeValue } from '../../api/utils';
import { fetchFormWithSignatureList, fetchForm } from '../../api/form_requests';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';
import FormFiller from '../Forms/FormFiller'; // Assuming you have this component
import { saveDocument } from '../../api/documents_reqeusts';

const DownloadDocsTable = () => {
    const { language } = useContext(LanguageContext);
    const [noSignDocsList, setNoSignDocsList] = useState([]);
    const [showFillForm, setShowFillForm] = useState(false);
    const [choosenDocument, setChoosenDocument] = useState('');
    const documentContainerRef = useRef(null);

    const toggleFillFrom = (doc) => {
        setChoosenDocument(doc);
        setShowFillForm(!showFillForm);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const noSignDocs = await fetchFormWithSignatureList();
                setNoSignDocsList(noSignDocs.data.docs);
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (course, reason) => {
        try {
            const response = await fetchForm(choosenDocument);
            if (response.status === 200) {
                const data = response.data;
                documentContainerRef.current.documentEditor.open(data.text);
                const token = localStorage.getItem('token');
                const tokenData = await decodeValue(JSON.stringify({ token: token }));
                const decodedTokenData = tokenData.data;
                const currentDate = new Date();
                const options = { year: 'numeric', month: 'long', day: '2-digit' };
                let NameField = { fieldName: 'Name', value: decodedTokenData.user.fname + ' ' + decodedTokenData.user.lname };
                let DateField = { fieldName: 'Date', value: currentDate.toLocaleDateString('en-US', options) };
                let IDField = { fieldName: 'ID', value: String(decodedTokenData.user.id) };
                let couresField = { fieldName: 'Course', value: course };
                let reasonField = { fieldName: 'Reason', value: reason };
                documentContainerRef.current.documentEditor.importFormData([NameField, DateField, IDField, couresField, reasonField]);
                const documentData = documentContainerRef.current.documentEditor.serialize();
                await saveDocument(documentData, response.data.title, response.data.signatories, decodedTokenData.user._id, response.data.type)
                window.location.reload()
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    const translations = {
        en: {
            documentsHeader: "Documents",
            actionHeader: "Action",
            downloadButton: "File"
        },
        he: {
            documentsHeader: "מסמכים",
            actionHeader: "פעולה",
            downloadButton: "מלא"
        },
        ar: {
            documentsHeader: "المستندات",
            actionHeader: "العملية",
            downloadButton: "تحميل"
        }
    };

    return (
        <>
            {!showFillForm ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{translations[language].documentsHeader}</th>
                            <th>{translations[language].actionHeader}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noSignDocsList.map((doc, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{doc}</td>
                                <td>
                                    <Button variant="primary" onClick={() => toggleFillFrom(doc)}>
                                        {translations[language].downloadButton}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div style={{ marginBottom: '20px' }}>
                    <FormFiller handleSubmit={handleSubmit} documentName={choosenDocument} />
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
