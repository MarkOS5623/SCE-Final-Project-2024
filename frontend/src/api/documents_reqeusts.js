import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/documents"

export const saveDocument = async (text, subject, signatories, author, type) => {
  try {
      const response = await axios.post(SERVER_BASE + ROUTE_URL + '/savedocument', {
          text, subject, signatories, author, type
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const newMessageForAuthor = {
          author,
          subject,
          status: 'pending approval',
          type: 'requester'
      };
      const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
      const updatedMessages = [...existingMessages, newMessageForAuthor];
      signatories.forEach(signatory => {
          const newMessageForSignatory = {
              author: signatory,
              subject,
              status: 'pending approval',
              type: 'authorizer'
          };
          updatedMessages.push(newMessageForSignatory);
      });
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      return response;
  } catch (error) {
      console.error('Error saving document:', error.message);
      throw error;
  }
};

export const fetchUnsignedDocumentList = async () => {
    try {
      const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchunsigneddocumentlist', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching unSignedDocument list:', error.message);
      throw error;
    }
};

export const fetchSignedDocumentList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchsigneddocumentlist', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching signedDocument list:', error.message);
    throw error;
  }
};

export const fetchDocument = async (documentId) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/fetchdocument', 
      {documentId}
    , {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching document:', error.message);
    throw error;
  }
};