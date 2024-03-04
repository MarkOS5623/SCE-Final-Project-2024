import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function Account() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user account information:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>User Account Information</Card.Title>
          <Card.Text>
            <strong>Username:</strong> {user.username}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>First Name:</strong> {user.fname}<br />
            <strong>Last Name:</strong> {user.lname}<br />
            <strong>ID:</strong> {user.id}<br />
            <strong>Department:</strong> {user.department}<br />
            <strong>Role:</strong> {user.role}<br />
            <strong>Active:</strong> {user.isActive ? 'Yes' : 'No'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Account;
