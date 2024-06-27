import React from 'react';
import { Table } from 'react-bootstrap';

const ApprovedRequestsTable = ({ documents, documentIds, documentStatuses }) => {
    return (
        <>
            {documents && documentIds && documentStatuses ? (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Requests Subject</th>
                            <th>Requests ID</th>
                            <th>Requests Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{doc}</td>
                                <td>{documentIds[index]}</td>
                                <td>{documentStatuses[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Requests Subject</th>
                            <th>Requests ID</th>
                            <th>Requests Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ApprovedRequestsTable;
