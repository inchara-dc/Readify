import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, Home, ArrowLeft } from 'lucide-react';

/**
 * UNIT IV: NotFound Component (Fallback 404 Route)
 * Displayed whenever an unmapped URL path is visited.
 */
export const NotFound = () => {
  return (
    <div className="not-found-page animate-fade-in">
      <div className="not-found-card">
        <div className="not-found-icon-wrap">
          <BookX size={52} className="not-found-icon" />
        </div>

        <span className="not-found-code">404 ERROR</span>
        <h1 className="not-found-heading">Page Lost in the Library Stacks</h1>
        <p className="not-found-description">
          The page or bookshelf record you are searching for does not exist, has been relocated, or is temporarily unavailable.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return to Dashboard
          </Link>
          <Link to="/books" className="btn btn-outline">
            <ArrowLeft size={16} /> Go to Bookshelf
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
