import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Alert, Card, Container } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';

const ViewText = forwardRef(({ documentId }) => {
  const [error, setError] = useState(null);
  const documentContainerRef = useRef(null);
  const [title] = useState(documentId);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const response = await fetch('http://localhost:5000/api/documents/fetchDocument', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: title }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch document');
        }
        const documentData = await response.json();
        documentContainerRef.current.open(documentData.text);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchDocument();
  }, [documentId]);

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ height: '80vh', width: '80%' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <DocumentEditorComponent ref={documentContainerRef} restrictEditing={true}/>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default ViewText;
