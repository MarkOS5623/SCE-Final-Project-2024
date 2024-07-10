import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';
import { decodeValue } from '../../api/utils';
import { fetchUnSignedFormsList, fetchForm, fetchSignedFormsList } from '../../api/form_requests';
import DownloadDocsTable from '../Tables/downloadDocsTable';
import FillDocumentsTable from '../Tables/RequestFillingTable';
import FormFiller from '../Forms/FormFiller';
import { saveDocument } from '../../api/documents_reqeusts';
import { pdfConverter } from '../../api/utils';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const StudentFormViewer = () => {
    const { language } = useContext(LanguageContext);

    const [noSignDocsList, setNoSignDocsList] = useState([]);
    const [onlySignDocsList, setOnlySignDocsList] = useState([]);
    const [showDownloadForms, setShowDownloadForms] = useState(false);
    const [showFillFormsList, setShowFillFormsList] = useState(false);
    const [showFillForm, setShowFillForm] = useState(false);
    const [choosenDocument, setChoosenDocument] = useState('');
    const documentContainerRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const noSignDocs = await fetchUnSignedFormsList();
                const onlySignDocs = await fetchSignedFormsList();
                setNoSignDocsList(noSignDocs.data.docs);
                setOnlySignDocsList(onlySignDocs.data.docs);
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    const tagStyle = { width: '35%', fontSize: '20px', padding: '15px 25px' };

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

    const handleDownload = async (documentName) => {
        const response = await fetchForm(documentName);
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
        documentContainerRef.current.documentEditor.importFormData([NameField, DateField, IDField]);
        pdfConverter(documentContainerRef);
    };

    const toggleDownloadForms = () => {
        setShowDownloadForms(!showDownloadForms);
        setShowFillFormsList(false);
        setShowFillForm(false);
    };

    const toggleFillFromList = () => {
        setShowFillFormsList(!showFillFormsList);
        setShowDownloadForms(false);
        setShowFillForm(false);
    };

    const toggleFillFrom = (doc) => {
        setChoosenDocument(doc);
        setShowFillForm(!showFillForm);
        setShowFillFormsList(false);
        setShowDownloadForms(false);
    };

    // Translations for different languages
    const translations = {
        en: {
            downloadDocuments: "Download Documents",
            fileRequests: "File Requests"
        },
        he: {
            downloadDocuments: "הורדת מסמכים",
            fileRequests: "בקשות קובץ"
        },
        ar: {
            downloadDocuments: "تحميل المستندات",
            fileRequests: "طلبات الملف"
        }
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <Button onClick={toggleDownloadForms} style={{ ...tagStyle, fontSize: '20px', marginRight: '20px' }}>
                    {translations[language].downloadDocuments}
                </Button>
                <Button onClick={toggleFillFromList} style={tagStyle}>
                    {translations[language].fileRequests}
                </Button>
            </div>
            {showDownloadForms && <div style={{ marginBottom: '20px' }}>
                <DownloadDocsTable documents={noSignDocsList} handleDownload={handleDownload} />
            </div>}
            {showFillFormsList && <div style={{ marginBottom: '20px' }}>
                <FillDocumentsTable documents={onlySignDocsList} toggleFillFrom={toggleFillFrom} />
            </div>}
            {showFillForm && <div style={{ marginBottom: '20px' }}>
                <FormFiller handleSubmit={handleSubmit} documentName={choosenDocument} />
            </div>}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef}>
                    <Inject services={[WordExport, SfdtExport]} />
                </DocumentEditorContainerComponent>
            </div>
        </>
    );
};

export default StudentFormViewer;
