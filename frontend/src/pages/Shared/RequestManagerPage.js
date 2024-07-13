import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import FormViewer from '../../components/FormViewers/FormViewer';
import '../../assets/css/Editor.css';
import { fetchRequest } from '../../api/user_requests';
import { decodeValue } from '../../api/utils';
import CardContainer from '../../components/Utils/CardContainer';
import logoImg from '../../assets/pictures/sce.jpg';
import { LanguageContext } from '../../Context/LanguageContextProvider'; 
import expandSidebarIcon from '../../assets/pictures/actionpanelicon.png'; 
import RequestTable from '../../components/Tables/RequestTable';

function RequestManagerPage() {
    const { language } = useContext(LanguageContext);
    const [userRequests, setUserRequests] = useState({});
    const [userRequestHistory, setUserRequestHistory] = useState({});
    const [requestFormVisible, setIsRequestFormVisible] = useState(true);
    const [requestsVisible, setMyRequestsVisible] = useState(false);
    const [myRequestHistoryVisible, setMyRequestHistoryVisible] = useState(false);
    const [actionPanelCollapsed, setActionPanelCollapsed] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = await decodeValue(JSON.stringify({ token: token }));
                const response = await fetchRequest(decodedToken.data.user.id);
                if (response.status === 201) {
                    const documentStatuses = response.data.statuses;
                    const pendingApprovalDocs = [];
                    const requestHistoryDocs = [];
                    response.data.docs.forEach((doc, index) => {
                        if (documentStatuses[index] === "pending approval") {
                            pendingApprovalDocs.push({
                                subject: doc.subject,
                                documentId: doc.documentId,
                                status: documentStatuses[index],
                            });
                        } else {
                            requestHistoryDocs.push({
                                subject: doc.subject,
                                documentId: doc.documentId,
                                status: documentStatuses[index],
                            });
                        }
                    });
                    setUserRequests({
                        docs: pendingApprovalDocs.map(doc => doc.subject),
                        ids: pendingApprovalDocs.map(doc => doc.documentId),
                        statuses: pendingApprovalDocs.map(doc => doc.status),
                    });
                    setUserRequestHistory({
                        docs: requestHistoryDocs.map(doc => doc.subject),
                        ids: requestHistoryDocs.map(doc => doc.documentId),
                        statuses: requestHistoryDocs.map(doc => doc.status),
                    });
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
        setMyRequestsVisible(false);
        setActionPanelCollapsed(true);
        setMyRequestHistoryVisible(false);
    };

    const showMyRequests = () => {
        setMyRequestsVisible(true);
        setIsRequestFormVisible(false);
        setActionPanelCollapsed(true);
        setMyRequestHistoryVisible(false);
    };

    const showMyRequestHistory = () => {
        setMyRequestsVisible(false);
        setIsRequestFormVisible(false);
        setActionPanelCollapsed(true);
        setMyRequestHistoryVisible(true);
    };

    const toggleActionPanelCollapse = () => {
        setActionPanelCollapsed(!actionPanelCollapsed);
    };

    const actionPanel = () => (
        <div className="d-flex flex-column gap-2" style={{ margin: "10px" }}>
            <Button onClick={toggleEditorVisibility} className='btn btn-primary'>
                {translations[language].makeNewRequest}
            </Button>
            <Button onClick={showMyRequests} className='btn btn-primary'>
                {translations[language].myRequests}
            </Button>
            <Button onClick={showMyRequestHistory} className='btn btn-primary'>
                {translations[language].myRequestHistory}
            </Button>
        </div>
    );

    // Translations for different languages
    const translations = {
        en: {
            pageTitle: "Request Manager",
            makeNewRequest: "Make a new request",
            myRequests: "My requests",
            myRequestHistory: "Request History"
        },
        he: {
            pageTitle: "מנהל בקשות",
            makeNewRequest: "להגיש בקשה חדשה",
            myRequests: "הבקשות שלי",
            myRequestHistory: "היסטוריית בקשות"
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
                    <Col md={12} style={{ transition: 'width 0.3s', position: 'relative' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            <CardContainer style={{ width: '170vh', padding: '20px' }}>
                                <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "10px", marginTop: "10px" }} />
                                <h2>{translations[language].pageTitle}</h2>
                                {requestFormVisible && (<FormViewer />)}
                                {requestsVisible && (<RequestTable documents={userRequests} />)}
                                {myRequestHistoryVisible && (<RequestTable documents={userRequestHistory} />)}
                            </CardContainer>
                        </div>
                    </Col>
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
                </Row>
            </div>
        </div>
    );
}

export default RequestManagerPage;
