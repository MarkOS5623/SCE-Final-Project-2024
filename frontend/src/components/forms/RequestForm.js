import React, { useState, useRef } from 'react';
import { Form, Dropdown, DropdownButton, Button, Card, Container } from 'react-bootstrap';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';
import * as utils from '../../api/utils'
import { fetchDocument } from '../../api/document_requests';
const RequestForm = () => {
  const [subject, setSubject] = useState('');
  const documentContainerRef = useRef(null);

  const handleSubjectSelect = (subject) => {
    setSubject(subject);
  };

  const handleSubmit = async (e) => {
    console.log('Form submitted:', { subject });
  };
  
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh"}}>
      <Card className="mt-3" bg="primary" text="white" style={{ width: "500px" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSubject" style={{margin: "10px"}}>
              <Form.Label style={{fontSize: '30px'}}>Subject</Form.Label>
              <DropdownButton id="dropdown-basic-button" title={subject || 'Select subject'}>
                <Dropdown.Item onClick={() => handleSubjectSelect('Total Tuition Form')}>Total Tuition Form</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSubjectSelect('Confirmation of Studies Form')}>Confirmation of Studies Form</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <br/>
            <Button variant="primary" onClick={handleCOSF}>
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef} >
            <Inject services={[WordExport, SfdtExport]} />
          </DocumentEditorContainerComponent>
        </div>
      </Container>
  );
};

export default RequestForm;