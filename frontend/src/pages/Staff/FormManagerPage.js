import React, { useContext,useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../../components/DocumentViewers/TextEditor';
import '../../assets/css/Editor.css';
import StaffFormViewer from '../../components/FormViewers/staffFormViewer';
import { fetchUnsignedDocumentList, fetchSignedDocumentList } from '../../api/documents_reqeusts';
import { fetchAllFormsList } from '../../api/form_requests';
import FormManagingTable from '../../components/Tables/FormManagingTable';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import expandSidebarIcon from '../../assets/jpgs/actionpanelicon.png'; 

function FormManagerPage() {
    const { language } = useContext(LanguageContext);
    const [EditorVisible, setEditorVisible] = useState(false);
    const [AutorizerVisible, setAutorizerVisible] = useState(false);
    const [FormTableVisible, setFormTableVisible] = useState(false);
    const [actionPanelCollapsed, setActionPanelCollapsed] = useState(false);
    const [requestsList, setRequestsList] = useState({});
    const [signedRequestsList, setSignedRequestsList] = useState({});
    const [allFormsList, setAllFormsList] = useState([]);
    
    const toggleEditorVisibility = () => {
        setEditorVisible(!EditorVisible); 
        setAutorizerVisible(false);
        setFormTableVisible(false);
        setActionPanelCollapsed(true); 
    };

    const toggleAutorizerVisibility = () => {
        setAutorizerVisible(!AutorizerVisible); 
        setEditorVisible(false);
        setFormTableVisible(false);
        setActionPanelCollapsed(true); 
    };

    const toggleFormTableVisibility = () => {
        setAutorizerVisible(false); 
        setEditorVisible(false);
        setFormTableVisible(!FormTableVisible);
        setActionPanelCollapsed(true); 
    };

    const toggleActionPanelCollapse = () => {
        setActionPanelCollapsed(!actionPanelCollapsed);
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
            openEditor: "Document Editor",
            openRequestManager: "Request Authorizer",
            openFormTable: "Form Table",
        },
        he: {
            pageTitle: "מנהל טופס",
            openEditor: "עורך מסמך",
            openRequestManager: "מנהל בקשות",
            openFormTable: "טבלת טפסים",
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
                <div 
                        className={`action-panel ${actionPanelCollapsed ? 'collapsed' : ''}`} 
                        style={{ 
                            background: actionPanelCollapsed 
                                ? '' 
                                : 'linear-gradient(to left, rgba(126, 156, 56, 1) 0%, rgba(158, 201, 59, 1) 100%)', 
                            position: 'fixed', 
                            border: 'auto',
                            top: '70px', 
                            bottom: '70px', 
                            left: -11, 
                            width: actionPanelCollapsed ? '80px' : '300px', 
                            zIndex: 1000,
                            transition: 'width 0.3s'
                        }}
                    >
                        <Button 
                            onClick={toggleActionPanelCollapse} 
                            className={`btn btn-secondary mb-2 ${actionPanelCollapsed ? 'w-100' : ''}`} 
                            style={{ 
                                background: 'rgba(158, 201, 59, 1)', 
                                padding: '5px', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center' 
                            }}
                        >
                            <img src={expandSidebarIcon} alt="Expand sidebar" style={{ width: '30px', height: '30px', transition: 'width 0.3s, height 0.3s' }} />
                        </Button>
                        {!actionPanelCollapsed && actionPanel()}
                    </div>
                    <Col md={12} style={{ transition: 'width 0.3s', position: 'relative' , marginTop: '35px'}}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            {EditorVisible && <TextEditor />}
                            {AutorizerVisible && <StaffFormViewer requestsList={requestsList} signedRequestsNameList={signedRequestsList.docs} signedRequestsIDList={signedRequestsList.ids} signedRequestsStatusList={signedRequestsList.statuses} />}
                            {FormTableVisible && <FormManagingTable forms={allFormsList} />}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default FormManagerPage;