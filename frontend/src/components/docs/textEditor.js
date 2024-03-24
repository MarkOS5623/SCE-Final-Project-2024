import React, { useRef, useEffect, useState } from "react";
import { Card, Container, Button, Dropdown, Alert} from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument, saveDocument, fetchDocsList } from "../../api/document_requests";

const TextEditor = () => {
  const [DocsList, setDocsList] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [error, setError] = useState('');

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
        const response = await fetchDocsList();
        console.log(response.data)
        if (Array.isArray(response.data.docs)) {
          setDocsList(response.data.docs);
        } else {
          console.error('Response data is not an array:', response.data.docs);
        }
      } catch (error) {
        console.error('Fetching of docs failed:', error.message);
      }
    }
    fetchDocs();
  }, []);
  

  const saveToDb = async () => {
    if (!titleInput) {
      console.error('Title cannot be empty')
      setError('Title cannot be empty')
      return;
    } else setError(null)

    const documentData = documentContainerRef.current.documentEditor.serialize();
    try {
      const response = await saveDocument(documentData, titleInput)
      if (response.status === 200) {
        console.log('Document saved successfully!');
      } else {
        console.error('Failed to save document: status ', response.status);
      }
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };
  
  const fetchDoc = async () => {
    if (!selectedDocument) {
      console.error('No document selected')
      setError('No document selected')
      return;
    } else setError(null)
    try {
      const response = await fetchDocument(selectedDocument)
      if (response.status === 200) {
        documentContainerRef.current.documentEditor.open(response.data.text); // Set the text in the editor
        console.log('Document fetched successfully!');
      } else {
        console.error('Failed to fetch document: status ', response.status);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  };

  return (
    <Container style={mainContainerStyle} className="d-flex justify-content-center align-items-center">
      <Card style={{ height: "100vh", width: "100%" }} bg="primary" text="black">
        <Card.Body>
          <DocumentEditorContainerComponent height="82vh" width="95%" id="container" style={editorStyle} ref={documentContainerRef}>
            <Inject services={[Toolbar, WordExport]} />
          </DocumentEditorContainerComponent>
          {error && <Alert variant="danger"  style={{width: '95%'}}>{error}</Alert>}
          <div className="d-flex justify-content-center align-items-center">
            <Dropdown onSelect={(eventKey) => setSelectedDocument(eventKey)} className="mr-2"  style={{marginTop: '10px'}}>
              <Dropdown.Toggle variant="primary" id="documentDropdown">
                {selectedDocument ? selectedDocument : "Select Document"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {DocsList.map((docTitle, index) => (
                  <Dropdown.Item key={index} eventKey={docTitle}>{docTitle}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <input type="text" placeholder="Enter title" value={titleInput} onChange={handleTitleChange}  style={{marginLeft: '10px'}}/>
          </div>
          <p/>
          <Button onClick={saveToDb} style={{marginRight: '10px'}}>Save</Button>
          <Button onClick={fetchDoc}>Fetch</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TextEditor;
