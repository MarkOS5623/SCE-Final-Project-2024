import React, { createContext, useState, useContext } from 'react';
import { UserProvider } from './userContext';
import { documents } from '../data/mockData';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
   const {user} = useContext(UserProvider)
   // console.log('user', user)
   const fetchData = () => {
      // <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
// +   const documentsMap = new Map(documents);
// +   const documentsArray = Array.from(documentsMap.keys()).map(key => documentsMap.get(key));

// <<<<<<<  3015ec79-3bc8-4699-b31c-7645c1b68adc  >>>>>>>
      const docs = documents.keys().map((key) => {
         if(documents.get(key).author === user.id) return documents.get(key)
      })
      console.log('docs', docs)
   }

 const [userAuthoredDocuments, setUserAuthoredDocuments] = useState(
    []
 );

//  fetchData()


 return (
    <DocumentContext.Provider value={{ documents: userAuthoredDocuments, setUserAuthoredDocuments }}>
      {children}
    </DocumentContext.Provider>
 );
};