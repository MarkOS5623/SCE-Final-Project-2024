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
};JSON.stringify()

export const signup = async (formData) => {
    console.log(formData)
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