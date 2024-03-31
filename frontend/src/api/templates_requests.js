import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/templates"

export const fetchTemplate = async (subject) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/fetchtemplate', { 
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

export const deleteTemplate = async (subject) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/deletetemplate', { 
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


export const saveTemplate = async (templateData, titleInput, signatories, author) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/savetemplate', {
      Data: templateData, title: titleInput, Signatories: signatories, Author: author
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error saving template:', error.message);
    throw error;
  }
};

export const fetchNoSignTemplatesList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchnosigntemplateslist', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching noSignTemplate list:', error.message);
    throw error;
  }
};

export const fetchOnlySignTemplatesList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchonlysigntemplateslist', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching onlySignTemplate list:', error.message);
    throw error;
  }
};

export const fetchTemplatesList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchtemplateslist', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching templatesList list:', error.message);
    throw error;
  }
};

