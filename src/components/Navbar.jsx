import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Plus, BookOpen, Compass } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

/**
 * UNIT II & IV: Navbar Component
 * Renders the top navigation header with mobile toggle, breadcrumb titles,
 * and quick action buttons.
 *
 * @param {Function} onToggleSidebar - Trigger for mobile drawer
 */
export const Navbar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { books } = useBookContext();

  const getPageTitle = (pathname) => {
    if (pathname === '/') return 'Dashboard Overview';
    if (pathname.startsWith('/books')) return 'My Digital Bookshelf';
    if (pathname.startsWith('/add-book')) return 'Add New Book';
    if (pathname.startsWith('/book/')) return 'Book Details & Reading Log';
    if (pathname.startsWith('/goals')) return 'Annual Reading Goals';
    if (pathname.startsWith('/statistics')) return 'Reading Statistics & Analytics';
    if (pathname.startsWith('/about')) return 'About Readify Project';
    return 'Readify Library';
  };

  const completedCount = books.filter((b) => b.status === 'Completed').length;

  return (
    <header className="readify-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="navbar-title-group">
          <h2 className="navbar-page-title">{getPageTitle(location.pathname)}</h2>
          <span className="navbar-subtitle">
            Curate, track, and elevate your reading journey
          </span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Quick Summary Pill */}
        <div className="navbar-stats-pill" title="Library quick counter">
          <BookOpen size={16} className="pill-icon" />
          <span className="pill-text">
            <strong>{books.length}</strong> {books.length === 1 ? 'book' : 'books'}
          </span>
          <span className="pill-divider">•</span>
          <span className="pill-completed">
            <strong>{completedCount}</strong> read
          </span>
        </div>

        {/* Quick Add Action */}
        <Link to="/add-book" className="btn btn-primary navbar-add-btn">
          <Plus size={16} />
          <span className="hide-sm">Add Book</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
