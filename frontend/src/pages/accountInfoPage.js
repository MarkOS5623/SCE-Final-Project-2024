import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
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
        console.error('Decrpytiton of value failed:', error.message);
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
          {accountInfo && (
            <div>
              <p>ID: {accountInfo.id}</p>
              <p>Email: {accountInfo.email}</p>
              <p>First Name: {accountInfo.fname}</p>
              <p>Last Name: {accountInfo.lname}</p>
              <p>Role: {accountInfo.role}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AccountInfoPage;
