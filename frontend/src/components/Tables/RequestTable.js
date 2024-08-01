import React, { useState, useRef, useContext } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument, deleteDocuments } from '../../api/documents_requests';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { pdfConverter } from '../../api/utils';
import { useNavigate } from 'react-router-dom';

const translations = {
  en: {
    requestID: "Request ID",
    request: "Request",
    status: "Status",
    review: "Review",
    clear: "Clear",
    delete: "Delete",
    download: "Download"
  },
  he: {
    requestID: "מספר בקשה",
    request: "בקשה",
    status: "סטטוס",
    review: "ביקורת",
    clear: "נקה",
    delete: "מחק",
    download: "הורד"
  },
  ar: {
    requestID: "معرف الطلب",
    request: "طلب",
    status: "الحالة",
    review: "مراجعة",
    clear: "مسح",
    delete: "حذف",
    download: "تحميل"
  }
};

export default function RequestTable({ documents, setDocuments, flag }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate(); 

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const downloadContainerRef = useRef(null);

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

  const handleDownload = async (documentId) => {
    try {
      const response = await fetchDocument(documentId);
      if (!response) {
        throw new Error('Failed to fetch document');
      }
      downloadContainerRef.current.documentEditor.open(response.text);
      await pdfConverter(downloadContainerRef); 
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handleReview = (documentId) => {
    navigate(`/requestmanager/history/${documentId}`); 
  };

  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1">
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={downloadContainerRef}>
            <Inject services={[WordExport, SfdtExport]} />
          </DocumentEditorContainerComponent>
        </div>
        {!flag && (<h1>Pending Requests</h1>)}
        {flag && (<h1>Request History</h1>)}
        {flag && !deleteMode && (
          <Button variant="primary" onClick={handleDeleteToggle} style={{ margin: '10px' }}>
            {translations[language].clear}
          </Button>
        )}
        {deleteMode && (
          <Button variant="danger" onClick={handleDeleteDocuments} style={{ margin: '10px' }}>
            {translations[language].delete}
          </Button>
        )}
        <Table striped bordered hover style={{ width: '100%', minWidth: '300px' }}>
          <thead>
            <tr>
              <th>#</th>
              {deleteMode && <th>Select</th>}
              <th>{translations[language].requestID}</th>
              <th>{translations[language].request}</th>
              <th>{translations[language].status}</th>
              <th>{translations[language].review}</th>
              <th>{translations[language].download}</th>
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
                <td>
                  <Button variant="primary" onClick={() => handleDownload(documents.ids[index])}>
                    {translations[language].download}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
