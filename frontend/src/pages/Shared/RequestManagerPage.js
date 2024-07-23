import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import '../../assets/css/Editor.css';
import { fetchRequest } from '../../api/user_requests';
import { decodeValue } from '../../api/utils';
import CardContainer from '../../components/Utils/CardContainer';
import logoImg from '../../assets/pictures/sce.jpg';
import expandSidebarIcon from '../../assets/pictures/actionpanelicon.png';
import RequestTable from '../../components/Tables/RequestTable';
import UserActionPanel from '../../components/ActionPanels/RequestManagerActionPanel';
import DownloadDocsTable from '../../components/Tables/DownloadDocsTable';
import RequestFillingTable from '../../components/Tables/RequestFillingTable';

function RequestManagerPage() {
    const [userRequests, setUserRequests] = useState({});
    const [userRequestHistory, setUserRequestHistory] = useState({});
    const [requestFormVisible, setRequestFormVisible] = useState(true);
    const [downloadFormVisible, setDownloadFormVisible] = useState(false);
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

    const toggleActionPanelCollapse = () => {
        setActionPanelCollapsed(!actionPanelCollapsed);
    };

    return (
        <div>
            <div className="mt-0">
                <Row>
                    <Col md={12} style={{ transition: 'width 0.3s', position: 'relative', marginTop: '10px' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            <CardContainer style={{ width: '170vh', padding: '20px' }}>
                                <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "10px", marginTop: "10px" }} />
                                {requestsVisible && (<RequestTable documents={userRequests} flag={false}/>)}
                                {myRequestHistoryVisible && (<RequestTable documents={userRequestHistory} flag={true} setDocuments={setUserRequestHistory}/>)}
                                {downloadFormVisible && (<DownloadDocsTable/>)}
                                {requestFormVisible && (<RequestFillingTable/>)}
                            </CardContainer>
                        </div>
                    </Col>
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
                        {!actionPanelCollapsed && <UserActionPanel 
                            setRequestFormVisible={setRequestFormVisible} 
                            setMyRequestsVisible={setMyRequestsVisible} 
                            setMyRequestHistoryVisible={setMyRequestHistoryVisible} 
                            setActionPanelCollapsed={setActionPanelCollapsed}cd 
                            setDownloadFormVisible={setDownloadFormVisible}/>}
                    </div>
                </Row>
            </div>
        </div>
    );
}

export default RequestManagerPage;
