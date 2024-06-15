import React from 'react';
import { Container, Card } from 'react-bootstrap';

const CardContainer = ({ children, style }) => {
  return (
    <Container style={{ ...style }}>
      <Card text="white" className="text-center custom-bg-primary">
        <Card.Body>
          {children}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CardContainer;
