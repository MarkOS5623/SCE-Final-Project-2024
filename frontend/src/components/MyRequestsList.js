import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/userContext';

export default function MyRequestsList() {
  const { docsList } = useContext(UserContext);

  const handleViewClick = (documentId) => {
    // Perform action to view the document with the given ID
    console.log('View document with ID:', documentId);
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
                <Button onClick={() => handleViewClick(docsList[index]._id)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

