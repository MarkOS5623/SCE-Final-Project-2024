import React, { useState, useEffect } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import logoImg from '../assests/sce.jpg';

function AccountInfoPage() {
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/utils/decodeValue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const responseData = await response.json();
        console.log(responseData.token)
        setAccountInfo(responseData.token.user)
      } catch (error) {
        console.error('Decryption of value failed:', error.message);
      }
    }
    fetchData()
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh"}}>
      <Card className="mt-3" bg="primary" text="white" style={{ width: "500px" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "30px" }}>
            <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
          </Card.Title>
          <h2>Account Details</h2>
          {accountInfo && (
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{accountInfo.id}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{accountInfo.email}</td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td>{accountInfo.fname}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{accountInfo.lname}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{accountInfo.role}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AccountInfoPage;
