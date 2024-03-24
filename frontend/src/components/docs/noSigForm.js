import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import CardContainer from '../cardContainer'; // Import your CardContainer component
import { fetchDocsList, fetchDocument } from '../../api/document_requests'; // Import your API function
import { SfdtExport, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import * as utils from '../../api/utils';

const NoSigForm = () => {

    const [docsList, setDocsList] = useState([]);
    const documentContainerRef = useRef(null);

    useEffect(() => {
        async function fetchDocs() {
            try {
                const response = await fetchDocsList();
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
            const response = await fetchDocument(documentName);
            if (response.status === 200) {
                const data = response.data;
                const token = localStorage.getItem('token');
                let tokenData = await fetch('http://localhost:5000/api/utils/decodeValue', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
                let decodedTokenData = await tokenData.json();
                console.log(decodedTokenData.user);
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

    return (
        <CardContainer style={{ width: '800px', padding: '20px' }}>
            <Card.Body>
                <Card.Title>These are documents that don't need a signature</Card.Title>
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
