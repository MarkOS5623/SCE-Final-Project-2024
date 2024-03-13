import React, { useRef, useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';


const TextEditor = () => {
  
  const [DocsList, setDocsList] = useState(null);

  const mainContainerStyle = {
    all: "unset",
    width: "100vw",
  };

  const editorStyle = {
    width: "100%",
    height: "95%"
  };

  const documentContainerRef = useRef(null);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch('http://localhost:5000/api/documents/fetchDocsList', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        console.log(responseData)
        setDocsList(responseData)
      } catch (error) {
        console.error('fetching of docs failed:', error.message);
      }
    }
    fetchDocs()
  }, []);

  const saveAsDocx = async () => {
    const documentData = documentContainerRef.current.documentEditor.serialize();
    try {
      const response = await fetch('http://localhost:5000/api/documents/saveDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentData }),
      });
      if (response.ok) {
        console.log('Document saved successfully!');
      } else {
        console.error('Failed to save document:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };
  
  const fetchDocument = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/documents/fetchDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '65f085f23025cd426bea6389' }),
      });
      if (response.ok) {
        const document = await response.json();
        documentContainerRef.current.documentEditor.open(document.text); // Set the text in the editor
        console.log('Document fetched successfully!');
      } else {
        console.error('Failed to fetch document:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  return (
    <Container style={mainContainerStyle} className="d-flex justify-content-center align-items-center">
      <Card style={{ height: "100vh", width: "100%" }} bg="primary" text="black">
        <Card.Body>
          <DocumentEditorContainerComponent height="82vh" width ="95%" id="container" style={editorStyle} ref={documentContainerRef}>
            <Inject services={[Toolbar, WordExport]} />
          </DocumentEditorContainerComponent>
          <Button onClick={saveAsDocx}>Save</Button>
          <Button onClick={fetchDocument}>Fetch</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TextEditor;
