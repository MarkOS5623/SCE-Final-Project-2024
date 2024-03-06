import React from "react";
import { Card, Container } from "react-bootstrap";
import { Toolbar, Inject, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';

const TextEditor = () => {
  //let container = DocumentEditorContainerComponent;

  /*function onCreate() {
      onWindowResize();
      //Adds event listener for browser window resize event.
      window.addEventListener('resize', onWindowResize);
  }
  function onWindowResize() {
      //Resizes the document editor component to fit full browser window automatically whenever the browser resized.
      updateDocumentEditorSize();
  }
  function updateDocumentEditorSize() {
      //Resizes the document editor component to fit full browser window.
      var windowWidth = window.innerWidth * 0.3;
      var windowHeight = window.innerHeight * 0.3;
      container.resize(windowWidth, windowHeight);
  }*/

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ height: "90vh", margin: "2vh", width: "100%" }} bg="primary" text="black">
        <Card.Body className="justify-content-center align-items-center">
          <DocumentEditorContainerComponent id="container" style={{ width: "95%", height: '85%'}}>
            <Inject services={[Toolbar]} />
          </DocumentEditorContainerComponent>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TextEditor;
