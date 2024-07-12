import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import MyRequestsList from '../../components/MyRequestsList';
import FormViewer from '../../components/FormViewers/studentFormViewer';
import '../Editor.css';
import { fetchRequest } from '../../api/user_requests';
import { decodeValue } from '../../api/utils';
import CardContainer from '../../components/cardContainer';
import logoImg from '../../assets/sce.jpg';
import { LanguageContext } from '../../context/LanguageContextProvider'; 
import expandSidebarIcon from '../../assets/actionpanelicon.png'; 

function RequestManagerPage() {
    const { language } = useContext(LanguageContext);
    const [userRequests, setUserRequests] = useState({});
    const [isRequestFormVisible, setIsRequestFormVisible] = useState(true);
    const [isMyRequestsVisible, setIsMyRequestsVisible] = useState(false);
    const [isActionPanelCollapsed, setIsActionPanelCollapsed] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = await decodeValue(JSON.stringify({ token: token }));
                const response = await fetchRequest(decodedToken.data.user.id);
                if (response.status === 201) {
                    const documentNames = response.data.docs.map(item => item.subject);
                    const documentIds = response.data.docs.map(item => item.documentId);
                    const documentStatuses = response.data.statuses;
                    setUserRequests({ docs: documentNames, ids: documentIds, statuses: documentStatuses });
                } else {
                    console.log('Response data is empty');
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    const toggleEditorVisibility = () => {
        setIsRequestFormVisible(true);
        setIsMyRequestsVisible(false);
        setIsActionPanelCollapsed(true);
    };

    const showMyRequests = () => {
        setIsMyRequestsVisible(true);
        setIsRequestFormVisible(false);
        setIsActionPanelCollapsed(true);
    };

    const toggleActionPanelCollapse = () => {
        setIsActionPanelCollapsed(!isActionPanelCollapsed);
    };

    const actionPanel = () => (
        <div className="d-flex flex-column gap-2" style={{ margin: "10px" }}>
            <Button onClick={toggleEditorVisibility} className='btn btn-primary'>
                {translations[language].makeNewRequest}
            </Button>
            <Button onClick={showMyRequests} className='btn btn-primary'>
                {translations[language].myRequests}
            </Button>
        </div>
    );

    // Translations for different languages
    const translations = {
        en: {
            pageTitle: "Request Manager",
            makeNewRequest: "Make a new request",
            myRequests: "My requests",
        },
        he: {
            pageTitle: "מנהל בקשות",
            makeNewRequest: "להגיש בקשה חדשה",
            myRequests: "הבקשות שלי",
        },
        ar: {
            pageTitle: "مدير الطلبات",
            makeNewRequest: "تقديم طلب جديد",
            myRequests: "طلباتي",
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
                    <Col md={isActionPanelCollapsed ? 14 : 10} style={{ transition: 'width 0.3s' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            <CardContainer style={{ width: '170vh', padding: '20px' }}>
                                <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '50px', marginBottom: "10px", marginTop: "10px" }} />
                                <h2>{translations[language].pageTitle}</h2>
                                {isRequestFormVisible && (<FormViewer />)}
                                {isMyRequestsVisible && (<MyRequestsList requests={userRequests} />)}
                            </CardContainer>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default RequestManagerPage;
