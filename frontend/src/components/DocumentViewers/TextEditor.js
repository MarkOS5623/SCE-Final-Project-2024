import React, { useRef, useEffect, useState, useContext } from "react";
import { Button, Dropdown, Badge, Alert, Row, Col } from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchForm, saveForm, fetchAllFormsList, fetchAllTemplatesList } from "../../api/form_requests";
import CardContainer from "../Utils/CardContainer";
import { fetchAuthList } from "../../api/user_requests";
import { decodeValue } from "../../api/utils";
import { LanguageContext } from "../../Context/LanguageContextProvider";

const mainContainerStyle = {
  all: "unset",
  width: "auto",
  height: "auto",
}

const editorStyle = {
  width: "100%",
  height: "100vh"
}

const buttonStyle = {
  margin: '10px',
  width: '150px'
}

const translations = {
  en: {
    selectDocument: "Select Document",
    load: "Load",
    titlePlaceholder: "Title for form you want to save",
    addAuthorizers: "Add Authorizers",
    selectFormType: "Select Form Type",
    save: "Save",
    aTitleIsRequired: "A title is needed for saving a form",
    pleaseSelectForm: "Please select a form to fetch first",
    documentSavedSuccessfully: "Document saved successfully!",
    failedToSaveForm: "Failed to save form: status ",
    errorSavingForm: "Error saving form:",
    documentFetchedSuccessfully: "Document fetched successfully!",
    failedToFetchForm: "Failed to fetch form: status ",
    pleaseSelectFormToFetch: "Please select a form to fetch first",
    collapse: "Collapse",
    expand: "Mangement Panel",
    selectTemplate: 'Select Template'
  },
  he: {
    selectDocument: "בחר מסמך",
    load: "טען",
    titlePlaceholder: "כותרת לטופס שברצונך לשמור",
    addAuthorizers: "הוסף מאשרים",
    selectFormType: "בחר סוג טופס",
    save: "שמור",
    aTitleIsRequired: "כותרת נדרשת לשמירת טופס",
    pleaseSelectForm: "בבקשה בחר טופס לטעינה ראשית",
    documentSavedSuccessfully: "המסמך נשמר בהצלחה!",
    failedToSaveForm: "נכשלה שמירת הטופס: סטטוס ",
    errorSavingForm: "שגיאה בשמירת הטופס:",
    documentFetchedSuccessfully: "המסמך נטען בהצלחה!",
    failedToFetchForm: "נכשלה טעינת הטופס: סטטוס ",
    pleaseSelectFormToFetch: "בבקשה בחר טופס לטעינה ראשית",
    collapse: "כווץ",
    expand: "הרחב"
  },
  ar: {
    selectDocument: "اختر المستند",
    load: "تحميل",
    titlePlaceholder: "العنوان للنموذج الذي تريد حفظه",
    addAuthorizers: "إضافة المفوضين",
    selectFormType: "اختر نوع النموذج",
    save: "حفظ",
    aTitleIsRequired: "العنوان مطلوب لحفظ النموذج",
    pleaseSelectForm: "يرجى تحديد نموذج للاسترجاع أولاً",
    documentSavedSuccessfully: "تم حفظ المستند بنجاح!",
    failedToSaveForm: "فشل في حفظ النموذج: الحالة ",
    errorSavingForm: "خطأ في حفظ النموذج:",
    documentFetchedSuccessfully: "تم استرجاع المستند بنجاح!",
    failedToFetchForm: "فشل في استرجاع النموذج: الحالة ",
    pleaseSelectFormToFetch: "يرجى تحديد نموذج للاسترجاع أولاً",
    collapse: "طي",
    expand: "توسيع"
  }
};

