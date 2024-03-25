import React from 'react';
import { Container, Card } from 'react-bootstrap';

const CardContainer = ({ children, style }) => {
  return (
    <Container style={{ ...style }}>
      <Card bg="primary" text="white" className="text-center">
        <Card.Body>
          {children}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CardContainer;
