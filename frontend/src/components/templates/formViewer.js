import React, { useState, useEffect, useRef } from 'react';
import CardContainer from '../cardContainer';
import { fetchNoSignTemplatesList, fetchTemplate, fetchOnlySignTemplatesList } from '../../api/templates_requests';
import DownloadDocsTable from '../dataTables/downloadDocsTable'; // Import the DownloadDocsTable component
import FillDocuments from '../dataTables/fillDocsTable'; // Import the FillDocuments component
import { Button } from 'react-bootstrap';
import { SfdtExport, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import * as utils from '../../api/utils';
import { decodeValue } from '../../api/utils';

const FormViewer = () => {
    const [noSignDocsList, setNoSignDocsList] = useState([]);
    const [onlySignDocsList, setOnlySignDocsList] = useState([]);
    const [showDownloadForms, setShowDownloadForms] = useState(false);
    const [showFillDocuments, setShowFillForms] = useState(false);
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

    const handleDownload = async (documentName) => {
        try {
            const response = await fetchTemplate(documentName);
            if (response.status === 200) {
                const data = response.data;
                const token = localStorage.getItem('token');
                const tokenData = await decodeValue(JSON.stringify({token: token}))
                const decodedTokenData = tokenData.data;
                const currentDate = new Date();
                const options = { year: 'numeric', month: 'long', day: '2-digit' };
                documentContainerRef.current.documentEditor.open(data.text);
                let NameField = { fieldName: 'Name', value: decodedTokenData.user.fname + ' ' + decodedTokenData.user.lname };
                let DateField = { fieldName: 'Date', value: currentDate.toLocaleDateString('en-US', options) };
                let IDField = { fieldName: 'ID', value: String(decodedTokenData.user.id) };
                documentContainerRef.current.documentEditor.importFormData([NameField, DateField, IDField]);
                utils.pdfConverter(documentContainerRef);
            } else {
                console.error('Failed to fetch document:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    const toggleDownloadForms = () => {
        setShowDownloadForms(!showDownloadForms);
        setShowFillForms(false);
    };

    const toggleFill = () => {
        setShowFillForms(!showFillDocuments);
        setShowDownloadForms(false);
    };

    return (
        <CardContainer style={{ width: '800px', padding: '20px' }}>
            <div>
                <Button onClick={toggleDownloadForms} style={{ ...tagStyle, fontSize: '20px', marginRight: '20px' }}>Download Forms</Button>
                <Button onClick={toggleFill} style={tagStyle}>Fill Froms</Button>
            </div>
            {showDownloadForms && <DownloadDocsTable documents={noSignDocsList} handleDownload={handleDownload} />}
            {showFillDocuments && <FillDocuments documents={onlySignDocsList} handleDownload={handleDownload} />}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef}>
                    <Inject services={[WordExport, SfdtExport]} />
                </DocumentEditorContainerComponent>
            </div>
        </CardContainer>
    );
};

export default FormViewer;
