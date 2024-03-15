// ViewText.js
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Container } from 'react-bootstrap';

const ViewText = ({ documentId }) => {
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
          <div ref={documentContainerRef}>{documentText}</div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewText;
