import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/documents/"

export const fetchDocument = async (subject) => {
  try {
    const response = await fetch('http://localhost:5000/api/documents/fetchDocument', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: subject }), 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }

    const data = await response.json(); // assuming response is JSON
    return data;
  } catch (error) {
    console.error('Error fetching document:', error.message);
    throw error;
  }
};
