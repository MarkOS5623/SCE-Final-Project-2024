// ViewText.js
import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Alert, Card, Container } from 'react-bootstrap';

const ViewText = forwardRef(({ documentId }, ref) => {
  const [documentText, setDocumentText] = useState('');
  const [error, setError] = useState(null);
  const documentContainerRef = useRef(null);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const response = await fetch(`http://localhost:5000/api/documents/fetchDocument/${documentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch document');
        }
        const documentData = await response.json();
        setDocumentText(documentData.text);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchDocument();
  }, [documentId]);

  useEffect(() => {
    if (documentContainerRef.current) {
      // Update ref.current only if it's not already set
      if (ref.current !== documentContainerRef.current) {
        ref.current = documentContainerRef.current;
      }
    }
  }, [documentText, ref]); // Add ref to the dependency array

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ height: '80vh', width: '80%' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <div ref={documentContainerRef}>{documentText}</div>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default ViewText;
