import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render( //this loads the app on screen
  //for highlighting potential problems in the app-strictmode
   //for enabling pages routing - browserrouter
  // <React.StrictMode>    
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  // </React.StrictMode>
)