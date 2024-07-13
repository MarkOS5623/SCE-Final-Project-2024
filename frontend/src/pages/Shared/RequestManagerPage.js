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
import RequestHistoryTable from '../../components/Tables/RequestHistoryTable';

function RequestManagerPage() {
    const { language } = useContext(LanguageContext);
    const [ userRequests, setUserRequests ] = useState({});
    const [ userRequestHistory, setUserRequestHistory ] = useState({});
    const [ requestFormVisible, setIsRequestFormVisible ] = useState(true);
    const [ requestsVisible, setMyRequestsVisible ] = useState(false);
    const [ myRequestHistoryVisible, setMyRequestHistoryVisible ] = useState(false);
    const [ actionPanelCollapsed, setIsActionPanelCollapsed ] = useState(false);

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
                    console.log(requestHistoryDocs)
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
        setIsActionPanelCollapsed(true);
        setMyRequestHistoryVisible(false);
    };

    const showMyRequests = () => {
        setMyRequestsVisible(true);
        setIsRequestFormVisible(false);
        setIsActionPanelCollapsed(true);
        setMyRequestHistoryVisible(false);
    };

    const showMyRequestHistory = () => {
        setMyRequestsVisible(false);
        setIsRequestFormVisible(false);
        setIsActionPanelCollapsed(false);
        setMyRequestHistoryVisible(true);
    };

    const toggleActionPanelCollapse = () => {
        setIsActionPanelCollapsed(!actionPanelCollapsed);
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
                    <Col md={actionPanelCollapsed ? 1 : 2} className={`action-panel ${actionPanelCollapsed ? 'collapsed' : ''}`} style={{ backgroundColor: actionPanelCollapsed ? '' : "#9ec93b" }}>
                        <Button onClick={toggleActionPanelCollapse} className={`btn btn-secondary mb-2 ${actionPanelCollapsed ? 'w-200' : ''}`} style={{ backgroundColor: actionPanelCollapsed ? '' : "#9ec93b", padding: '5px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={expandSidebarIcon} alt="Expand sidebar" style={{ width: actionPanelCollapsed ? '30px' : '40px', height: actionPanelCollapsed ? '30px' : '40px', transition: 'width 0.3s, height 0.3s' }} />
                        </Button>
                        {!actionPanelCollapsed && actionPanel()}
                    </Col>
                    <Col md={actionPanelCollapsed ? 14 : 10} style={{ transition: 'width 0.3s' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            <CardContainer style={{ width: '170vh', padding: '20px' }}>
                                <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '50px', marginBottom: "10px", marginTop: "10px" }} />
                                <h2>{translations[language].pageTitle}</h2>
                                {requestFormVisible && (<FormViewer />)}
                                {requestsVisible && (<MyRequestsList requests={userRequests} />)}
                                {myRequestHistoryVisible && (<RequestHistoryTable documents={userRequestHistory}/>)}
                            </CardContainer>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default RequestManagerPage;
