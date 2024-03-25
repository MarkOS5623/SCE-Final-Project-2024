import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import logoImg from '../assests/sce.jpg';
import CardContainer from '../components/cardContainer';
function AccountInfoPage() {
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let token = localStorage.getItem('token');
        let tokenData = await fetch('http://localhost:5000/api/utils/decodeValue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token}), 
        });
        let decodedTokenData = await tokenData.json();
        console.log(decodedTokenData.user)
        setAccountInfo(decodedTokenData.user)
      } catch (error) {
        console.error('Decryption of value failed:', error.message);
      }
    }
    fetchData()
  }, []);

  return (
    <CardContainer className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh", marginTop: '30px', width: '600px'}}>
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
    </CardContainer>
  );
}

export default AccountInfoPage;
