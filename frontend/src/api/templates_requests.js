import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/api/templates"

export const fetchTemplate = async (subject) => {
  try {
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/fetchTemplate', {
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

export const saveTemplate = async (templateData, titleInput, authorizers, author) => {
  try {
    console.log(author)
    const response = await axios.post(SERVER_BASE + ROUTE_URL + '/saveTemplate', {
      Data: templateData, title: titleInput, Authorizers: authorizers, Author: author
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching template:', error.message);
    throw error;
  }
};

export const fetchNoSignTemplatesList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchNoSignTemplatesList', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching template list:', error.message);
    throw error;
  }
};

export const fetchOnlySignTemplatesList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchOnlySignTemplatesList', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching template list:', error.message);
    throw error;
  }
};

export const fetchTemplatesList = async () => {
  try {
    const response = await axios.get(SERVER_BASE + ROUTE_URL + '/fetchTemplatesList', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching template list:', error.message);
    throw error;
  }
};

