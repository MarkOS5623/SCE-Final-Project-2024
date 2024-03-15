import React, { createContext, useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAuthoredDocuments, setUserAuthoredDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [docsList, setDocsList] = useState([]);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch('http://localhost:5000/api/documents/fetchDocsList', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        if (Array.isArray(responseData.docs)) {
          setDocsList(responseData.docs); // Set the fetched document titles
        } else {
          console.error('Response data is not an array:', responseData);
        }
      } catch (error) {
        console.error('Fetching of docs failed:', error.message);
      }
    }
    fetchDocs();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userAuthoredDocuments, setUserAuthoredDocuments, docsList }}>
      {children}
    </UserContext.Provider>
  );
};