import axios from "axios";
import { SERVER_BASE, DOCUMENT_ROUTE_URL } from "./config";
import { handleApiError } from "./utils";

export const saveDocument = async (text, subject, signatories, author, type, documentId) => {
  try {
    console.log(signatories);
    const response = await axios.post(
      `${SERVER_BASE}${DOCUMENT_ROUTE_URL}/savedocument`,
      { text, subject, signatories, author, type, documentId },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const newMessageForAuthor = {
      author,
      subject,
      status: 'pending approval',
      type: 'requester'
    };
    const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = [...existingMessages, newMessageForAuthor];

    signatories.forEach(signatory => {
      const newMessageForSignatory = {
        author: signatory,
        subject,
        status: 'pending approval',
        type: 'authorizer'
      };
      updatedMessages.push(newMessageForSignatory);
    });

    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUnsignedDocumentList = async () => {
  try {
    const response = await axios.get(
      `${SERVER_BASE}${DOCUMENT_ROUTE_URL}/fetchunsigneddocumentlist`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchSignedDocumentList = async () => {
  try {
    const response = await axios.get(
      `${SERVER_BASE}${DOCUMENT_ROUTE_URL}/fetchsigneddocumentlist`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchDocument = async (documentId) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE}${DOCUMENT_ROUTE_URL}/fetchdocument`,
      { documentId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteDocuments = async (documentIds) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE}${DOCUMENT_ROUTE_URL}/deletedocuments`,
      { documentIds },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchDocumentAuthor = async (documentId) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE}${DOCUMENT_ROUTE_URL}/fetchdocumentauthor`,
      { documentId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
