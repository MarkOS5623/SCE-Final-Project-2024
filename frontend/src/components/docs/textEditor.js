import React, { useRef } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';


const TextEditor = () => {
  const mainContainerStyle = {
    all: "unset",
    width: "100vw",
  };

  const editorStyle = {
    width: "100%",
    height: "95%"
  };

  const documentContainerRef = useRef(null);

  const saveAsDocx = async () => {
    documentContainerRef.current.documentEditor.save("Sample", "Docx");
  };

  return (
    <Container style={mainContainerStyle} className="d-flex justify-content-center align-items-center">
      <Card style={{ height: "100vh", width: "100%" }} bg="primary" text="black">
        <Card.Body>
          <DocumentEditorContainerComponent height="82vh" width ="95%" id="container" style={editorStyle} ref={documentContainerRef}>
            <Inject services={[Toolbar, WordExport]} />
          </DocumentEditorContainerComponent>
          <Button onClick={saveAsDocx}>Save</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TextEditor;
