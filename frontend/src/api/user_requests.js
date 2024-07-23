import axios from "axios";
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/users";

export const login = async (email, password) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL +  '/login', {
      email,
      password
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response; 
  } catch (error) {
    return error.response || error; 
  }
};

export const signup = async (formData) => {
    try {
        const response = await axios.post(SERVER_BASE + ROUTE_URL + '/signup',
            formData
            , {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        return response; 
    } catch (error) {
        return error.response || error; 
    }
};
// fetchs a array of names of the users that are allow to sign forms
export const fetchAuthList = async () => {
  try {
      const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchauthlist', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response; 
  } catch (error) {
      return error.response || error; 
  }
};

export const fetchRequest = async (userId) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL +  '/fetchrequests', 
      {userId: userId}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response; 
  } catch (error) {
    return error.response || error; 
  }
};