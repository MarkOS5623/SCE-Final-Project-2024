import React, { useRef, useEffect, useState } from "react";
import { Card, Container, Button, Dropdown, Alert } from "react-bootstrap";
import {
  Toolbar,
  Inject,
  WordExport,
  DocumentEditorContainerComponent,
} from "@syncfusion/ej2-react-documenteditor";

const ViewText = () => {
  const [DocsList, setDocsList] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [error, setError] = useState("");

  const mainContainerStyle = {
    all: "unset",
    width: "100vw",
  };

  const editorStyle = {
    width: "100%",
    height: "95%",
  };

  const documentContainerRef = useRef(null);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/documents/fetchDocsList",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        if (Array.isArray(responseData.docs)) {
          setDocsList(responseData.docs); // Set the fetched document titles
        } else {
          console.error("Response data is not an array:", responseData);
        }
      } catch (error) {
        console.error("Fetching of docs failed:", error.message);
      }
    }
    fetchDocs();
  }, []);



  const fetchDocument = async () => {
    if (!selectedDocument) {
      console.error("No document selected");
      setError("No document selected");
      return;
    } else setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/documents/fetchDocument",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: selectedDocument }), // Send selected document title
        }
      );
      if (response.ok) {
        const document = await response.json();
        documentContainerRef.current.restrictEditing  = true;
        documentContainerRef.current.documentEditor.open(
          document.text
        ); // Set the text in the editor
        console.log("Document fetched successfully!");
      } else {
        console.error("Failed to fetch document:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  };

  return (
    <Container
      style={mainContainerStyle}
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ height: "100vh", width: "100%" }} bg="primary" text="black">
        <Card.Body>
          <DocumentEditorContainerComponent
            height="82vh"
            width="95%"
            id="container"
            style={editorStyle}
            ref={documentContainerRef}
            restrictEditing={true}
          >
          </DocumentEditorContainerComponent>
          {error && <Alert variant="danger" style={{ width: "95%" }}>{error}</Alert>}
          <div className="d-flex justify-content-center align-items-center">
            <Dropdown
              onSelect={(eventKey) => setSelectedDocument(eventKey)}
              className="mr-2"
              style={{ marginTop: "10px" }}
            >
              <Dropdown.Toggle variant="primary" id="documentDropdown">
                {selectedDocument ? selectedDocument : "Select Document"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {DocsList.map((docTitle, index) => (
                  <Dropdown.Item key={index} eventKey={docTitle}>{docTitle}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <input
              type="text"
              placeholder="Enter title"
              value={titleInput}
              onChange={handleTitleChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <p />
          <Button onClick={fetchDocument}>Fetch</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewText;
