import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardContainer from '../../components/cardContainer';
import SignUpForm from '../../components/Forms/SignUpForm'
import logoImg from '../../assests/sce.jpg';
function SignUpPage() {
  const navigate = useNavigate();
  return (
      <CardContainer style={{ width: '500px', padding: '20px' }}>
        <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
        <h1>Sign Up </h1>
        <SignUpForm/>
      </CardContainer>
  );
}

export default SignUpPage;
