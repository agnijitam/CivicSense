import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { IssueProvider } from './context/IssueContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <IssueProvider>
        <App />
      </IssueProvider>
    </BrowserRouter>
  </React.StrictMode>
);
