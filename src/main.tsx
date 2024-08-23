import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

const rootElement = document.querySelector('#root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Auth0Provider
      domain="dajohnston.eu.auth0.com"
      clientId="JtOVDaDEeSOT7HAaBt0tLBFJvb5g7tyh"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <React.StrictMode>
        <App />
        <SpeedInsights />
        <Analytics />
      </React.StrictMode>
    </Auth0Provider>,
  );
}
