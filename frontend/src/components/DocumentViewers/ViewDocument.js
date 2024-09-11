import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const ViewDocument = ({ flag }) => {
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const documentContainerRef = useRef(null);
  const editorContainerRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const { documentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await fetchDocument(documentId);
        const userResponse = await fetchDocumentAuthor(documentId);
        if (!response || !userResponse) {
          throw new Error('Failed to fetch document');
        }
        documentContainerRef.current.open(response.text);
        setSubject(response.subject);
        setAuthor(userResponse._id);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDoc();
  }, [documentId]);

  const processRequest = async (approved) => {
    try {
      const response = await fetchForm("Request Approved");
      const docResponse = await fetchDocument(documentId);
      const token = localStorage.getItem('token');
      const tokenData = await decodeValue(JSON.stringify({ token }));
      const { fname, lname, _id, id } = tokenData.user;
      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
      const formData = [
        { fieldName: 'Name', value: `${fname} ${lname}` },
        { fieldName: 'Date', value: currentDate },
        { fieldName: 'ID', value: String(id) },
        { fieldName: 'Request', value: documentId },
        { fieldName: 'Subject', value: docResponse.subject }
      ];
      editorContainerRef.current.documentEditor.open(response.text);
      editorContainerRef.current.documentEditor.importFormData(formData);
      const documentData = editorContainerRef.current.documentEditor.serialize();
      await saveDocument(documentData, docResponse.subject, docResponse.authorizers, _id, docResponse.type, documentId);
      if (approved) {
        await authorizeRequest(documentId, _id, author, subject);
        console.debug('Successfully authorized request!');
        navigate('/formmanager/requests')
      } else {
        await rejectRequest(documentId, _id, author, subject);
        console.debug('Successfully rejected request!');
        navigate('/formmanager/requests')
      }
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <h3>{translations[language].requestNumberLabel} - {documentId}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <DocumentEditorComponent
        height="85vh"
        width="95%"
        id="documentEditor"
        style={{ width: "100%", height: "95%" }}
        ref={documentContainerRef}
        restrictEditing="true"
      />
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <DocumentEditorContainerComponent
          height="82vh"
          width="95%"
          id="editorContainer"
          ref={editorContainerRef}
          style={{ width: "100%", height: "95%" }}
        >
          <Inject services={[WordExport, SfdtExport]} />
        </DocumentEditorContainerComponent>
      </div>
      {flag && (
        <>
          <Button
            style={{ marginTop: '10px', marginLeft: '10px' }}
            variant='success'
            onClick={() => processRequest(true)}
            data-testid={'Approve'}
          >
            {translations[language].approveButton}
          </Button>
          <Button
            style={{ marginTop: '10px', marginLeft: '10px' }}
            variant='danger'
            onClick={() => processRequest(false)}
            data-testid={'Deny'}
          >
            {translations[language].denyButton}
          </Button>
        </>
      )}
    </Container>
  );
};

export default ViewDocument;
