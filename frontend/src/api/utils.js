import { PdfPageSettings, PdfDocument, PdfPageOrientation, PdfBitmap, SizeF } from '@syncfusion/ej2-pdf-export';

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
