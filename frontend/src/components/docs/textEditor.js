import React from "react";
import { Card, Container } from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent  } from '@syncfusion/ej2-react-documenteditor';

const TextEditor = () => {

  const mainContainerStyle = {
    all: "unset",
    width: "100vw",
    
  }

  const editorStyle = {
    border: "20px solid black",
    width: "100%",
    height: "80svh"
  }

  let documentContainer = DocumentEditorContainerComponent | null;
  const saveAsDocx = async () => {
    documentContainer.documentEditor.save("Sample","Docx");

  }

  return (
    <Container style={mainContainerStyle} className="d-flex justify-content-center align-items-center">
      <Card style={{ height: "90vh", width: "100%" }} bg="primary" text="black">
        <Card.Body >
           <DocumentEditorContainerComponent id="container" style={editorStyle}  ref={(scope) => { documentContainer = scope; }}>
            <Inject services={[Toolbar, WordExport]} />
          </DocumentEditorContainerComponent> 
          <button onClick={saveAsDocx}>Save</button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TextEditor;
