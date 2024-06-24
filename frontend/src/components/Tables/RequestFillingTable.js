import React from 'react';
import { Table, Button } from 'react-bootstrap';

const RequestFillingTable = ({ documents, toggleFillFrom }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Documents</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{doc}</td>
                        <td>
                            <Button variant="primary" onClick={() => toggleFillFrom(doc)}>Fill</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RequestFillingTable;
