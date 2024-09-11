import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Routes, Route, Outlet } from 'react-router-dom';
import TextEditor from '../../components/DocumentViewers/TextEditor';
import FormManagingTable from '../../components/Tables/FormManagingTable';
import PendingRequestsTable from '../../components/Tables/PendingRequestsTable';
import ApprovedRequestsTable from '../../components/Tables/ApprovedRequestsTable';
import CardContainer from '../../components/Utils/CardContainer';
import logoImg from '../../assets/pictures/sce.jpg';
import expandSidebarIcon from '../../assets/pictures/actionpanelicon.png';
import FormManagerActionPanel from '../../components/ActionPanels/FormManagerActionPanel';
import ViewDocument from '../../components/DocumentViewers/ViewDocument';
import { decodeValue } from '../../api/utils';

function FormManagerPage() {
    const [actionPanelCollapsed, setActionPanelCollapsed] = useState(true);
    const [userRole, setUserRole] = useState('');

    const toggleActionPanelCollapse = () => {
        setActionPanelCollapsed(!actionPanelCollapsed);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = await decodeValue(JSON.stringify({ token: token }));
                setUserRole(decodedToken.user.role);
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="mt-0">
                <Row>
                    <div
                        className={`action-panel ${actionPanelCollapsed ? 'collapsed' : ''}`}
                        style={{
                            background: actionPanelCollapsed ? '' : 'rgba(158, 201, 59)',
                            position: 'fixed',
                            borderRight: actionPanelCollapsed ? '' : '2px solid white',
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
                        {!actionPanelCollapsed && <FormManagerActionPanel setActionPanelCollapsed={setActionPanelCollapsed} userRole={userRole}/>}
                    </div>
                    <Col md={12} style={{ transition: 'width 0.3s', position: 'relative' }}>
                        <div className="right-panel" style={{ width: 'auto' }}>
                            <CardContainer style={{ width: '180vh', padding: '20px' }}>
                                <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "10px", marginTop: "10px" }} />
                                <Routes>
                                    <Route path="editor" element={<TextEditor />} />
                                    <Route path="requests" element={<PendingRequestsTable />} />
                                    <Route path="requests/:documentId" element={<ViewDocument flag={true}/>} />
                                    <Route path="form" element={<FormManagingTable />} />
                                    <Route path="history" element={<ApprovedRequestsTable />} />
                                    <Route path="history/:documentId" element={<ViewDocument flag={false}/>} />
                                </Routes>
                            </CardContainer>
                        </div>
                    </Col>
                </Row>
            </div>
            <Outlet />
        </div>
    );
}

export default FormManagerPage;
