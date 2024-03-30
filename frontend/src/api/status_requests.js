import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/status"


export const authorizeRequest = async (docID, authorizerID) => {
    try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/authorizerequest', 
      { docID, authorizerID }
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

export const rejectRequest = async (docID, authorizerID) => {
  try {
  const response = await axios.post(SERVER_BASE + ROUTE_URL + '/rejectrequest', 
    { docID, authorizerID }
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