import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import CardContainer from '../cardContainer'; // Import your CardContainer component
import { fetchTemplatesList, fetchTemplate } from '../../api/templates_requests'; // Import your API function
import { SfdtExport, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import * as utils from '../../api/utils';
import { decodeValue } from '../../api/utils';

const NoSigForm = () => {
    const [docsList, setDocsList] = useState([]);
    const [showDownloadForms, setShowDownloadForms] = useState(false);
    const [showDownloadFill, setShowDownloadFill] = useState(false);
    const documentContainerRef = useRef(null);

    useEffect(() => {
        async function fetchDocs() {
            try {
                const response = await fetchTemplatesList();
                if (Array.isArray(response.data.docs)) {
                    setDocsList(response.data.docs);
                } else {
                    console.error('Response data is not an array:', response.data.docs);
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchDocs();
    }, []);

    const handleCOSF = async (documentName) => {
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
        setShowDownloadFill(false); // Close the fill section when forms are opened
    };

    const toggleDownloadFill = () => {
        setShowDownloadFill(!showDownloadFill);
        setShowDownloadForms(false); // Close the forms section when fill is opened
    };

    return (
        <CardContainer style={{ width: '800px', padding: '20px' }}>
            <Card.Body>
                {showDownloadForms && (
                    <Card.Title>These are documents that don't need a signature</Card.Title>
                )}
                <div>
                    <Button onClick={toggleDownloadForms} style={{width: '35%', marginRight: '10px', fontSize: '20px', padding: '15px 25px' }}>Forms</Button>
                    <Button onClick={toggleDownloadFill} style={{ width: '35%', fontSize: '20px', padding: '15px 25px' }}>Fill</Button>
                </div>
                {showDownloadForms && (
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Documents</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docsList.map((doc, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{doc}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleCOSF(doc)}>Download</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {showDownloadFill && (
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Empty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* Your fill table row content */}
                            </tr>
                        </tbody>
                    </Table>
                )}
            </Card.Body>
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef}>
                    <Inject services={[WordExport, SfdtExport]} />
                </DocumentEditorContainerComponent>
            </div>
        </CardContainer>
    );
};

export default NoSigForm;
