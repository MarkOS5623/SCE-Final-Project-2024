import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerLicense  } from '@syncfusion/ej2-base';
import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-lists/styles/material.css';
import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import "../node_modules/@syncfusion/ej2-documenteditor/styles/material.css";

registerLicense ('Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXxednVXRWhfVUR1WUI=');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    
    <App />
   
);

