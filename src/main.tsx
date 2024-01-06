import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './app';
import './index.css';

const rootElement = document.querySelector('#root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
      <SpeedInsights />
    </React.StrictMode>,
  );
}
