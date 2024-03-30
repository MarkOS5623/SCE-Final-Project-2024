import React, { useEffect, useRef, useState } from 'react';
import { Alert, Card, Container } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument } from '../../api/documents_reqeusts';

const ViewDocument = ((documentId ) => {
  const [error, setError] = useState(null);
  const documentContainerRef = useRef(null);
  const editorStyle = {
    width: "100%",
    height: "95%"
  };

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

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ height: '90svh', width: '120svh' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <DocumentEditorComponent height="90%" width="95%" id="container" style={editorStyle} ref={documentContainerRef} restrictediting={'true'} />
        </Card.Body>
      </Card>
    </Container>
  );
});

export default ViewDocument;
