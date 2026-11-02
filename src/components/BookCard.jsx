import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Check, Trash2, ArrowUpRight, Plus, Minus } from 'lucide-react';
import ProgressBar from './ProgressBar';
import RatingStars from './RatingStars';
import Modal from './Modal';
import { calculateProgress, READING_STATUS } from '../utils/bookUtils';
import { useBookContext } from '../context/BookContext';

/**
 * UNIT II: BookCard Component
 * Reusable component presenting a single book. Demonstrates parent-to-child props,
 * conditional rendering, image error fallbacks, and user interaction.
 *
 * @param {Object} book - The book entity
 * @param {string} viewMode - 'grid' or 'list'
 */
export const BookCard = ({ book, viewMode = 'grid' }) => {
  const { deleteBook, updateReadingProgress } = useBookContext();
  const [imageError, setImageError] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQuickUpdateOpen, setIsQuickUpdateOpen] = useState(false);
  const [quickPage, setQuickPage] = useState(book.currentPage);

  const progress = calculateProgress(book.currentPage, book.totalPages);

  // Status color badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case READING_STATUS.COMPLETED:
        return 'badge-status-completed';
      case READING_STATUS.CURRENTLY_READING:
        return 'badge-status-reading';
      case READING_STATUS.WANT_TO_READ:
      default:
        return 'badge-status-want';
    }
  };

  const handleQuickSave = (e) => {
    e.preventDefault();
    updateReadingProgress(book.id, quickPage);
    setIsQuickUpdateOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteBook(book.id);
    setIsDeleteModalOpen(false);
  };

  const fallbackCover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';

  if (viewMode === 'list') {
    return (
      <div className="book-card-list-view">
        <div className="list-view-cover-wrapper">
          <img
            src={imageError || !book.coverUrl ? fallbackCover : book.coverUrl}
            alt={book.title}
            className="list-view-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>

        <div className="list-view-info">
          <div className="list-view-header">
            <span className={`status-badge ${getStatusBadgeClass(book.status)}`}>
              {book.status}
            </span>
            <span className="genre-pill">{book.genre}</span>
          </div>

          <Link to={`/book/${book.id}`} className="list-view-title-link">
            <h3 className="list-view-title">{book.title}</h3>
          </Link>
          <p className="list-view-author">by {book.author}</p>

          <div className="list-view-meta">
            <div className="list-view-rating">
              <RatingStars rating={book.rating} readOnly size="sm" />
            </div>
            <span className="list-view-pages">
              {book.currentPage} / {book.totalPages} pages ({progress}%)
            </span>
          </div>

          <div className="list-view-progress">
            <ProgressBar value={book.currentPage} max={book.totalPages} size="sm" />
          </div>
        </div>

        <div className="list-view-actions">
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={() => {
              setQuickPage(book.currentPage);
              setIsQuickUpdateOpen(true);
            }}
            title="Update reading page"
          >
            Update Pages
          </button>
          <Link to={`/book/${book.id}`} className="btn btn-sm btn-primary">
            Details
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-icon-only text-danger"
            onClick={() => setIsDeleteModalOpen(true)}
            title="Delete book"
            aria-label="Delete book"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Book"
          subtitle={`Are you sure you want to remove "${book.title}" from your bookshelf? This cannot be undone.`}
        >
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteConfirm}
            >
              Confirm Delete
            </button>
          </div>
        </Modal>

        {/* Quick Progress Modal */}
        <Modal
          isOpen={isQuickUpdateOpen}
          onClose={() => setIsQuickUpdateOpen(false)}
          title="Update Reading Progress"
          subtitle={`Current: ${book.currentPage} of ${book.totalPages} pages`}
        >
          <form onSubmit={handleQuickSave} className="quick-progress-form">
            <div className="form-group">
              <label htmlFor={`quick-page-${book.id}`} className="form-label">
                Current Page
              </label>
              <div className="quick-page-input-row">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setQuickPage((p) => Math.max(0, Number(p) - 10))}
                >
                  <Minus size={14} /> 10
                </button>
                <input
                  id={`quick-page-${book.id}`}
                  type="number"
                  min="0"
                  max={book.totalPages}
                  value={quickPage}
                  onChange={(e) => setQuickPage(Math.min(book.totalPages, Math.max(0, Number(e.target.value))))}
                  className="form-input text-center"
                />
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setQuickPage((p) => Math.min(book.totalPages, Number(p) + 10))}
                >
                  +10 <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="quick-progress-slider-wrapper">
              <input
                type="range"
                min="0"
                max={book.totalPages}
                value={quickPage}
                onChange={(e) => setQuickPage(Number(e.target.value))}
                className="progress-range-slider"
              />
              <div className="slider-labels">
                <span>0</span>
                <span>{calculateProgress(quickPage, book.totalPages)}%</span>
                <span>{book.totalPages}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsQuickUpdateOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Progress
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="book-card-grid">
      <div className="book-card-cover-container">
        <Link to={`/book/${book.id}`} className="book-cover-link">
          <img
            src={imageError || !book.coverUrl ? fallbackCover : book.coverUrl}
            alt={book.title}
            className="book-card-cover-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </Link>
        <span className={`status-badge-overlay ${getStatusBadgeClass(book.status)}`}>
          {book.status}
        </span>
      </div>

      <div className="book-card-content">
        <div className="book-card-genre-row">
          <span className="genre-pill">{book.genre}</span>
        </div>

        <Link to={`/book/${book.id}`} className="book-title-link">
          <h3 className="book-card-title" title={book.title}>
            {book.title}
          </h3>
        </Link>

        <p className="book-card-author">by {book.author}</p>

        <div className="book-card-rating">
          <RatingStars rating={book.rating} readOnly size="sm" />
        </div>

        <div className="book-card-progress-section">
          <div className="progress-labels-row">
            <span className="pages-read">
              <strong>{book.currentPage}</strong> / {book.totalPages} p.
            </span>
            <span className="percentage-badge">{progress}%</span>
          </div>
          <ProgressBar value={book.currentPage} max={book.totalPages} showLabel={false} size="sm" />
        </div>

        <div className="book-card-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm quick-update-btn"
            onClick={() => {
              setQuickPage(book.currentPage);
              setIsQuickUpdateOpen(true);
            }}
          >
            Update
          </button>
          <Link
            to={`/book/${book.id}`}
            className="btn btn-primary btn-sm view-details-btn"
          >
            <span>View</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Book"
        subtitle={`Are you sure you want to remove "${book.title}" from your bookshelf? This action cannot be undone.`}
      >
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteConfirm}
          >
            Confirm Delete
          </button>
        </div>
      </Modal>

      {/* Quick Progress Modal */}
      <Modal
        isOpen={isQuickUpdateOpen}
        onClose={() => setIsQuickUpdateOpen(false)}
        title={`Update Reading: ${book.title}`}
        subtitle={`Logged: ${book.currentPage} of ${book.totalPages} pages`}
      >
        <form onSubmit={handleQuickSave} className="quick-progress-form">
          <div className="form-group">
            <label htmlFor={`quick-page-grid-${book.id}`} className="form-label">
              Pages Read So Far
            </label>
            <div className="quick-page-input-row">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setQuickPage((p) => Math.max(0, Number(p) - 10))}
              >
                <Minus size={14} /> 10
              </button>
              <input
                id={`quick-page-grid-${book.id}`}
                type="number"
                min="0"
                max={book.totalPages}
                value={quickPage}
                onChange={(e) => setQuickPage(Math.min(book.totalPages, Math.max(0, Number(e.target.value))))}
                className="form-input text-center"
              />
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setQuickPage((p) => Math.min(book.totalPages, Number(p) + 10))}
              >
                +10 <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="quick-progress-slider-wrapper">
            <input
              type="range"
              min="0"
              max={book.totalPages}
              value={quickPage}
              onChange={(e) => setQuickPage(Number(e.target.value))}
              className="progress-range-slider"
            />
            <div className="slider-labels">
              <span>0 pages</span>
              <span>{calculateProgress(quickPage, book.totalPages)}%</span>
              <span>{book.totalPages} pages</span>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsQuickUpdateOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Progress
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookCard;
