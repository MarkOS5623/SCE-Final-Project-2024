import React from 'react';
import { Table, Button } from 'react-bootstrap';

const FormTable = ({ forms, handleDelete }) => {
    console.log(forms)
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Forms</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {forms.map((doc, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{doc}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleDelete(doc)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default FormTable;
