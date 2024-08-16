import axios from "axios";
import { SERVER_BASE, FORMS_ROUTE_URL } from "./config";
import { handleApiError } from "./utils";

export const fetchForm = async (subject) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE}${FORMS_ROUTE_URL}/fetchform`, 
      { title: subject }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteForm = async (subject) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE}${FORMS_ROUTE_URL}/deleteform`, 
      { title: subject }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const saveForm = async (formData, titleInput, signatoryTiers, author, type) => {
  try {
    console.log(signatoryTiers)
    const response = await axios.post(
      `${SERVER_BASE}${FORMS_ROUTE_URL}/saveform`,
      { Data: formData, title: titleInput, signatoryTiers: signatoryTiers, Author: author, Type: type },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchNoSignatureFormsList = async () => {
  try {
    const response = await axios.get(
      `${SERVER_BASE}${FORMS_ROUTE_URL}/fetchnosignatureformslist`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchFormWithSignatureList = async () => {
  try {
    const response = await axios.get(
      `${SERVER_BASE}${FORMS_ROUTE_URL}/fetchformwithsignaturelist`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAllFormsList = async () => {
  try {
    const response = await axios.get(
      `${SERVER_BASE}${FORMS_ROUTE_URL}/fetchformslist`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateFormTitle = async (oldTitle, newTitle) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE}${FORMS_ROUTE_URL}/updateformtitle`, 
      { oldTitle, newTitle },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
