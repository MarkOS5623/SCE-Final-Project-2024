import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../../components/Templates/TextEditor';
import '../Editor.css';
import StaffFormViewer from '../../components/FormViewers/staffFormViewer';
import { fetchUnsignedDocumentList, fetchSignedDocumentList } from '../../api/documents_reqeusts';
import { fetchAllFormsList, deleteForm } from '../../api/form_requests';
import FormTable from '../../components/Tables/FormTable';

function FormManagerPage() {
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [isAutorizerVisible, setisAutorizerVisible] = useState(false);
    const [isFormTableVisible, setisFormTableVisible] = useState(false);
    const [requestsList, setRequestsList] = useState({});
    const [signedRequestsList, setSignedRequestsList] = useState({});
    const [allFormsList, setAllFormsList] = useState([]);
    
    const toggleEditorVisibility = () => {
        setIsEditorVisible(!isEditorVisible); 
        setisAutorizerVisible(false);
        setisFormTableVisible(false);
    };

    const toggleAutorizerVisibility = () => {
        setisAutorizerVisible(!isAutorizerVisible); 
        setIsEditorVisible(false);
        setisFormTableVisible(false);
    };

    const toggleFormTableVisibility = () => {
        setisAutorizerVisible(false); 
        setIsEditorVisible(false);
        setisFormTableVisible(!isFormTableVisible);
    };

    const handleDeleteForm = async (selectedForm) => {
        try {
            const response = await deleteForm(selectedForm);
            if (response.status === 200) {
              console.log('Document deleted successfully!');
            } else {
              console.error('Failed to delete form: status ', response.status);
            }
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const allForms = await fetchAllFormsList();
                const unsignedDocumentList = await fetchUnsignedDocumentList(); 
                const signedDocumentList = await fetchSignedDocumentList(); 
              if (unsignedDocumentList.status) {
                setRequestsList(unsignedDocumentList.data);
                setSignedRequestsList(signedDocumentList.data)
                setAllFormsList(allForms.data.docs)
              } else {
                console.log('Response data is not an array or is empty');
              }
            } catch (error) {
              console.error('Fetching of docs failed:', error.message);
            }
          }
        fetchData();
    }, []);

    const actionPanel = () => {
        return (
            <div className='d-flex flex-column gap-2' style={{margin: "10px"}}>
                <Button onClick={toggleEditorVisibility} className='btn btn-primary'>{isEditorVisible ? 'Close Document Editor' : 'Open Document Editor'}</Button>
                <Button onClick={toggleAutorizerVisibility} className='btn btn-primary'>{isAutorizerVisible ? 'Close Request Manager' : 'Open Request Manager'}</Button>
                <Button onClick={toggleFormTableVisibility} className='btn btn-primary'>{isFormTableVisible ? 'Close Form Table' : 'Open Form Table'}</Button>
            </div>
        );
    };
    console.log(signedRequestsList)
    return (
        <div>
            <div className="mt-0">
                <Row>
                    <Col md={2}>{actionPanel()}</Col>
                    <Col md={8}>
                        <div className="right-panel">
                            {isEditorVisible && <TextEditor/>}
                            {isAutorizerVisible && <StaffFormViewer requestsList={requestsList} signedRequestsNameList={signedRequestsList.docs} signedRequestsIDList={signedRequestsList.ids} signedRequestsStatusList={signedRequestsList.statuses}/>}
                            {isFormTableVisible && <FormTable forms={allFormsList} handleDelete={handleDeleteForm}/>}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default FormManagerPage;
