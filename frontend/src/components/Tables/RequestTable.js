import React, { useState, useRef, useContext, useEffect, useMemo } from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';
import { fetchDocument, deleteDocuments } from '../../api/documents_requests';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import { pdfConverter, handleApiError, decodeValue } from '../../api/utils';
import { useNavigate } from 'react-router-dom';
import { fetchRequest } from '../../api/user_requests';

const translations = {
  en: {
    requestID: "Request ID",
    request: "Request",
    status: "Status",
    review: "Review",
    clear: "Clear",
    delete: "Delete",
    download: "Download",
    searchPlaceholder: "Search requests..."
  },
  he: {
    requestID: "מספר בקשה",
    request: "בקשה",
    status: "סטטוס",
    review: "ביקורת",
    clear: "נקה",
    delete: "מחק",
    download: "הורד",
    searchPlaceholder: "חפש בקשות..."
  },
  ar: {
    requestID: "معرف الطلب",
    request: "طلب",
    status: "الحالة",
    review: "مراجعة",
    clear: "مسح",
    delete: "حذف",
    download: "تحميل",
    searchPlaceholder: "ابحث عن الطلبات..."
  }
};

export default function RequestTable({ flag }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState({ docs: [], ids: [], statuses: [] });
  const [isLoading, setIsLoading] = useState(true);
  const downloadContainerRef = useRef(null);

  const handleDeleteToggle = () => {
    setDeleteMode(!deleteMode);
    setSelectedDocuments([]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = await decodeValue(JSON.stringify({ token }));
        const response = await fetchRequest(decodedToken.user._id);
        if (response) {
          const documentStatuses = response.statuses;
          const docsArray = response.docs.map((doc, index) => ({
            subject: doc.subject,
            documentId: doc.documentId,
            status: documentStatuses[index],
          }));
          const filteredDocs = flag
          ? docsArray.filter(doc => doc.status !== 'pending approval')
          : docsArray.filter(doc => doc.status === 'pending approval');


          setDocuments({
            docs: filteredDocs.map(doc => doc.subject),
            ids: filteredDocs.map(doc => doc.documentId),
            statuses: filteredDocs.map(doc => doc.status),
          });
        } else {
          console.log('Response data is empty');
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [flag]);

  const handleSelectDocument = (documentId) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(documentId)
        ? prevSelected.filter(id => id !== documentId)
        : [...prevSelected, documentId]
    );
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
      handleApiError(error);
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
      handleApiError(error);
    }
  };

  const handleReview = (documentId) => {
    navigate(`/requestmanager/history/${documentId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDocs = useMemo(() => {
    return documents.docs.filter(doc =>
      doc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents.docs, searchQuery]);

  if (isLoading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  return (
    <div className="d-flex flex-row">
      <div className="flex-grow-1">
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={downloadContainerRef}>
            <Inject services={[WordExport, SfdtExport]} />
          </DocumentEditorContainerComponent>
        </div>
        {!flag ? <h1>Pending Requests</h1> : <h1>Request History</h1>}
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
        <Form.Control
          type="text"
          placeholder={translations[language].searchPlaceholder}
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-3"
        />
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
            {filteredDocs.length === 0 ? (
              <tr>
                <td colSpan="7">No matching requests found</td>
              </tr>
            ) : (
              filteredDocs.map((doc, index) => (
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
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
