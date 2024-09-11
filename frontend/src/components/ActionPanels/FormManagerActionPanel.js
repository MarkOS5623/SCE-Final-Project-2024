import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Editor.css';
import { LanguageContext } from '../../Context/LanguageContextProvider';

const translations = {
    en: {
        pageTitle: "Form Manager",
        openEditor: "Document Editor",
        openRequestManager: "Request Authorizer",
        openRequestHistory: "Request History",
        openFormTable: "Form Data Base",
        requestManager: "Request Manager"
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

const FormManagerActionPanel = ({ setActionPanelCollapsed, userRole }) => {
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(`/formmanager/${path}`);
        setActionPanelCollapsed(true);
    };

    return (
        <div className="d-flex flex-column gap-2" style={{ margin: "10px" }}>
            <div style={{ borderTop: '2px solid white', marginTop: '10px', marginBottom: '20px' }} />
            <h4 style={{ color: 'white' }}>{translations[language].pageTitle}</h4>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            <Button onClick={() => handleNavigation('editor')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openEditor}
            </Button>
            <Button onClick={() => handleNavigation('form')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openFormTable}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            <Button onClick={() => handleNavigation('requests')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openRequestManager}
            </Button>
            <Button onClick={() => handleNavigation('history')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].openRequestHistory}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            {userRole === 'admin' &&
                <Button onClick={() => navigate(`/requestmanager/form`)} className='btn btn-primary rounded-pill' style={buttonStyle}>
                    {translations[language].requestManager}
                </Button>}
        </div>
    );
}

export default FormManagerActionPanel;
