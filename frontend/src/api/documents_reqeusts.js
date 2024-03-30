import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/documents"

export const saveDocument = async (text, subject, signatories, author) => {
    try {
      const response = await axios.post(SERVER_BASE + ROUTE_URL + '/savedocument', {
        text, subject, signatories, author
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
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

export const fetchDocument = async (documentId) => {
  try {
    console.log(documentId.documentId)
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/fetchdocument', 
      documentId.documentId
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