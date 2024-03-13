import React from 'react';
import { Table } from 'react-bootstrap';

export default function MyRequestsList({ requests }) {
  return (
    <div className="d-flex flex-column">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Assuming index starts from 1 */}
              <td>{request.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
