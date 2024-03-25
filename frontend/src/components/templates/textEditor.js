import React, { useRef, useEffect, useState } from "react";
import { Button, Dropdown, Alert, Row, Col } from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchTemplate, saveTemplate, fetchTemplatesList } from "../../api/templates_requests";
import CardContainer from "../cardContainer";

const TextEditor = () => {
  const [DocsList, setDocsList] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [error, setError] = useState('');

  const mainContainerStyle = {
    all: "unset",
    width: "100vw",
    height: "90vw",
  }

  const editorStyle = {
    width: "75%",
    height: "82vh"
  }

  const buttonStyle = {
    margin: '10px',
    width: '100px'
  }

  const documentContainerRef = useRef(null);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetchTemplatesList();
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
      console.error('A title is needed for saving a document')
      setError('A title is needed for saving a document')
      return;
    } else setError(null)

    const documentData = documentContainerRef.current.documentEditor.serialize();
    try {
      const response = await saveTemplate(documentData, titleInput)
      if (response.status === 200) {
        console.log('Document saved successfully!');
      } else {
        console.error('Failed to save document: status ', response.status);
      }
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };
  
  const fetchTem = async () => {
    if (!selectedDocument) {
      console.error('Please select a document to fetch first')
      setError('Please select a document to fetch first')
      return;
    } else setError(null)
    try {
      const response = await fetchTemplate(selectedDocument)
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
    <CardContainer style={{ ...mainContainerStyle}}>
      <Row style={{ width: '100%' }}> 
        {error && <Alert variant="danger" style={{ width: '100%', marginTop: '10px' }}>{error}</Alert>}
        <Col xs={8} style={{ width: '80%' }}>
          <DocumentEditorContainerComponent height="82vh" id="container" style={editorStyle} ref={documentContainerRef}>
            <Inject services={[Toolbar, WordExport]} />
          </DocumentEditorContainerComponent>
        </Col>
        <Col xs={4} style={{ width: '20%', paddingTop: '20px', backgroundColor: 'white', height: '20%'}} className="d-flex flex-column justify-content-center">
          <h1 style={{color:'black'}}>This is for fetching and saving templates to the database</h1>
          <Dropdown onSelect={(eventKey) => setSelectedDocument(eventKey)} className="mb-2">
            <Dropdown.Toggle variant="primary" id="documentDropdown">
              {selectedDocument ? selectedDocument : "Select Document"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {DocsList.map((docTitle, index) => (
                <Dropdown.Item key={index} eventKey={docTitle}>{docTitle}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <input type="text" placeholder="Title for document you want to save" value={titleInput} onChange={handleTitleChange} className="mb-2"/>
          <div className="d-flex justify-content-between">
            <Button onClick={saveToDb} style={buttonStyle}>Save</Button>
            <Button onClick={fetchTem} style={buttonStyle}>Fetch</Button>
          </div>
        </Col>
      </Row>
    </CardContainer>
  );
};

export default TextEditor;
