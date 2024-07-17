import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../../components/DocumentViewers/TextEditor';
import '../../assets/css/Editor.css';
import FormManagerViewer from '../../components/FormViewers/FormManagerViewer';
import { fetchUnsignedDocumentList, fetchSignedDocumentList } from '../../api/documents_reqeusts';
import { fetchAllFormsList } from '../../api/form_requests';
import FormManagingTable from '../../components/Tables/FormManagingTable';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import expandSidebarIcon from '../../assets/pictures/actionpanelicon.png';
import FormManagerActionPanel from '../../components/ActionPanels/FormManagerActionPanel';

function FormManagerPage() {
    const { language } = useContext(LanguageContext);
    const [EditorVisible, setEditorVisible] = useState(false);
    const [AutorizerVisible, setAutorizerVisible] = useState(false);
    const [FormTableVisible, setFormTableVisible] = useState(false);
    const [actionPanelCollapsed, setActionPanelCollapsed] = useState(false);
    const [requestsList, setRequestsList] = useState({});
    const [signedRequestsList, setSignedRequestsList] = useState({});
    const [allFormsList, setAllFormsList] = useState([]);

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

    const toggleActionPanelCollapse = () => {
        setActionPanelCollapsed(!actionPanelCollapsed);
    };

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
                                : 'rgba(158, 201, 59)',
                            position: 'fixed',
                            borderRight: actionPanelCollapsed
                            ? ''
                            : '2px solid white',
                            top: '70px',
                            bottom: '70px',
                            left: -15,
                            width: actionPanelCollapsed ? '80px' : '300px',
                            zIndex: 1000,
                            transition: 'width 0.3s',
                        }}
                    >
                        <Button
                            onClick={toggleActionPanelCollapse}
                            className={`btn btn-secondary mb-2 ${actionPanelCollapsed ? 'w-100' : ''}`}
                            style={{
                                background: 'rgba(158, 201, 59)',
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '20px'
                            }}
                        >
                            <img src={expandSidebarIcon} alt="Expand sidebar" style={{ width: '30px', height: '30px', transition: 'width 0.3s, height 0.3s' }} />
                        </Button>
                        {!actionPanelCollapsed && <FormManagerActionPanel 
                            setEditorVisible = {setEditorVisible} 
                            setAutorizerVisible = {setAutorizerVisible} 
                            setFormTableVisible = {setFormTableVisible} 
                            setActionPanelCollapsed = {setActionPanelCollapsed} />}
                    </div>
                    <Col md={12} style={{ transition: 'width 0.3s', position: 'relative', marginTop: '35px' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            {EditorVisible && <TextEditor />}
                            {AutorizerVisible && <FormManagerViewer requestsList={requestsList} signedRequestsNameList={signedRequestsList.docs} signedRequestsIDList={signedRequestsList.ids} signedRequestsStatusList={signedRequestsList.statuses} />}
                            {FormTableVisible && <FormManagingTable forms={allFormsList} />}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default FormManagerPage;
