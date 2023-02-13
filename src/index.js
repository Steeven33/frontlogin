import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from '@azure/msal-browser';

const pca = new PublicClientApplication({
  auth:{
      clientId: 'e1560722-5489-45ce-b041-81bd7f77ddf2',
      authority: 'https://login.microsoftonline.com/ea2f93f7-4932-4660-b329-869605f41b38',
      redirectUri: '/', 
  } 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App msalInstance={pca}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
