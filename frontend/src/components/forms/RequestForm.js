import React, { useState, useRef } from 'react';
import { Form, Dropdown, DropdownButton, Button, Card, Container } from 'react-bootstrap';
import { DocumentEditorContainerComponent, Inject, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';
import {
  PdfPageSettings,
  PdfDocument,
  PdfPageOrientation,
  PdfBitmap,
  PdfSection,
  SizeF,
  PdfStandardFont,
  PdfFontFamily,
  PdfPen,
  PdfSolidBrush,
  PdfTextAlignment,
  PdfVerticalAlignment,
  PdfColor
} from '@syncfusion/ej2-pdf-export';
const RequestForm = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const documentContainerRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubjectSelect = (subject) => {
    setSubject(subject);
  };

  const handleAdditionalNotesChange = (e) => {
    setAdditionalNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log('Form submitted:', { title, subject, additionalNotes });
  };

  const handleCOSF = async () => {
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
        let NameField = {fieldName: 'Name', value: 'Marko Doe'};
        let DateField = {fieldName: 'Text1', value: 'April  29, 2024'};
        let IDField = {fieldName: 'ID', value: '123456789'};
        documentContainerRef.current.documentEditor.importFormData([NameField, DateField, IDField]);
        let obj = documentContainerRef.current.documentEditor;
        let pdfdocument = new PdfDocument();
        let count = obj.pageCount;
        obj.documentEditorSettings.printDevicePixelRatio = 2;
        let loadedPage = 0;
        for (let i = 1; i <= count; i++) {
          setTimeout(() => {
            let format = 'image/jpeg';
            // Getting pages as image
            let image = obj.exportAsImage(i, format);
            image.onload = function () {
              let imageHeight = parseInt(
                image.style.height.toString().replace('px', '')
              );
              let imageWidth = parseInt(
                image.style.width.toString().replace('px', '')
              );
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
              loadedPage++;
              if (loadedPage == count) {
                  // Exporting the document as pdf
                pdfdocument.save(
                  (obj.documentName === ''
                    ? 'sample'
                    : obj.documentName) + '.pdf'
                );
              }
            };
          }, 500);
        }
      } else {
        console.error('Failed to fetch document:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh"}}>
      <Card className="mt-3" bg="primary" text="white" style={{ width: "500px" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group controlId="formSubject" style={{margin: "10px"}}>
              <Form.Label>Subject</Form.Label>
              <DropdownButton id="dropdown-basic-button" title={subject || 'Select subject'}>
                <Dropdown.Item onClick={() => handleSubjectSelect('Total Tuition Form')}>Total Tuition Form</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSubjectSelect('Confirmation of Studies Form')}>Confirmation of Studies Form</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="formAdditionalNotes">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control as="textarea" rows={3} value={additionalNotes} onChange={handleAdditionalNotesChange} />
            </Form.Group>
            <br/>
            <Button variant="primary" onClick={handleCOSF}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <DocumentEditorContainerComponent height="82vh" width="95%" id="container" ref={documentContainerRef} >
            <Inject services={[WordExport, SfdtExport]} />
          </DocumentEditorContainerComponent>
        </div>
      </Container>
  );
};

export default RequestForm;

/*
        //const pdfBlob = await documentContainerRef.current.documentEditor.saveAsBlob('Docx');
        //console.log("PDB_BLOB\t", pdfBlob)
        // const url = window.URL.createObjectURL(new Blob([pdfBlob]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'Doc_test.pdf');
        // document.body.appendChild(link);
        // link.click();
      
        //  documenteditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
          //       // The blob can be processed further
          //   });
        
      
        // Wait for the document to load

          // Get the text content of the document
        const documentData = documentContainerRef.current.documentEditor.serialize();

        // Create a new PDF document
        const pdfDocument = new PdfDocument();

        // Add a section to the PDF document
        const section = new PdfSection(pdfDocument);


        // Add text content from the fetched document to the PDF document
        const page = section.pages.add();
        const graphics = page.graphics;
        // const Font = new PdfStandardFont(PdfFontFamily.TimesRoman);
        

        let font = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
        // set pen
        let pen  = new PdfPen(new PdfColor(255, 0, 0));
        // set brush
        let brush = new PdfSolidBrush(new PdfColor(0, 0, 0));
        // set rectangle bounds
        let rectangle = new RectangleF({x : 10, y : 10}, {width : 200, height : 200});
        // set the format for string
        let stringFormat = new PdfStringFormat();
        // set the text alignment
        stringFormat.alignment = PdfTextAlignment.Center;
        // set the vertical alignment
        stringFormat.lineAlignment = PdfVerticalAlignment.Middle;
        //


        //graphics.drawString(documentData, font, new PdfPen(new PdfColor(255, 0, 0)), null, 100, 100, null);
        console.log("BEFORE>>>>>>>>>>>>>>>>>>>>>>>")
        graphics.drawString(documentData, font, pen, brush, rectangle, stringFormat);
        console.log("AFTER>>>>>>>>>>>>>>>>>>>>>>>")
        pdfDocument.save('output.pdf');
        pdfDocument.destroy();
        /*

        // create a new PDF document
let document : PdfDocument = new PdfDocument();
// add a pages to the document
let page1 : PdfPage = document.pages.add();
// set font
let font : PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
// set pen
let pen : PdfPen = new PdfPen(new PdfColor(255, 0, 0));
// set brush
let brush : PdfSolidBrush = new PdfSolidBrush(new PdfColor(0, 0, 0));
// set rectangle bounds
let rectangle : RectangleF = new RectangleF({x : 10, y : 10}, {width : 200, height : 200});
// set the format for string
let stringFormat : PdfStringFormat = new PdfStringFormat();
// set the text alignment
stringFormat.alignment = PdfTextAlignment.Center;
// set the vertical alignment
stringFormat.lineAlignment = PdfVerticalAlignment.Middle;
//
// draw the text
page1.graphics.drawString('Hello World', font, pen, brush, rectangle, stringFormat);
//
// save the document
document.save('output.pdf');
// destroy the document
document.destroy();

        */