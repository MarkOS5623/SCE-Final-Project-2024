import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import CardContainer from '../cardContainer'; // Import your CardContainer component
import { fetchNoSignTemplatesList, fetchTemplate, fetchOnlySignTemplatesList } from '../../api/templates_requests'; // Import your API function
import { SfdtExport, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import * as utils from '../../api/utils';
import { decodeValue } from '../../api/utils';

const NoSigForm = () => {
    const [noSignDocsList, setNoSignDocsList] = useState([]);
    const [onlySignDocsList, setOnlySignDocsList] = useState([]);
    const [showDownloadForms, setShowDownloadForms] = useState(false);
    const [showFillDocuments, setShowFillDocuments] = useState(false);
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
        setShowFillDocuments(false); // Close the fill section when forms are opened
    };

    const toggleFill = () => {
        setShowFillDocuments(!showFillDocuments);
        setShowDownloadForms(false); // Close the forms section when fill is opened
    };

    return (
        <CardContainer style={{ width: '800px', padding: '20px' }}>
            <Card.Body>
                {showDownloadForms && (
                    <Card.Title>Replace with logo</Card.Title>
                )}
                <div>
                    <Button onClick={toggleDownloadForms} style={{width: '35%', marginRight: '10px', fontSize: '20px', padding: '15px 25px' }}>Get Forms</Button>
                    <Button onClick={toggleFill} style={{ width: '35%', fontSize: '20px', padding: '15px 25px' }}>Fill Froms</Button>
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
                            {noSignDocsList.map((doc, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{doc}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleDownload(doc)}>Download</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {showFillDocuments && (
                    <Table striped bordered hover variant="dark">
                       <thead>
                            <tr>
                                <th>#</th>
                                <th>Documents</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {onlySignDocsList.map((doc, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{doc}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleDownload(doc)}>Fill</Button>
                                    </td>
                                </tr>
                            ))}
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
