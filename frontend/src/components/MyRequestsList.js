import React, { useState, useRef, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument } from '../api/documents_reqeusts';

export default function MyRequestsList({ requests }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [documentContent, setDocumentContent] = useState('');
  const documentContainerRef = useRef(null);
  const editorStyle = { width: "100%", height: "95%" };

  const handleReview = async (documentId) => {
    try {
      const response = await fetchDocument({ documentId });
      if (response.status !== 200) {
        throw new Error('Failed to fetch document');
      }
      setDocumentContent(response.data.text);
      setShowReviewForm(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (showReviewForm && documentContainerRef.current) {
      documentContainerRef.current.open(documentContent);
    }
  }, [showReviewForm, documentContent]);

  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1">
        {!showReviewForm ? (
          <Table striped bordered hover style={{ width: '100%', minWidth: '300px' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Request ID</th>
                <th>Request</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.docs && requests.docs.map((doc, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{requests.ids[index]}</td>
                  <td>{doc}</td>
                  <td>{requests.statuses[index]}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleReview(requests.ids[index])}>Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <>
            <DocumentEditorComponent
              height="500px"
              width="95%"
              id="container"
              style={editorStyle}
              ref={documentContainerRef}
              restrictediting={'true'}
            />
            <br></br>
            <Button variant="primary"  onClick={() => setShowReviewForm(false)}>Close</Button>
          </>
        )}
      </div>
    </div>
  );
}
