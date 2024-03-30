import React, { useEffect, useRef, useState } from 'react';
import { Alert, Card, Container, Button } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument } from '../../api/documents_reqeusts';
import { authorizeRequest } from '../../api/status_requests';
import { decodeValue } from '../../api/utils';

const ViewDocument = ((documentId) => {
  const [error, setError] = useState(null);
  const documentContainerRef = useRef(null);
  const editorStyle = { width: "100%", height: "95%" };
  const buttonStyle = { marginTop: '10px', marginLeft: '10px' }

  useEffect(() => {
    async function fetchDoc() {
      try {
        const response = await fetchDocument(documentId)
        if (!response.status === 200) {
          throw new Error('Failed to fetch document');
        }
        documentContainerRef.current.open(response.data.text);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchDoc();
  }, [documentId]);


  const AuthorizeRequest = async () => {
    try {
        const token = localStorage.getItem('token');
        const decodedToken = await decodeValue(JSON.stringify({ token: token }));
        const response = await authorizeRequest(documentId.documentId.documentId, decodedToken.data.user.id);
        if(response.status === 200)  console.log('success!')
    } catch (error) {
        console.error('Error fetching document:', error);
    }
};

  return (
    <Container className="d-flex justify-content-center align-items-center">
        <Card.Body>
           <h3>Request Number - {documentId.documentId.documentId}</h3> 
          {error && <Alert variant="danger">{error}</Alert>}
          <DocumentEditorComponent height="500px" width="95%" id="container" style={editorStyle} ref={documentContainerRef} restrictediting={'true'} />
          <Button style={buttonStyle} variant='success' onClick={() => AuthorizeRequest()}>Authorize</Button>
          <Button style={buttonStyle} variant='danger'>Reject</Button>
        </Card.Body>
    </Container>
  );
});

export default ViewDocument;
