import React from 'react';
import ViewDocument from './templates/viewDocument';
import { fetchDocument } from '../api/documents_reqeusts';

const AuthDocumentViewer = (( documentId ) => {

    return (
        <ViewDocument documentId={documentId}/>
      );
});

export default AuthDocumentViewer;
