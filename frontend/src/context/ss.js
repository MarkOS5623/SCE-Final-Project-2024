import React, { useState, useEffect, useRef } from 'react';
import CardContainer from '../cardContainer';
import { fetchNoSignTemplatesList, fetchTemplate, fetchOnlySignTemplatesList } from '../../api/templates_requests';
import DownloadDocsTable from '../dataTables/downloadDocsTable'; // Import the DownloadDocsTable component
import FillDocumentsTable from '../dataTables/fillDocsTable'; // Import the FillDocumentsTable component
import { Button } from 'react-bootstrap';
import { SfdtExport, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { pdfConverter, decodeValue } from '../../api/utils';
import FillDocument from '../forms/FillDocument';

const StudentFormViewer = () => {
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
                const noSignDocs = await fetchNoSignTemplatesList();
                const onlySignDocs = await fetchOnlySignTemplatesList();
                setNoSignDocsList(noSignDocs.data.docs);
                setOnlySignDocsList(onlySignDocs.data.docs);
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);
    
    const tagStyle = { width: '35%', fontSize: '20px', padding: '15px 25px' }

    const handleSubmit = async (course, reason) => {
        // Handle form submission
    };

    const handleDownload = async (documentName) => {
        // Handle document download
    };

    const toggleDownloadForms = () => {
        setShowDownloadForms(!showDownloadForms);
        setShowFillFormsList(false);
        setShowFillForm(false)
    };

    const toggleFillFromList = () => {
        setShowFillFormsList(!showFillFormsList);
        setShowDownloadForms(false);
        setShowFillForm(false)
    };

    const toggleFillFrom = (doc) => {
        setChoosenDocument(doc);
        setShowFillForm(!showFillForm);
        setShowFillFormsList(false);
        setShowDownloadForms(false);
    };

    return (
        <CardContainer style={{ width: '800px', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}> {/* Add margin bottom */}
                <Button onClick={toggleDownloadForms} style={{ ...tagStyle, fontSize: '20px', marginRight: '20px' }}>Download Forms</Button>
                <Button onClick={toggleFillFromList} style={tagStyle}>Fill Forms</Button>
            </div>
            {showDownloadForms && <div style={{ marginBottom: '20px' }}>{/* Add margin bottom */}
                <DownloadDocsTable documents={noSignDocsList} handleDownload={handleDownload} />
            </div>}
            {showFillFormsList && <div style={{ marginBottom: '20px' }}>{/* Add margin bottom */}
                <FillDocumentsTable documents={onlySignDocsList} toggleFillFrom={toggleFillFrom} />
            </div>}
            {showFillForm && <div style={{ marginBottom: '20px' }}>{/* Add margin bottom */}
                <FillDocument handleSubmit={handleSubmit} />
            </div>}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef}>
                    <Inject services={[WordExport, SfdtExport]} />
                </DocumentEditorContainerComponent>
            </div>
        </CardContainer>
    );
};

export default StudentFormViewer;
