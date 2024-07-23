import React, { useState, useEffect, useContext } from 'react';
import { Card, Table } from 'react-bootstrap';
import logoImg from '../../assets/pictures/sce.jpg';
import CardContainer from '../../components/Utils/CardContainer';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary

const AccountInfoPage = () => {
  const { language } = useContext(LanguageContext);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const tokenData = await fetch('http://localhost:5000/api/utils/decodeValue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }), 
        });
        const decodedTokenData = await tokenData.json();
        console.log(decodedTokenData.user);
        setAccountInfo(decodedTokenData.user);
      } catch (error) {
        console.error('Decryption of value failed:', error.message);
      }
    }
    fetchData();
  }, []);

  // Translations for different languages
  const translations = {
    en: {
      pageTitle: "Account Details",
      id: "ID",
      email: "Email",
      firstName: "First Name",
      lastName: "Last Name",
      role: "Role",
    },
    he: {
      pageTitle: "פרטי חשבון",
      id: "מספר זיהוי",
      email: "אימייל",
      firstName: "שם פרטי",
      lastName: "שם משפחה",
      role: "תפקיד",
    },
    ar: {
      pageTitle: "تفاصيل الحساب",
      id: "الرقم التعريفي",
      email: "البريد الإلكتروني",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      role: "الدور",
    },
  };

  if (!translations[language]) return null;

  return (
    <CardContainer className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "10vh", marginTop: '30px', width: '600px'}}>
      <Card.Title style={{ fontSize: "30px" }}>
        <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
      </Card.Title>
      <h2>{translations[language].pageTitle}</h2>
      {accountInfo && (
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>{translations[language].id}</td>
              <td>{accountInfo.id}</td>
            </tr>
            <tr>
              <td>{translations[language].email}</td>
              <td>{accountInfo.email}</td>
            </tr>
            <tr>
              <td>{translations[language].firstName}</td>
              <td>{accountInfo.fname}</td>
            </tr>
            <tr>
              <td>{translations[language].lastName}</td>
              <td>{accountInfo.lname}</td>
            </tr>
            <tr>
              <td>{translations[language].role}</td>
              <td>{accountInfo.role}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </CardContainer>
  );
};

export default AccountInfoPage;
