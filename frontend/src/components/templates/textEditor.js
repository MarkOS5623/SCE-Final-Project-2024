import React, { useRef, useEffect, useState } from "react";
import { Button, Dropdown, Badge, Alert, Row, Col } from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchTemplate, saveTemplate, fetchTemplatesList } from "../../api/templates_requests";
import CardContainer from "../cardContainer";
import { fetchAuthList } from "../../api/user_requests";
import { decodeValue } from "../../api/utils";
const TextEditor = () => {
  const [DocsList, setDocsList] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [error, setError] = useState('');
  const [selectedNames, setSelectedNames] = useState([]);
  const [namesList, setNamesList] = useState([]);
  const [authlist, setAuthsList] = useState({});

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
    async function fetchData() {
      try {
        const response = await fetchTemplatesList();
        if (Array.isArray(response.data.docs)) {
          setDocsList(response.data.docs);
        } else {
          console.error('Response data is not an array:', response.data.docs);
        }
      } catch (error) {
        console.error('Fetching of docs failed:', error.message);
      }
      try {
        const response = await fetchAuthList();
        const names = response.data.map(item => item.name);
        setNamesList(names);
        setAuthsList(response.data);
      } catch (error) {
        console.error('Fetching of auths failed:', error.message);
      }
    }
    fetchData();
  }, []);

  const saveToDb = async () => {
    if (!titleInput) {
      console.error('A title is needed for saving a document')
      setError('A title is needed for saving a document')
      return;
    }
    setError(null);
    const selectedAuthsIds = selectedNames.map(name => {
      const author = authlist.find(auth => auth.name === name);
      return author ? author.id : null;
    });
    const token = localStorage.getItem('token')
    const decodedToken = await decodeValue(JSON.stringify({ token: token }));
    const documentData = documentContainerRef.current.documentEditor.serialize();
    const author = decodedToken.data.user.id
    try {
      const response = await saveTemplate(documentData, titleInput, selectedAuthsIds, author);
      if (response.status === 200) {
        console.log('Document saved successfully!');
      } else {
        console.error('Failed to save document: status ', response.status);
      }
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };
  
  const fetchTemplateData = async () => {
    if (!selectedDocument) {
      console.error('Please select a document to fetch first')
      setError('Please select a document to fetch first')
      return;
    }
    setError(null);
    try {
      const response = await fetchTemplate(selectedDocument);
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

  const handleNameSelect = (name) => {
    if (!selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const removeName = (nameToRemove) => {
    const updatedNames = selectedNames.filter(name => name !== nameToRemove);
    setSelectedNames(updatedNames);
  };

  return ( /* צריך להזיז את כל הכפתורים והאינפוטים של השמירה לכרטיס אחד וכל מה שקשור
           לטעינה של מסמכים לכרטיס אחר ששניהם יהיה בצד שמאל רק בכרטיסים שונים שיהיה יותר ברור מה זה מה*/
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
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="nameDropdown">
                Add Authorizers
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {namesList.map((name, index) => (
                  <Dropdown.Item key={index} onClick={() => handleNameSelect(name)}>{name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div>
              {selectedNames.map((name, index) => (
                <Badge key={index} variant="primary" style={{ marginRight: '5px', marginTop: '5px' }}>
                  {name} 
                  <Button variant="danger" size="sm" onClick={() => removeName(name)} style={{ marginLeft: '3px', height: '40px' }}>X</Button>
                </Badge>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Button onClick={saveToDb} style={buttonStyle}>Save</Button>
            <Button onClick={fetchTemplateData} style={buttonStyle}>Fetch</Button>
          </div>
        </Col>
      </Row>
    </CardContainer>
  );
};

export default TextEditor;
