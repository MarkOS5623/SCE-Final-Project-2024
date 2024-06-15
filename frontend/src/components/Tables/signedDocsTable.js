import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

const SignedDocsTable = ({ documents }) => {

    useEffect(() => {
        function checker() {
            if (!documents) {
                documents = { docs: [], ids: [], statuses: [] }; 
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
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {documents.docs && documents.docs.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{documents.ids[index]}</td> 
                        <td>{doc}</td> 
                        <td>{documents.statuses[index]}</td> 
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default SignedDocsTable;
