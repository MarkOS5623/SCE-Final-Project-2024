import React from 'react';
import ViewDocument from './templates/viewDocument';

const AuthDocumentViewer = (( documentId ) => {
    return (
        <ViewDocument documentId={documentId}/>
      );
});

export default AuthDocumentViewer;
