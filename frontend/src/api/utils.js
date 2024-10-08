import axios from "axios"
import { PdfPageSettings, PdfDocument, PdfPageOrientation, PdfBitmap, SizeF } from '@syncfusion/ej2-pdf-export';
import { SERVER_BASE, UTILS_ROUTE_URL } from "./config";

// converts a document(document container object into a pdf file)
export const pdfConverter = async (objRef) => {
  const obj = objRef.current.documentEditor; 
  if (!obj) {
    throw new Error('Ref object is not initialized');
  }
  let pdfdocument = new PdfDocument();
  let count = obj.pageCount;
  obj.documentEditorSettings.printDevicePixelRatio = 2;
  for (let i = 1; i <= count; i++) {
    await new Promise((resolve, reject) => {
      let format = 'image/jpeg';
      let image = obj.exportAsImage(i, format);
      image.onload = function () {
        let imageHeight = parseInt(image.style.height.toString().replace('px', ''));
        let imageWidth = parseInt(image.style.width.toString().replace('px', ''));
        let section = pdfdocument.sections.add();
        let settings = new PdfPageSettings(0);
        if (imageWidth > imageHeight) {
          settings.orientation = PdfPageOrientation.Landscape;
        }
        settings.size = new SizeF(imageWidth, imageHeight);
        section.setPageSettings(settings);
        let page = section.pages.add();
        let graphics = page.graphics;
        let imageStr = image.src.replace('data:image/jpeg;base64,', '');
        let pdfImage = new PdfBitmap(imageStr);
        graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
        resolve();
      };
      image.onerror = function (error) {
        reject(error);
      };
    });
  }
  pdfdocument.save((obj.documentName === '' ? 'sample' : obj.documentName) + '.pdf');
};

export const decodeValue = async (token) => {
  try {
    const response = await axios.post(SERVER_BASE + UTILS_ROUTE_URL + '/decodevalue', 
      token
      , {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error decoding value:', error.message);
    throw error;
  }
};

// Utility function for logging and handling errors
export const handleApiError = (error) => {
  if (error.response) {
    console.error(`Error ${error.response.status}: ${error.response.data}`);
  } else if (error.request) {
    console.error('Error: No response received:', error.request);
  } else {
    console.error('Error:', error.message);
  }
  throw error;
};