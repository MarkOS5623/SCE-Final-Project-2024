import React, { useState, useRef } from 'react';
import { Form, Dropdown, DropdownButton, Button, Card, Container } from 'react-bootstrap';
import { DocumentEditorContainerComponent, Inject, WordExport } from '@syncfusion/ej2-react-documenteditor';
import {
  PdfStandardFont,
  PdfDocument,
  PdfPageOrientation,
  PdfFontFamily,
  PdfSection,
  SizeF,
} from '@syncfusion/ej2-pdf-export';
const RequestForm = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const documentContainerRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubjectSelect = (subject) => {
    setSubject(subject);
  };

  const handleAdditionalNotesChange = (e) => {
    setAdditionalNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log('Form submitted:', { title, subject, additionalNotes });
  };

  const handleCOSF = async () => {
    try {
      // Fetch the document from the API
      const response = await fetch('http://localhost:5000/api/documents/fetchDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'Confirmation of Studies' }), 
      });
  
      if (response.ok) {
        // Parse the fetched document's content
        const document = await response.json();
        const documentText = document.text;
  
        // Open the fetched document in the temporary DocumentEditorContainerComponent
        documentContainerRef.current.documentEditor.open(documentText);
  
        // Wait for the document to load

          // Get the text content of the document
          const documentData = documentContainerRef.current.documentEditor.serialize();

        // Create a new PDF document
        const pdfDocument = new PdfDocument();

        // Add a section to the PDF document
        const section = new PdfSection(pdfDocument);
        section.pageSettings.orientation = PdfPageOrientation.Portrait;
        section.pageSettings.size = new SizeF(612, 792);
        pdfDocument.sections.add(section);

        // Add text content from the fetched document to the PDF document
        const page = section.pages.add();
        const graphics = page.graphics;
        const fallbackFont = new PdfStandardFont(PdfFontFamily.TimesRoman);
        graphics.drawString(documentData, fallbackFont, null, null);

        // Save the PDF document
        pdfDocument.save('Confirmation_of_Studies_Form.pdf');

        console.log('Document saved successfully as PDF!');

      } else {
        console.error('Failed to fetch document:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh"}}>
      <Card className="mt-3" bg="primary" text="white" style={{ width: "500px" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group controlId="formSubject" style={{margin: "10px"}}>
              <Form.Label>Subject</Form.Label>
              <DropdownButton id="dropdown-basic-button" title={subject || 'Select subject'}>
                <Dropdown.Item onClick={() => handleSubjectSelect('Total Tution Form')}>Total Tution Form</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSubjectSelect('COSF')}>Confirmation of Studies Form</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="formAdditionalNotes">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control as="textarea" rows={3} value={additionalNotes} onChange={handleAdditionalNotesChange} />
            </Form.Group>
            <br/>
            <Button variant="primary" onClick={handleCOSF}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef} >
          <Inject services={[WordExport]} />
        </DocumentEditorContainerComponent>
      </div>
      </Container>
  );
};

export default RequestForm;
