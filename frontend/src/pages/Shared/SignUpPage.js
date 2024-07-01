import React from 'react';
import CardContainer from '../../components/cardContainer';
import SignUpForm from '../../components/Forms/signupForm'
import logoImg from '../../assests/sce.jpg';
function SignUpPage() {
  return (
      <CardContainer style={{ width: '500px', padding: '20px' }}>
        <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
        <h1>Sign Up </h1>
        <SignUpForm/>
      </CardContainer>
  );
}

export default SignUpPage;
