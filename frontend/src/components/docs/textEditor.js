import React from 'react';
import { Card } from 'react-bootstrap';
import ReactQuill from 'react-quill';

const TextEditor = () => {
  return (
    <Card style={{ height: '90vh', margin: '2vh', }} bg='primary' text='black'>
      <Card.Body style={{ height: '100%' }}>
        <ReactQuill theme="snow" style={{ height: '100%', backgroundColor: 'white', marginBottom: '2vh', overflow: 'auto' }} />
      </Card.Body>
    </Card>
  );
};

export default TextEditor;
