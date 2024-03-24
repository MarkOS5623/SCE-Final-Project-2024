import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/documents/"

export const fetchDocument = async (subject) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/fetchDocument', {
      title: subject
    }, {
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

export const saveDocument = async (documentData, titleInput) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/saveDocument', {
      Data: documentData, title: titleInput
    }, {
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

export const fetchDocsList = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/documents/fetchDocsList', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching document list:', error.message);
    throw error;
  }
};