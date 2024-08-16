import React, { useRef, useEffect, useState, useContext } from "react";
import { Button, Dropdown, Badge, Alert, Row, Col } from "react-bootstrap";
import { Toolbar, Inject, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchForm, saveForm, fetchAllFormsList } from "../../api/form_requests";
import CardContainer from "../Utils/CardContainer";
import { fetchAuthList } from "../../api/user_requests";
import { decodeValue } from "../../api/utils";
import { LanguageContext } from "../../Context/LanguageContextProvider";

const mainContainerStyle = {
  all: "unset",
  width: "auto",
  height: "auto"
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
    addTier: "Add Tier",
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
    expand: "Management Panel"
  },
  he: {
    selectDocument: "בחר מסמך",
    load: "טען",
    titlePlaceholder: "כותרת לטופס שברצונך לשמור",
    addTier: "הוסף דרגה",
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
    addTier: "إضافة مستوى",
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
  const [ docsList, setDocsList ] = useState([]); // Unused state
  const [ titleInput, setTitleInput ] = useState('');
  const [ error, setError ] = useState('');
  const [ tiers, setTiers ] = useState([]);
  const [ namesList, setNamesList ] = useState([]);
  const [ authlist, setAuthsList ] = useState({});
  const [ selectedType, setSelectedType ] = useState('');
  const [ selectedForm, setSelectedForm ] = useState(''); // Reintroduced state
  const [ isCollapsed, setIsCollapsed ] = useState(true);
  const { language } = useContext(LanguageContext);

  const formContainerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchAllFormsList();
        if (Array.isArray(response.docs)) {
          setDocsList(response.docs);
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
      console.error('A title is needed for saving a form');
      setError('A title is needed for saving a form');
      return;
    }
    setError(null);
  
    // Construct the signatoryTiers array
    const signatoryTiers = tiers.map(tier => {
      const selectedAuthIds = tier.selectedNames.map(name => {
        const author = authlist.find(auth => auth.name === name);
        return author ? author.id : null;
      }).filter(id => id !== null);
  
      return { selectedAuthIds };
    });
  
    const type = selectedType;
    const token = localStorage.getItem('token');
    const decodedToken = await decodeValue(JSON.stringify({ token: token }));
    const formData = formContainerRef.current.documentEditor.serialize();
    const author = decodedToken.user.id;
    console.log(signatoryTiers)
    try {
      const response = await saveForm(formData, titleInput, signatoryTiers, author, type);
      if (response) {
        console.debug('Document saved successfully!');
        // window.location.reload();
      } else {
        console.error('Failed to save form: status ', response.status);
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };
  

  const fetchFormData = async () => {
    if (!selectedForm) {
      console.error('Please select a form to fetch first');
      setError('Please select a form to fetch first');
      return;
    }
    setError(null);
    try {
      const response = await fetchForm(selectedForm);
      const selectedAuthorNames = response.signatories.map(id => {
        const author = authlist.find(auth => auth.id === id);
        return author ? author.name : null;
      }).filter(name => name !== null);
      setTiers([{ selectedNames: selectedAuthorNames }]);
      setTitleInput(response.title);
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

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  };

  const handleNameSelect = (name, tierIndex) => {
    const updatedTiers = [...tiers];
    if (!updatedTiers[tierIndex].selectedNames.includes(name)) {
      updatedTiers[tierIndex].selectedNames.push(name);
      setTiers(updatedTiers);
    }
  };

  const removeName = (nameToRemove, tierIndex) => {
    const updatedTiers = [...tiers];
    updatedTiers[tierIndex].selectedNames = updatedTiers[tierIndex].selectedNames.filter(name => name !== nameToRemove);
    setTiers(updatedTiers);
  };

  const handleTypeSelect = (option) => {
    setSelectedType(option);
  };

  const handleDocumentSelect = (docId) => {
    setSelectedForm(docId);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addTier = () => {
    if (tiers.length < 3) {
      setTiers([...tiers, { selectedNames: [] }]);
    }
  };

  const removeTier = (index) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };
  
  return (
    <CardContainer style={{ ...mainContainerStyle }}>
      <Row style={{ width: '100%' }}>
        {error && <Alert variant="danger" style={{ width: '100%', marginTop: '10px' }}>{translations[language].errorSavingForm}{error}</Alert>}
        <Col xs={8} style={{ width: isCollapsed ? '100%' : '75%', paddingRight: '10px' }}>
          <DocumentEditorContainerComponent height="82vh" id="container" style={editorStyle} ref={formContainerRef}>
            <Inject services={[Toolbar, WordExport]} />
          </DocumentEditorContainerComponent>
        </Col>
        {!isCollapsed && (
          <Col xs={4} style={{ width: '20%', paddingTop: '20px', height: '20%' }}>
            <Row style={{ width: '100%', paddingLeft: '20px' }}>
              <Dropdown onSelect={handleDocumentSelect} className="mb-3">
                <Dropdown.Toggle variant="primary">{translations[language].selectDocument}</Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '220px', fontSize: '15px', fontWeight: 'bold', overflowY: 'scroll', maxHeight: '200px'}}>
                    {docsList.map((docTitle, index) => (
                    <Dropdown.Item key={index} onClick={() => setSelectedForm(docTitle)} eventKey={docTitle}>
                      <Button variant="outline-success" style={{width: '100%', whiteSpace: 'normal', textOverflow: 'initial', overflow: 'initial' }}>{docTitle}</Button>
                    </Dropdown.Item >
                    ))}
                  </Dropdown.Menu>
              </Dropdown>
              <input type="text" className="form-control" placeholder={translations[language].titlePlaceholder} style={{ marginBottom: '20px', height: '50px', fontSize: '20px' }} value={titleInput} onChange={handleTitleChange} />
              <Dropdown onSelect={handleTypeSelect} className="mb-3">
                <Dropdown.Toggle variant="primary">{translations[language].selectFormType}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
                  <Dropdown.Item eventKey="Staff">Staff</Dropdown.Item>
                  <Dropdown.Item eventKey="Everybody">Everybody</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="d-grid gap-2">
                <Button variant="success" onClick={fetchFormData} style={buttonStyle}>{translations[language].load}</Button>
                <Button variant="secondary" onClick={saveToDb} style={buttonStyle}>{translations[language].save}</Button>
              </div>
              <Button variant="info" onClick={addTier} style={buttonStyle} disabled={tiers.length >= 3}>{translations[language].addTier}</Button>
              {tiers.map((tier, index) => (
                <div key={index} style={{ marginTop: '20px', position: 'relative' }}>
                  <h5>{translations[language].addTier} {index + 1}</h5>
                  <Button
                    variant="danger"
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      borderRadius: '50%',
                      padding: '0 8px',
                      height: '30px',
                      width: '30px',
                      fontSize: '16px'
                    }}
                    onClick={() => removeTier(index)}
                  >
                x
              </Button>
              <Dropdown onSelect={(name) => handleNameSelect(name, index)}>
                <Dropdown.Toggle variant="primary" id={`dropdown-basic-${index}`}>
                  {translations[language].selectAuthorizers}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {namesList.map((name) => (
                    <Dropdown.Item key={name} eventKey={name}>{name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div style={{ marginTop: '10px' }}>
                {tier.selectedNames.map((name) => (
                  <Badge key={name} pill variant="primary" onClick={() => removeName(name, index)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                    {name} x
                  </Badge>
                ))}
              </div>
            </div>
            ))}
            </Row>
          </Col>
        )}
      </Row>
      <Row style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <Button variant="secondary" onClick={toggleCollapse}>{isCollapsed ? translations[language].expand : translations[language].collapse}</Button>
      </Row>
    </CardContainer>
  );
}

export default TextEditor;
