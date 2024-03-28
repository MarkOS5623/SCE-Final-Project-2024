import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UnsignedDocsTable = ({ documents, handleReview }) => {
    return (
        <Table striped bordered hover variant="dark">
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
                            <Button variant="primary" onClick={() => handleReview(doc)}>Review</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UnsignedDocsTable;
