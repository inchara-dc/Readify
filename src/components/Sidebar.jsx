import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Target,
  BarChart3,
  Info,
  BookMarked,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import ReadingGoal from './ReadingGoal';
import { useBookContext } from '../context/BookContext';

/**
 * UNIT II & IV: Sidebar Component
 * Implements sidebar navigation with React Router's NavLink.
 * Displays active state indicators, branding, quick annual goal status,
 * and demo reset control.
 *
 * @param {boolean} isOpen - Mobile drawer toggle state
 * @param {Function} onClose - Close mobile drawer callback
 */
export const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { resetToSampleData, books } = useBookContext();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/books', label: 'My Bookshelf', icon: BookOpen, badge: books.length },
    { to: '/add-book', label: 'Add Book', icon: PlusCircle },
    { to: '/goals', label: 'Reading Goals', icon: Target },
    { to: '/statistics', label: 'Statistics', icon: BarChart3 },
    { to: '/about', label: 'About Readify', icon: Info }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`readify-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <BookMarked size={24} />
          </div>
          <div className="brand-text-group">
            <h1 className="brand-title">Readify</h1>
            <span className="brand-tagline">Personal Bookshelf</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav" aria-label="Main Navigation">
          <span className="nav-section-title">MENU</span>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to} className="nav-list-item">
                  {/* UNIT IV: React Router NavLink with dynamic active class */}
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={onClose}
                  >
                    <Icon size={19} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Reading Goal Widget in Sidebar */}
        <div className="sidebar-widget-area">
          <ReadingGoal compact={true} />
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-reset-btn"
            onClick={() => {
              if (window.confirm('Reset bookshelf with sample academic books?')) {
                resetToSampleData();
              }
            }}
            title="Reload initial demo dataset"
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>
          <div className="sidebar-version-tag">
            <Sparkles size={11} /> React Course Project
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
