import React from 'react';
import CardContainer from '../../components/cardContainer';
import LoginForm from '../../components/Forms/LoginForm'
import logoImg from '../../assests/sce.jpg';

function LoginPage() {
  return (
      <CardContainer style={{ width: '500px', padding: '20px' }}>
        <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
        <h1>Login </h1>
        <LoginForm/>
      </CardContainer>
  );
}

export default LoginPage;
