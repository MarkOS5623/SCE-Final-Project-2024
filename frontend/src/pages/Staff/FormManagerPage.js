import React, { useContext, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../../components/DocumentViewers/TextEditor';
import '../../assets/css/Editor.css';
import FormManagingTable from '../../components/Tables/FormManagingTable';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import expandSidebarIcon from '../../assets/pictures/actionpanelicon.png';
import FormManagerActionPanel from '../../components/ActionPanels/FormManagerActionPanel';
import PendingRequestsTable from '../../components/Tables/PendingRequestsTable';
import ApprovedRequestsTable from '../../components/Tables/ApprovedRequestsTable';
import CardContainer from '../../components/Utils/CardContainer';
import logoImg from '../../assets/pictures/sce.jpg';

function FormManagerPage() {
    const { language } = useContext(LanguageContext);
    const [ EditorVisible, setEditorVisible ] = useState(true);
    const [ AutorizerVisible, setAutorizerVisible ] = useState(false);
    const [ AutorizerHistoryVisible, setAutorizerHistoryVisible ] = useState(false);
    const [ FormTableVisible, setFormTableVisible ] = useState(false);
    const [ actionPanelCollapsed, setActionPanelCollapsed ] = useState(true);

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
                            width: actionPanelCollapsed ? '80px' : '400px',
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
                            setActionPanelCollapsed = {setActionPanelCollapsed} 
                            setAutorizerHistoryVisible = {setAutorizerHistoryVisible}/>}
                    </div>
                    <Col md={12} style={{ transition: 'width 0.3s', position: 'relative', marginTop: '35px' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            <CardContainer style={{ width: '170vh', padding: '20px' }}>
                                <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "10px", marginTop: "10px" }} />
                                {EditorVisible && <TextEditor />}
                                {AutorizerVisible && <PendingRequestsTable/>}
                                {FormTableVisible && <FormManagingTable />}
                                {AutorizerHistoryVisible && <ApprovedRequestsTable/>}
                            </CardContainer>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default FormManagerPage;
