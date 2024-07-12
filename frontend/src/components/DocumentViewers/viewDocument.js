import React, { useEffect, useRef, useState, useContext } from 'react';
import { Alert, Container, Button } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument,fetchDocumentAuthor } from '../../api/documents_reqeusts';
import { authorizeRequest, rejectRequest } from '../../api/status_requests';
import { decodeValue } from '../../api/utils';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const ViewDocument = ({ documentId, flag }) => {
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");
  const documentContainerRef = useRef(null);
  const editorStyle = { width: "100%", height: "95%" };
  const buttonStyle = { marginTop: '10px', marginLeft: '10px' };
  const { language } = useContext(LanguageContext); // Accessing language context
  const [subject, setSubject] = useState("")

  useEffect(() => {
    async function fetchDoc() {
      try {
        const response = await fetchDocument(documentId);
        console.log(response.data)
        const userRespone = await fetchDocumentAuthor(documentId);
        console.log(userRespone.data)
        if (response.status !== 200 || userRespone.status !== 200) {
          throw new Error('Failed to fetch document');
        }
        documentContainerRef.current.open(response.data.text);
        setSubject(response.data.subject)
        setAuthor(userRespone.data._id)
        setError(null);
      } catch (error) { 
        setError(error.message);
      }
    }
    fetchDoc();
  }, [documentId]);

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

  const AuthorizeRequest = async () => {
    try {
      const token = await localStorage.getItem('token');
      const decodedToken = await decodeValue(JSON.stringify({ token: token }));
      const response = await authorizeRequest(documentId, decodedToken.data.user.id, author, subject);
      if (response.status === 201) {
        console.log('Success!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error authorizing request:', error);
    }
  };

  const RejectRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = await decodeValue(JSON.stringify({ token: token }));
      const response = await rejectRequest(documentId, decodedToken.data.user.id, author, subject);
      if (response.status === 201) {
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
        <DocumentEditorComponent height="85vh" width="95%" id="container" style={editorStyle} ref={documentContainerRef} restrictediting={'true'} />
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
