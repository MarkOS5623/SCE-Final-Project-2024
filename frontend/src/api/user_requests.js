import axios from "axios";
import { SERVER_BASE, USER_ROUTE_URL } from "./config";
import { handleApiError } from "./utils"; 

export const login = async (email, password) => {
  try {
    console.log(process.env.SERVER_BASE)
    const response = await axios.post(`${SERVER_BASE}${USER_ROUTE_URL}/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response; 
  } catch (error) {
    handleApiError(error); 
  }
};

export const signup = async (formData) => {
  try {
    const response = await axios.post(`${SERVER_BASE}${USER_ROUTE_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response; 
  } catch (error) {
    handleApiError(error); 
  }
};

export const fetchAuthList = async () => {
  try {
    const response = await axios.get(`${SERVER_BASE}${USER_ROUTE_URL}/fetchauthlist`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    handleApiError(error); 
  }
};

export const fetchRequest = async (userId) => {
  try {
    const response = await axios.post(`${SERVER_BASE}${USER_ROUTE_URL}/fetchrequests`, 
      { userId }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data; 
  } catch (error) {
    handleApiError(error); 
  }
};
