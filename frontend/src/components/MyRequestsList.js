import React, { useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/userContext'; // Adjust the path as needed
import ViewText from '../components/docs/ViewText';

export default function MyRequestsList() {
  const { docsList } = useContext(UserContext);
  const [isMyRequestsVisible, setIsMyRequestsVisible] = useState(false);
  const [title, setTitle] = useState(null)
  
  const handleViewClick = (documentTitle) => { // Fetch the selected document directly by its title
    setTitle(documentTitle)
    setIsMyRequestsVisible(!isMyRequestsVisible); // Toggle My Requests visibility
  };

  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1"> 
        <Table striped bordered hover style={{ width: 'auto' }}>
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
      {isMyRequestsVisible && title === title && (
        <div className="flex-grow-1">
          <ViewText documentId={title} />
        </div>
      )}
    </div>
  );
  
}
