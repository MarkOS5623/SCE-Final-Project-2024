import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import MyRequestsList from '../../components/MyRequestsList';
import FormViewer from '../../components/FormViewers/studentFormViewer';
import '../Editor.css';
import { fetchRequest } from '../../api/user_requests';
import { decodeValue } from '../../api/utils';
import CardContainer from '../../components/cardContainer';
import logoImg from '../../assets/sce.jpg';

function RequestManagerPage() {
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
            <Button onClick={toggleEditorVisibility} className='btn btn-primary'>Make a new request</Button>
            <Button onClick={showMyRequests} className='btn btn-primary'>My requests</Button>
        </div>
    );

    return (
        <div>
            <div className="mt-0">
                <Row>
                    <Col md={isActionPanelCollapsed ? 1 : 2} className={`action-panel ${isActionPanelCollapsed ? 'collapsed' : ''}`}>
                        <Button onClick={toggleActionPanelCollapse} className={`btn btn-secondary mb-2 ${isActionPanelCollapsed ? 'w-100' : ''}`}>
                            {isActionPanelCollapsed ? 'Action Panel >' : '< Action Panel'}
                        </Button>
                        {!isActionPanelCollapsed && actionPanel()}
                    </Col>
                    <Col md={isActionPanelCollapsed ? 14 : 10 } style={{ transition: 'width 0.3s' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            <CardContainer style={{ width: '175vh', padding: '20px' }}>
                                <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '50px', marginBottom: "10px", marginTop: "10px" }} />
                                <h2>Request Manager</h2>
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
