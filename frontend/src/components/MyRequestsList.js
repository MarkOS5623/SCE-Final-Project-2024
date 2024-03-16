import React, { useContext, useState, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/userContext'; // Adjust the path as needed
import ViewText from '../components/docs/ViewText';

export default function MyRequestsList() {
  const { docsList } = useContext(UserContext);
  const [error, setError] = useState(null);
  const documentContainerRef = useRef(null);

  // Define fetchDocument function to fetch the document based on its title
  const fetchDocument = async (documentTitle) => {
    if (!documentTitle) {
      console.error('No document selected');
      setError('No document selected');
      return;
    } else {
      setError(null);
    }

    try {
      const response = await fetch('http://localhost:5000/api/documents/fetchDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: documentTitle }), // Send selected document title
      });

      if (response.ok) {
        const document = await response.json();
        // Handle document content as needed, e.g., display in an editor
        console.log('Document fetched successfully:', document);

        // Open the fetched document in the document editor
        documentContainerRef.current.documentEditor.open(document.documentContent);
      } else {
        console.error('Failed to fetch document:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  // Function to handle clicking on a document to view it
  const handleViewClick = (documentTitle) => {
    fetchDocument(documentTitle); // Fetch the selected document directly by its title
  };

  return (
    <div className="d-flex flex-column">
      <Table striped bordered hover style={{ width: '50%' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {docsList.map((title, index) => (
            <tr key={index}>
              <td>{title}</td>
              <td>
                <Button onClick={() => handleViewClick(title)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && <p>{error}</p>}
    </div>
  );
}
