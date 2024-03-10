// UserContext.js
import React, { createContext, useState } from 'react';
import { users } from '../data/mockData';
import { documents } from '../data/mockData';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const fetchData = () => {// TO be repaced with API call
    const docs = []
    for (let key of documents.keys()){
      if(documents.get(key).author === user.id) docs.push(documents.get(key))
    }
    return docs
  }
   


 const [user, setUser] = useState(users.get(1));
 const [userAuthoredDocuments, setUserAuthoredDocuments] = useState(
  fetchData()
);

 return (
    <UserContext.Provider value={{ user, setUser, userAuthoredDocuments, setUserAuthoredDocuments }}>
      {children}
    </UserContext.Provider>
 );
};