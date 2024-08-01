import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../../assets/css/Editor.css';
import { LanguageContext } from '../../Context/LanguageContextProvider';

const translations = {
    en: {
        pageTitle: "Request Manager",
        makeNewRequest: "Fill a form",
        downloadForm: "Download a form",
        myRequests: "Pending requests",
        myRequestHistory: "Request History",
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

const RequestManagerActionPanel = ({ setRequestFormVisible, setMyRequestsVisible, setMyRequestHistoryVisible, setActionPanelCollapsed, setDownloadFormVisible }) => {
    const { language } = useContext(LanguageContext);

    const toggleEditorVisibility = () => {
        setRequestFormVisible(true);
        setMyRequestsVisible(false);
        setActionPanelCollapsed(true);
        setMyRequestHistoryVisible(false);
        setDownloadFormVisible(false);
    };

    const showMyRequests = () => {
        setMyRequestsVisible(true);
        setRequestFormVisible(false);
        setActionPanelCollapsed(true);
        setMyRequestHistoryVisible(false);
        setDownloadFormVisible(false);
    };

    const showMyRequestHistory = () => {
        setMyRequestsVisible(false);
        setRequestFormVisible(false);
        setActionPanelCollapsed(true);
        setMyRequestHistoryVisible(true);
        setDownloadFormVisible(false);
    };

    const showDownloadForm = () => {
        setMyRequestsVisible(false);
        setRequestFormVisible(false);
        setActionPanelCollapsed(true);
        setMyRequestHistoryVisible(false);
        setDownloadFormVisible(true);
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
                {translations[language].makeNewRequest}
            </Button>
            <Button onClick={showDownloadForm} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].downloadForm}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
            <Button onClick={showMyRequests} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].myRequests}
            </Button>
            <Button onClick={showMyRequestHistory} className='btn btn-primary rounded-pill' style={buttonStyle}>
                {translations[language].myRequestHistory}
            </Button>
            <div style={{ borderTop: '2px solid white', marginTop: '10px' }} />
        </div>
    );
}

export default RequestManagerActionPanel;