const TextEditor = () => {
  const [ docsList, setDocsList ] = useState([]);
  const [ templatesList, setTemplatesList ] = useState([]);
  const [ selectedForm, setSelectedForm ] = useState('');
  const [ selectedTemplate, setSelectedTemplate ] = useState('');
  const [ titleInput, setTitleInput ] = useState('');
  const [ error, setError ] = useState('');
  const [ selectedNames, setSelectedNames ] = useState([]);
  const [ namesList, setNamesList ] = useState([]);
  const [ authlist, setAuthsList ] = useState({});
  const [ selectedType, setSelectedType ] = useState('');
  const [ isCollapsed, setIsCollapsed ] = useState(true);
  const { language } = useContext(LanguageContext); 

  const formContainerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetchAllFormsList();
        if (Array.isArray(response.docs)) {
          setDocsList(response.docs);
        } else {
          console.error('Response data is not an array:', response.docs);
        }
        response = await fetchAllTemplatesList();
        if (Array.isArray(response.docs)) {
          setTemplatesList(response.docs);
        } else {
          console.error('Response data is not an array:', response.docs);
        }
      } catch (error) {
        console.error('Fetching of docs failed:', error.message);
      }
      try {
        const response = await fetchAuthList();
        const names = response.map(item => item.name);
        setNamesList(names);
        setAuthsList(response);
      } catch (error) {
        console.error('Fetching of auths failed:', error.message);
      }
    }
    fetchData();
  }, []);

  const saveToDb = async () => {
    if (!titleInput) {
      console.error('A title is needed for saving a form')
      setError('A title is needed for saving a form')
      return;
    }
    setError(null);
    const selectedAuthsIds = selectedNames.map(name => {
      const author = authlist.find(auth => auth.name === name);
      return author ? author.id : null;
    });
    const type = selectedType
    const token = localStorage.getItem('token')
    const decodedToken = await decodeValue(JSON.stringify({ token: token }));
    const formData = formContainerRef.current.documentEditor.serialize();
    const author = decodedToken.user.id
    try {
      const response = await saveForm(formData, titleInput, selectedAuthsIds, author, type);
      if (response) {
        console.debug('Document saved successfully!');
        window.location.reload();
      } else {
        console.error('Failed to save form: status ', response.status);
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };
  
  const fetchFormData = async () => {
    if (!selectedForm) {
      console.error('Please select a form to fetch first')
      setError('Please select a form to fetch first')
      return;
    }
    setError(null);
    try {
      const response = await fetchForm(selectedForm);
      const selectedAuthorNames = response.signatories.map(id => {
        const author = authlist.find(auth => auth.id === id);
        return author ? author.name : null;
      }).filter(name => name !== null);
      setSelectedNames(selectedAuthorNames)
      setTitleInput(response.title)
      if (response) {
        formContainerRef.current.documentEditor.open(response.text); 
        console.debug('Document fetched successfully!');
      } else {
        console.error('Failed to fetch form: status ', response.status);
      }
    } catch (error) {
      console.error('Error fetching form:', error);
    }
  };

  const loadTemplate = async () => {
    if (!selectedTemplate) {
      console.error('Please select a form to fetch first')
      setError('Please select a form to fetch first')
      return;
    }
    setError(null);
    try {
      const response = await fetchForm(selectedTemplate);
      if (response) {
        formContainerRef.current.documentEditor.open(response.text); 
        console.debug('Template fetched successfully!');
      } else {
        console.error('Failed to fetch template: status ', response.status);
      }
    } catch (error) {
      console.error('Error fetching template:', error);
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

  const handleTypeSelect = (option) => {
    setSelectedType(option);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return ( 
    <CardContainer style={{ ...mainContainerStyle}}>
      <Row style={{ width: '100%' }}> 
        {error && <Alert variant="danger" style={{ width: '100%', marginTop: '10px' }}>{translations[language].errorSavingForm}{error}</Alert>}
        <Col xs={8} style={{ width: isCollapsed ? '100%' : '75%', paddingRight: '10px' }}>
          <DocumentEditorContainerComponent height="82vh" id="container" style={editorStyle} ref={formContainerRef}>
            <Inject services={[Toolbar, WordExport]} />
          </DocumentEditorContainerComponent>
        </Col>
        {!isCollapsed && (
          <Col xs={4} style={{ width: '20%', paddingTop: '20px', height: '20%'}} className="d-flex flex-column justify-content-center">
            <Row style={{ width: '100%', marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '50px' }}> 
              <div style={{ marginTop: '15px', padding: '20px', borderRadius: '20px', backgroundColor: 'white' }}>
                <Dropdown style={{ width: 'auto', fontSize: '15px', fontWeight: 'bold'}}>
                  <Dropdown.Toggle variant="outline-success" id="formDropdown">
                    {selectedForm ? selectedForm : translations[language].selectDocument}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: '220px', fontSize: '15px', fontWeight: 'bold', overflowY: 'scroll', maxHeight: '200px'}}>
                    {docsList.map((docTitle, index) => (
                    <Dropdown.Item key={index} onClick={() => setSelectedForm(docTitle)} eventKey={docTitle}>
                      <Button variant="outline-success" style={{width: '100%', whiteSpace: 'normal', textOverflow: 'initial', overflow: 'initial' }}>{docTitle}</Button>
                    </Dropdown.Item >
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button onClick={fetchFormData} style={{...buttonStyle, width: '160px', height: '50px',fontSize: '20px',fontWeight: 'bold',borderRadius: '20px'}}>{translations[language].load}</Button>
                </div>
              </div>
              <div style={{ marginTop: '15px', padding: '20px', borderRadius: '20px', backgroundColor: 'white' }}>
                <Dropdown style={{ width: 'auto', fontSize: '15px', fontWeight: 'bold'}}>
                  <Dropdown.Toggle variant="outline-success" id="formDropdown">
                    {selectedTemplate ? selectedTemplate : translations[language].selectTemplate}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: '220px', fontSize: '15px', fontWeight: 'bold', overflowY: 'scroll', maxHeight: '200px'}}>
                    {templatesList.map((docTitle, index) => (
                    <Dropdown.Item key={index} onClick={() => setSelectedTemplate(docTitle)} eventKey={docTitle}>
                      <Button variant="outline-success" style={{width: '100%', whiteSpace: 'normal', textOverflow: 'initial', overflow: 'initial' }}>{docTitle}</Button>
                    </Dropdown.Item >
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button onClick={loadTemplate} style={{...buttonStyle, width: '160px', height: '50px',fontSize: '20px',fontWeight: 'bold',borderRadius: '20px'}}>{translations[language].load}</Button>
                </div>
              </div>
            </Row>
            <Row style={{ width: '100%', height: '40vh', marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
              <div style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: '15px', padding: '20px', borderRadius: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.3)', backgroundColor: 'white', marginLeft: '130px' }}>
                  <input type="text" placeholder={translations[language].titlePlaceholder} value={titleInput} onChange={handleTitleChange} className="mb-2" style={{width: '220px', height: '40px', marginBottom: '20px'}}/>
                  <Dropdown style={{ width: '220px', fontSize: '20px', fontWeight: 'bold' }}>
                    <Dropdown.Toggle variant="outline-success" id="nameDropdown" style={{ width: '100%' }}>
                      {translations[language].addAuthorizers}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: '220px', fontSize: '20px', fontWeight: 'bold', overflowY: 'scroll', maxHeight: '200px' }}>
                      {namesList.map((name, index) => (
                        <Dropdown.Item key={index} onClick={() => handleNameSelect(name)} style={{ width: '100%' }}>
                          <Button variant="outline-success"  style={{width: '100%', whiteSpace: 'normal', textOverflow: 'initial', overflow: 'initial'}}>{name}</Button>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <div>
                    {selectedNames.map((name, index) => (
                      <Badge key={index} variant="primary" style={{ marginRight: '10px', marginTop: '10px', width: '160px', border: 'solid 3px black', fontSize: '15px' }}>
                        {name} 
                        <Button variant="danger" size="sm" onClick={() => removeName(name)} style={{ marginLeft: '10px', }}>X</Button>
                      </Badge>
                    ))}
                  </div>
                  <Dropdown style={{ width: '220px', fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>
                    <Dropdown.Toggle variant="outline-success" id="optionDropdown" style={{ width: '100%' }}>
                      {selectedType || translations[language].selectFormType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: '220px', fontSize: '20px', fontWeight: 'bold' }}>
                      <Dropdown.Item onClick={() => handleTypeSelect('Student')}>Student</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTypeSelect('Staff')}>Staff</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTypeSelect('Everybody')}>Everybody</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTypeSelect('Template')}>Template</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTypeSelect('Return')}>Return</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="d-flex justify-content-center">
                    <Button onClick={saveToDb} style={{ ...buttonStyle, width: '160px', height: '50px',fontSize: '20px',fontWeight: 'bold',borderRadius: '20px'}}>{translations[language].save}</Button>
                </div>
                </div>
            
            </div>
            </Row>
          </Col>
        )}
        <Button onClick={toggleCollapse} style={{ ...buttonStyle, position: 'absolute', right: '15px', top: '-9px' }}>
          {isCollapsed ? translations[language].expand : translations[language].collapse}
        </Button>
      </Row>
    </CardContainer>
  );
};

export default TextEditor;
