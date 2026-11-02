import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BookProvider } from './context/BookContext';

// Import CSS Stylesheets
import './styles/global.css';
import './styles/dashboard.css';
import './styles/bookshelf.css';
import './styles/forms.css';
import './styles/details.css';
import './styles/goals.css';
import './styles/statistics.css';
import './styles/about.css';

/**
 * UNIT I & IV: Application Entry Point
 * Mounts React 18 Root with BrowserRouter and BookProvider context wrappers.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookProvider>
        <App />
      </BookProvider>
    </BrowserRouter>
  </React.StrictMode>
);
