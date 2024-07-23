import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../../assets/css/Editor.css';
import { LanguageContext } from '../../Context/LanguageContextProvider';


const FormManagerActionPanel = ({ setEditorVisible, setAutorizerVisible, setFormTableVisible, setActionPanelCollapsed, setAutorizerHistoryVisible}) => {
    const { language } = useContext(LanguageContext);

    const toggleEditorVisibility = () => {
        setEditorVisible(true);
        setAutorizerVisible(false);
        setFormTableVisible(false);
        setActionPanelCollapsed(true);
        setAutorizerHistoryVisible(false);
    };

    const toggleAutorizerVisibility = () => {
        setAutorizerVisible(true);
        setEditorVisible(false);
        setFormTableVisible(false);
        setActionPanelCollapsed(true);
        setAutorizerHistoryVisible(false);
    };

    const toggleAutorizerHistoryVisibility = () => {
        setAutorizerVisible(false);
        setEditorVisible(false);
        setFormTableVisible(false);
        setActionPanelCollapsed(true);
        setAutorizerHistoryVisible(true);
    };

    const toggleFormTableVisibility = () => {
        setAutorizerVisible(false);
        setEditorVisible(false);
        setFormTableVisible(true);
        setActionPanelCollapsed(true);
        setAutorizerHistoryVisible(false);
    };


    // Translations for different languages
    const translations = {
        en: {
            pageTitle: "Form Manager",
            openEditor: "Document Editor",
            openRequestManager: "Request Authorizer",
            openRequestHistory: "Request History",
            openFormTable: "Form Data Base",
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

    const buttonStyle = {
        backgroundColor: "rgba(158, 201, 59)",
        border: "3px solid white"
    };

    return (
        <div className="d-flex flex-column gap-2" style={{ margin: "10px" }}>
            <div style={{ borderTop: '2px solid white', marginTop: '10px', marginBottom: '20px' }} />
            <h4 style={{color: 'white'}}>{translations[language].pageTitle}</h4>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            <Button onClick={toggleEditorVisibility} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openEditor}
            </Button>
            <Button onClick={toggleFormTableVisibility} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openFormTable}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            <Button onClick={toggleAutorizerVisibility} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openRequestManager}
            </Button>
            <Button onClick={toggleAutorizerHistoryVisibility} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openRequestHistory}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
        </div>
    );
}

export default FormManagerActionPanel;