import React, { useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/userContext'; // Adjust the path as needed
import ViewText from '../components/docs/ViewText';

export default function MyRequestsList() {
  const { docsList } = useContext(UserContext);
  const [visibleDocumentId, setVisibleDocumentId] = useState(null);

  const handleViewClick = (documentTitle) => {
    setVisibleDocumentId((prevVisibleDocumentId) =>
      prevVisibleDocumentId === documentTitle ? null : documentTitle
    );
  };

  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1"> 
        <Table striped bordered hover style={{ width: 'auto', height: 'auto' }}>
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
                  <div>
                    <Button onClick={() => handleViewClick(title)}>View</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {docsList.map((title) => (
        title === visibleDocumentId && (
          <div key={title} className="flex-grow-1">
            <ViewText documentId={title} />
          </div>
        )
      ))}
    </div>
  );
}
