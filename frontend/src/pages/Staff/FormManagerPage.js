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
    const [isAutorizerVisible, setIsAutorizerVisible] = useState(false);
    const [isFormTableVisible, setIsFormTableVisible] = useState(false);
    const [isActionPanelCollapsed, setIsActionPanelCollapsed] = useState(false);
    const [requestsList, setRequestsList] = useState({});
    const [signedRequestsList, setSignedRequestsList] = useState({});
    const [allFormsList, setAllFormsList] = useState([]);
    
    const toggleEditorVisibility = () => {
        setIsEditorVisible(!isEditorVisible); 
        setIsAutorizerVisible(false);
        setIsFormTableVisible(false);
        setIsActionPanelCollapsed(true); // Collapse action panel when opening another panel
    };

    const toggleAutorizerVisibility = () => {
        setIsAutorizerVisible(!isAutorizerVisible); 
        setIsEditorVisible(false);
        setIsFormTableVisible(false);
        setIsActionPanelCollapsed(true); // Collapse action panel when opening another panel
    };

    const toggleFormTableVisibility = () => {
        setIsAutorizerVisible(false); 
        setIsEditorVisible(false);
        setIsFormTableVisible(!isFormTableVisible);
        setIsActionPanelCollapsed(true); // Collapse action panel when opening another panel
    };

    const toggleActionPanelCollapse = () => {
        setIsActionPanelCollapsed(!isActionPanelCollapsed);
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
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const allForms = await fetchAllFormsList();
                const unsignedDocumentList = await fetchUnsignedDocumentList(); 
                const signedDocumentList = await fetchSignedDocumentList(); 
                if (unsignedDocumentList.status) {
                    await setSignedRequestsList(signedDocumentList.data);
                    await setRequestsList(unsignedDocumentList.data);
                    await setAllFormsList(allForms.data.docs);
                } else {
                    console.log('Response data is not an array or is empty');
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    const actionPanel = () => (
        <div className="d-flex flex-column gap-2" style={{ margin: "10px" }}>
            <Button onClick={toggleEditorVisibility} className='btn btn-primary'>{isEditorVisible ? 'Close Document Editor' : 'Open Document Editor'}</Button>
            <Button onClick={toggleAutorizerVisibility} className='btn btn-primary'>{isAutorizerVisible ? 'Close Request Manager' : 'Open Request Manager'}</Button>
            <Button onClick={toggleFormTableVisibility} className='btn btn-primary'>{isFormTableVisible ? 'Close Form Table' : 'Open Form Table'}</Button>
        </div>
    );

    return (
        <div>
            <div className="mt-0">
                <Row>
                    <Col md={isActionPanelCollapsed ? 1 : 2} className={`action-panel ${isActionPanelCollapsed ? 'collapsed' : ''}`}>
                        <Button onClick={toggleActionPanelCollapse} className={`btn btn-secondary mb-2 ${isActionPanelCollapsed ? 'w-100' : ''}`}>
                            {isActionPanelCollapsed ? 'Action Panel >' : '< Action Panel'}
                        </Button>
                        {!isActionPanelCollapsed && actionPanel()}
                    </Col>
                    <Col md={isActionPanelCollapsed ? 11 : 9} style={{ transition: 'width 0.3s' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            {isEditorVisible && <TextEditor />}
                            {isAutorizerVisible && <StaffFormViewer requestsList={requestsList} signedRequestsNameList={signedRequestsList.docs} signedRequestsIDList={signedRequestsList.ids} signedRequestsStatusList={signedRequestsList.statuses} />}
                            {isFormTableVisible && <FormTable forms={allFormsList} handleDelete={handleDeleteForm} />}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default FormManagerPage;
