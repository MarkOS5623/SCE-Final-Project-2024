// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { users } from '../data/mockData';
import { documents } from '../data/mockData';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAuthoredDocuments, setUserAuthoredDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser(users.get(1));
      setIsLoading(false);
    }, 100);

    // Simulate fetching user authored documents
    setTimeout(() => {
      const docs = [];
      if (user && user.id) { // Check if user is not null before accessing its properties
        for (let key of documents.keys()) {
          if (documents.get(key).author === user.id) docs.push(documents.get(key));
        }
        setUserAuthoredDocuments(docs);
      }
    }, 200);
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, userAuthoredDocuments, setUserAuthoredDocuments }}>
      {children}
    </UserContext.Provider>
  );
};
