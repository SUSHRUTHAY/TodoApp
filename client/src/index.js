import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MyRoutes } from './Layout';


const root = ReactDOM.createRoot(document.getElementById('newRoot'));
root.render(
  <MyRoutes />
);

reportWebVitals();
