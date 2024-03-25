import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Alert, Card, Container } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchTemplate } from '../../api/templates_requests';

const ViewText = forwardRef(({ templateId }) => {
  const [error, setError] = useState(null);
  const documentContainerRef = useRef(null);
  const [title] = useState(templateId);

  useEffect(() => {
    async function fetchTem() {
      try {
        const response = await fetchTemplate(title)
        if (!response.status === 200) {
          throw new Error('Failed to fetch template');
        }
        documentContainerRef.current.open(response.data.text);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchTem();
  }, [templateId]);

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
