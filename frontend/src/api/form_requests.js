import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/forms"

export const fetchForm = async (subject) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/fetchform', { 
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

export const deleteForm = async (subject) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/deleteform', { 
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


export const saveForm = async (formData, titleInput, signatories, author) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/saveform', {
      Data: formData, title: titleInput, Signatories: signatories, Author: author
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error saving form:', error.message);
    throw error;
  }
};

export const fetchUnSignedFormsList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchunsignedformslist', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching noSignForm list:', error.message);
    throw error;
  }
};

export const fetchSignedFormsList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchonlysignformslist', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching onlySignForm list:', error.message);
    throw error;
  }
};

export const fetchAllFormsList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchformslist', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching formsList list:', error.message);
    throw error;
  }
};

