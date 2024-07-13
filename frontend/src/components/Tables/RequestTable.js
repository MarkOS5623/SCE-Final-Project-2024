import React, { useState, useRef, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { DocumentEditorComponent } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument } from '../../api/documents_reqeusts';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary

export default function RequestTable({ documents }) {
  const { language } = useContext(LanguageContext);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [documentContent, setDocumentContent] = useState('');
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
      close: "Close"
    },
    he: {
      requestID: "מספר בקשה",
      request: "בקשה",
      status: "סטטוס",
      review: "ביקורת",
      close: "סגור"
    },
    ar: {
      requestID: "معرف الطلب",
      request: "طلب",
      status: "الحالة",
      review: "مراجعة",
      close: "إغلاق"
    }
  };

  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1">
        {!showReviewForm ? (
          <Table striped bordered hover style={{ width: '100%', minWidth: '300px' }}>
            <thead>
              <tr>
                <th>#</th>
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
        ) : (
          <>
            <DocumentEditorComponent
              height="auto"
              width="95%"
              id="container"
              style={editorStyle}
              ref={documentContainerRef}
              restrictediting={'true'}
            />
            <br></br>
            <Button variant="primary" onClick={() => setShowReviewForm(false)}>
              {translations[language].close}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
