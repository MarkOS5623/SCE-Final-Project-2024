import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/documents/"


export const createDocument = async (documentObject) => {
    let res
    try {
        res = await axios.post(SERVER_BASE + ROUTE_URL, documentObject)
    } catch (error) {
        res = {message: error.message, success: false}
    }
    finally {return res}
};

const save_as_word_docx = async () =>{
    try {
      // Fetch the document from the API
      const response = await fetch('http://localhost:5000/api/documents/fetchDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'Confirmation of Studies' }), 
      });


      if (response.ok) {
        const document = await response.json();
        documentContainerRef.current.documentEditor.open(document.text);
        console.log(document.text)
        let NameField = {fieldName: 'Name', value: 'Marko Doe'};
        let DateField = {fieldName: 'Text1', value: 'April  29, 2024'};
        let IDField = {fieldName: 'ID', value: '123456789'};
        documentContainerRef.current.documentEditor.importFormData([NameField, DateField, IDField]);
        documentContainerRef.current.documentEditor.save("Doc_test", "Docx")
      } else {
        console.error('Failed to fetch document:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }