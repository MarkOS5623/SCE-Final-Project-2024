import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/documents"

export const saveDocument = async (text, subject, signatories, author) => {
    try {
      console.log(author)
      const response = await axios.post(SERVER_BASE + ROUTE_URL + '/saveDocument', {
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