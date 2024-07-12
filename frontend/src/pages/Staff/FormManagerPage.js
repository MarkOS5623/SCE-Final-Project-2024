import React, { useContext,useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../../components/Templates/textEditor';
import '../Editor.css';
import StaffFormViewer from '../../components/FormViewers/staffFormViewer';
import { fetchUnsignedDocumentList, fetchSignedDocumentList } from '../../api/documents_reqeusts';
import { fetchAllFormsList, deleteForm } from '../../api/form_requests';
import FormTable from '../../components/Tables/FormTable';
import { LanguageContext } from '../../context/LanguageContextProvider';
import expandSidebarIcon from '../../assets/actionpanelicon.png'; 

function FormManagerPage() {
    const { language } = useContext(LanguageContext);
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
        setIsActionPanelCollapsed(true); 
    };

    const toggleAutorizerVisibility = () => {
        setIsAutorizerVisible(!isAutorizerVisible); 
        setIsEditorVisible(false);
        setIsFormTableVisible(false);
        setIsActionPanelCollapsed(true); 
    };

    const toggleFormTableVisibility = () => {
        setIsAutorizerVisible(false); 
        setIsEditorVisible(false);
        setIsFormTableVisible(!isFormTableVisible);
        setIsActionPanelCollapsed(true); 
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
                    setSignedRequestsList(signedDocumentList.data);
                    setRequestsList(unsignedDocumentList.data);
                    setAllFormsList(allForms.data);
                } else {
                    console.log('Unsigned document response is not valid');
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    const actionPanel = () => (
        <div className="d-flex flex-column gap-2" style={{ margin: "10px" }}>
            <Button onClick={toggleEditorVisibility} className='btn btn-primary'>
                {translations[language].openEditor}
            </Button>
            <Button onClick={toggleAutorizerVisibility} className='btn btn-primary'>
                {translations[language].openRequestManager}
            </Button>
            <Button onClick={toggleFormTableVisibility} className='btn btn-primary'>
                {translations[language].openFormTable}
            </Button>
        </div>
    );

    // Translations for different languages
    const translations = {
        en: {
            pageTitle: "Form Manager",
            openEditor: "Open Document Editor",
            openRequestManager: "Open Request Manager",
            openFormTable: "Open Form Table",
        },
        he: {
            pageTitle: "מנהל טופס",
            openEditor: "פתח עורך מסמך",
            openRequestManager: "פתח מנהל בקשות",
            openFormTable: "פתח טבלת טפסים",
        },
        ar: {
            pageTitle: "مدير النماذج",
            openEditor: "فتح محرر المستندات",
            openRequestManager: "فتح مدير الطلبات",
            openFormTable: "فتح جدول النماذج",
        },
    };

    if (!translations[language]) return null;

    return (
        <div>
            <div className="mt-0">
                <Row>
                <Col md={isActionPanelCollapsed ? 1 : 2} className={`action-panel ${isActionPanelCollapsed ? 'collapsed' : ''}`} style={{ backgroundColor: isActionPanelCollapsed ? '' : "#9ec93b" }}>
                        <Button onClick={toggleActionPanelCollapse} className={`btn btn-secondary mb-2 ${isActionPanelCollapsed ? 'w-200' : ''}`} style={{ backgroundColor: isActionPanelCollapsed ? '' : "#9ec93b", padding: '5px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={expandSidebarIcon} alt="Expand sidebar" style={{ width: isActionPanelCollapsed ? '30px' : '40px', height: isActionPanelCollapsed ? '30px' : '40px', transition: 'width 0.3s, height 0.3s' }} />
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