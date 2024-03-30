import React from 'react';
import { Table } from 'react-bootstrap';

export default function MyRequestsList({requests}) {
  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1"> 
        <Table striped bordered hover style={{ width: '100%', minWidth: '300px' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Request ID</th>
              <th>Request</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.docs && requests.docs.map((doc, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{requests.ids[index]}</td> 
                <td>{doc}</td> 
                <td>{requests.statuses[index]}</td> 
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
