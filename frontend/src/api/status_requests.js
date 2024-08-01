import axios from "axios"
import { SERVER_BASE, STATUS_ROUTE_URL } from "./config";


export const authorizeRequest = async (docID, authorizerID, author, subject) => {
    try {
      const response = await axios.post(SERVER_BASE + STATUS_ROUTE_URL + '/authorizerequest', 
        { docID, authorizerID }
      , {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const newMessageForAuthor = {
        author: author,
        subject,
        status: 'approved',
        type: 'requester'
      };
      const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
      const updatedMessages = [...existingMessages, newMessageForAuthor];
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      return response;
    } catch (error) {
      console.error('Error fetching document:', error.message);
      throw error;
    }
};

export const rejectRequest = async (docID, authorizerID, author, subject) => {
  try {
    const response = await axios.post(SERVER_BASE + STATUS_ROUTE_URL + '/rejectrequest', 
      { docID, authorizerID }
    , {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const newMessageForAuthor = {
      author: author,
      subject,
      status: 'denied',
      type: 'requester'
    };
    const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = [...existingMessages, newMessageForAuthor];
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    return response;
  } catch (error) {
    console.error('Error fetching document:', error.message);
    throw error;
  }
};