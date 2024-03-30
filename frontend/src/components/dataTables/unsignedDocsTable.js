import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const UnsignedDocsTable = ({ documents, handleReview }) => {
    console.log(documents)
    useEffect(() => {
        function checker() {
            if (!documents) {
                documents = { docs: [], ids: [] }; 
            }
        }
        checker();
    }, []);

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Request ID</th>
                    <th>Request</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {documents.docs && documents.docs.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{documents.ids[index]}</td> 
                        <td>{doc}</td> 
                        <td>
                            <Button variant="primary" onClick={() => handleReview(documents.ids[index])}>Review</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UnsignedDocsTable;
