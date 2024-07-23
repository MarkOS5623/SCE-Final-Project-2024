import React, { useEffect, useRef, useState, useContext } from 'react';
import { Alert, Container, Button } from 'react-bootstrap';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport, DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument, fetchDocumentAuthor, saveDocument } from '../../api/documents_requests';
import { authorizeRequest, rejectRequest } from '../../api/status_requests';
import { decodeValue } from '../../api/utils';
import { LanguageContext } from '../../Context/LanguageContextProvider'; 
import { fetchForm } from "../../api/form_requests";

const translations = {
  en: {
    approveButton: 'Approve',
    denyButton: 'Deny',
    requestNumberLabel: 'Request Number'
  },
  he: {
    approveButton: 'לאשר',
    denyButton: 'לדחות',
    requestNumberLabel: 'מספר בקשה'
  },
  ar: {
    approveButton: 'الموافقة',
    denyButton: 'رفض',
    requestNumberLabel: 'رقم الطلب'
  }
};

const ViewDocument = ({ documentId, flag }) => {
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");
  const documentContainerRef = useRef(null);
  const editorContainerRef = useRef(null);
  const editorStyle = { width: "100%", height: "95%" };
  const buttonStyle = { marginTop: '10px', marginLeft: '10px' };
  const { language } = useContext(LanguageContext); 
  const [subject, setSubject] = useState("");

  useEffect(() => {
    async function fetchDoc() {
      try {
        const response = await fetchDocument(documentId);
        const userResponse = await fetchDocumentAuthor(documentId);
        if (response.status !== 200 || userResponse.status !== 200) {
          throw new Error('Failed to fetch document');
        }
        documentContainerRef.current.open(response.data.text);
        setSubject(response.data.subject);
        setAuthor(userResponse.data._id);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchDoc();
  }, [documentId]);

  const AuthorizeRequest = async () => {
    try {
      const response = await fetchForm("Request Approved");
      const docResponse = await fetchDocument(documentId);
      const token = localStorage.getItem('token');
      const tokenData = await decodeValue(JSON.stringify({ token }));
      const { fname, lname, _id, id } = tokenData.data.user;
      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
      const formData = [
        { fieldName: 'Name', value: `${fname} ${lname}` },
        { fieldName: 'Date', value: currentDate },
        { fieldName: 'ID', value: String(id) },
        { fieldName: 'Request', value: documentId },
        { fieldName: 'Subject', value: docResponse.data.subject }
      ];
      editorContainerRef.current.documentEditor.open(response.data.text);
      editorContainerRef.current.documentEditor.importFormData(formData);
      const documentData = editorContainerRef.current.documentEditor.serialize();
      console.log(docResponse.data)
      await saveDocument(documentData, docResponse.data.subject, docResponse.data.authorizers, _id, docResponse.data.type, documentId);
      const authResponse = await authorizeRequest(documentId, id, author, subject);
      if (authResponse.status === 201) {
        console.log('Success!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error authorizing request:', error);
    }
  };

  const RejectRequest = async () => {
    try {
      const response = await fetchForm("Request Denied");
      const docResponse = await fetchDocument(documentId);
      const token = localStorage.getItem('token');
      const tokenData = await decodeValue(JSON.stringify({ token }));
      const { fname, lname, _id, id } = tokenData.data.user;
      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
      const formData = [
        { fieldName: 'Name', value: `${fname} ${lname}` },
        { fieldName: 'Date', value: currentDate },
        { fieldName: 'ID', value: String(id) },
        { fieldName: 'Request', value: documentId },
        { fieldName: 'Subject', value: docResponse.data.subject }
      ];
      editorContainerRef.current.documentEditor.open(response.data.text);
      editorContainerRef.current.documentEditor.importFormData(formData);
      const documentData = editorContainerRef.current.documentEditor.serialize();
      await saveDocument(documentData, docResponse.data.subject, docResponse.data.authorizers, _id, docResponse.data.type, documentId);
      const rejectResponse = await rejectRequest(documentId, id, author, subject);
      if (rejectResponse.status === 201) {
        console.log('Success!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <h3>{translations[language].requestNumberLabel} - {documentId}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
        <DocumentEditorComponent
              height="85vh"
              width="95%"
              id="container"
              style={editorStyle}
              ref={documentContainerRef}
              restrictEditing={'true'}
        />            
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={editorContainerRef}  style={editorStyle}>
              <Inject services={[WordExport, SfdtExport]} />
          </DocumentEditorContainerComponent>
        </div>
      {flag && (
        <>
          <Button style={buttonStyle} variant='success' onClick={AuthorizeRequest}>{translations[language].approveButton}</Button>
          <Button style={buttonStyle} variant='danger' onClick={RejectRequest}>{translations[language].denyButton}</Button>
        </>
      )}
    </Container>
  );
};

export default ViewDocument;
