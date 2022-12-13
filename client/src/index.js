import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext/AuthContext';
import { SearchProvider } from './context/SearchContext/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchProvider>

        <App />

      </SearchProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

