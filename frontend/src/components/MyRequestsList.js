import React, { useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/userContext'; // Adjust the path as needed

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
            </tr>
          </thead>
          <tbody>
            {requests.docs && requests.docs.map((doc, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{requests.ids[index]}</td> 
                <td>{doc}</td> 
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
