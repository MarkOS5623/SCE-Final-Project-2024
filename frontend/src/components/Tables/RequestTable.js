import React, { useState, useRef, useEffect, useContext } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument, deleteDocuments } from '../../api/documents_requests';
import { LanguageContext } from '../../Context/LanguageContextProvider'; 

export default function RequestTable({ documents, setDocuments, flag }) {
  const { language } = useContext(LanguageContext);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [documentContent, setDocumentContent] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const documentContainerRef = useRef(null);
  const editorStyle = { width: "100%", height: "95%" };

  const handleReview = async (documentId) => {
    try {
      const response = await fetchDocument(documentId);
      if (response.status !== 200) {
        throw new Error('Failed to fetch document');
      }
      setDocumentContent(response.data.text);
      setShowReviewForm(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteToggle = () => {
    setDeleteMode(!deleteMode);
    setSelectedDocuments([]);
  };

  const handleSelectDocument = (documentId) => {
    setSelectedDocuments((prevSelected) => {
      if (prevSelected.includes(documentId)) {
        return prevSelected.filter(id => id !== documentId);
      } else {
        return [...prevSelected, documentId];
      }
    });
  };

  const handleDeleteDocuments = async () => {
    try {
      const response = await deleteDocuments(selectedDocuments);
      if (response.status === 200) {
        console.log('Documents deleted successfully');
        const remainingDocuments = {
          docs: documents.docs.filter((_, index) => !selectedDocuments.includes(documents.ids[index])),
          ids: documents.ids.filter(id => !selectedDocuments.includes(id)),
          statuses: documents.statuses.filter((_, index) => !selectedDocuments.includes(documents.ids[index])),
        };
        setDocuments(remainingDocuments);
        setDeleteMode(false);
        setSelectedDocuments([]);
      }
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  };

  useEffect(() => {
    if (showReviewForm && documentContainerRef.current) {
      documentContainerRef.current.open(documentContent);
    }
  }, [showReviewForm, documentContent]);

  // Translations for different languages
  const translations = {
    en: {
      requestID: "Request ID",
      request: "Request",
      status: "Status",
      review: "Review",
      close: "Close",
      clear: "Clear",
      delete: "Delete"
    },
    he: {
      requestID: "מספר בקשה",
      request: "בקשה",
      status: "סטטוס",
      review: "ביקורת",
      close: "סגור",
      clear: "נקה",
      delete: "מחק"
    },
    ar: {
      requestID: "معرف الطلب",
      request: "طلب",
      status: "الحالة",
      review: "مراجعة",
      close: "إغلاق",
      clear: "مسح",
      delete: "حذف"
    }
  };

  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1">
        {flag && !showReviewForm && (
          <Button variant="primary" onClick={handleDeleteToggle} style={{ margin: '10px' }}>
            {translations[language].clear}
          </Button>
        )}
        {deleteMode && !showReviewForm && (
          <Button variant="danger" onClick={handleDeleteDocuments} style={{ margin: '10px' }}>
            {translations[language].delete}
          </Button>
        )}
        {!showReviewForm ? (
          <>
            <Table striped bordered hover style={{ width: '100%', minWidth: '300px' }}>
              <thead>
                <tr>
                  <th>#</th>
                  {deleteMode && <th>Select</th>}
                  <th>{translations[language].requestID}</th>
                  <th>{translations[language].request}</th>
                  <th>{translations[language].status}</th>
                  <th>{translations[language].review}</th>
                </tr>
              </thead>
              <tbody>
                {documents.docs && documents.docs.map((doc, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {deleteMode && (
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedDocuments.includes(documents.ids[index])}
                          onChange={() => handleSelectDocument(documents.ids[index])}
                        />
                      </td>
                    )}
                    <td>{documents.ids[index]}</td>
                    <td>{doc}</td>
                    <td>{documents.statuses[index]}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleReview(documents.ids[index])}>
                        {translations[language].review}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <DocumentEditorComponent
              height="85vh"
              width="95%"
              id="container"
              style={editorStyle}
              ref={documentContainerRef}
              restrictEditing={'true'}
            />
            <br />
            <Button variant="primary" onClick={() => setShowReviewForm(false)}>
              {translations[language].close}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
