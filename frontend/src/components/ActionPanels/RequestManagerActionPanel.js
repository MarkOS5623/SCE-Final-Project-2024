import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Editor.css';
import { LanguageContext } from '../../Context/LanguageContextProvider';

const translations = {
    en: {
        pageTitle: "Request Manager",
        makeNewRequest: "Fill a form",
        downloadForm: "Download a form",
        myRequests: "Pending requests",
        myRequestHistory: "Request History",
        formManager: "Form Manager"
    },
    he: {
        pageTitle: "מנהל בקשות",
        makeNewRequest: "להגיש בקשה חדשה",
        downloadForm: "הורד טופס",
        myRequests: "הבקשות שלי",
        myRequestHistory: "היסטוריית בקשות"
    },
    ar: {
        pageTitle: "مدير الطلبات",
        makeNewRequest: "تقديم طلب جديد",
        downloadForm: "تحميل نموذج",
        myRequests: "طلباتي",
        myRequestHistory: "تاريخ الطلبات"
    }
};

const buttonStyle = {
    backgroundColor: "rgba(158, 201, 59)",
    border: "3px solid white"
};

const RequestManagerActionPanel = ({userRole}) => {
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(`/requestmanager/${path}`);
    };

    return (
        <div className="d-flex flex-column gap-2" style={{ margin: "10px" }}>
            <div style={{ borderTop: '2px solid white', marginTop: '10px', marginBottom: '20px' }} />
            <h4 style={{color: 'white'}}>{translations[language].pageTitle}</h4>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            <Button onClick={() => handleNavigation('form')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].makeNewRequest}
            </Button>
            <Button onClick={() => handleNavigation('download')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].downloadForm}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            <Button onClick={() => handleNavigation('requests')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].myRequests}
            </Button>
            <Button onClick={() => handleNavigation('history')} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].myRequestHistory}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            {userRole === 'admin' &&
                <Button onClick={() => navigate(`/formmanager/editor`)} className='btn btn-primary rounded-pill' style={buttonStyle}>
                    {translations[language].formManager}
                </Button>}
        </div>
    );
}

export default RequestManagerActionPanel;
