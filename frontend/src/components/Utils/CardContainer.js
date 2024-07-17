import React from 'react';
import { Container, Card } from 'react-bootstrap';

const CardContainer = ({ children, style }) => {
  return (
    <Container style={{ ...style }}>
      <Card text="white" className="text-center custom-bg-primary" style={{ borderRadius: '25px', border: '2px solid white', borderBottomRightRadius: '15px' }}>
        <Card.Body style={{ ...style }}>
          {children}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CardContainer;
