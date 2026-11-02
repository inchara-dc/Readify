import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Share2,
  Plus,
  Minus,
  Sparkles,
  Quote
} from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { calculateProgress, formatDate, READING_STATUS } from '../utils/bookUtils';
import ProgressBar from '../components/ProgressBar';
import RatingStars from '../components/RatingStars';
import Modal from '../components/Modal';
import BookForm from '../components/BookForm';

/**
 * UNIT I, II, III & IV: BookDetails Page
 * Demonstrates:
 * - Dynamic route handling with useParams()
 * - Full CRUD interactions (Read, Update Progress, Edit, Delete)
 * - Automatic status resolution when reaching 100%
 * - Conditional rendering and modal integration
 */
export const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, updateBook, updateReadingProgress, deleteBook } = useBookContext();

  const book = getBookById(id);

  // Local state for modals and progress sliders
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quickPageValue, setQuickPageValue] = useState(book ? book.currentPage : 0);
  const [imageError, setImageError] = useState(false);

  if (!book) {
    return (
      <div className="book-not-found-card animate-fade-in">
        <BookOpen size={48} className="not-found-icon" />
        <h2>Book Not Found</h2>
        <p>The book you are looking for does not exist or was removed from your bookshelf.</p>
        <Link to="/books" className="btn btn-primary">
          Back to Bookshelf
        </Link>
      </div>
    );
  }

  const progress = calculateProgress(book.currentPage, book.totalPages);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case READING_STATUS.COMPLETED:
        return (
          <span className="status-badge badge-status-completed">
            <CheckCircle2 size={14} /> Completed
          </span>
        );
      case READING_STATUS.CURRENTLY_READING:
        return (
          <span className="status-badge badge-status-reading">
            <BookOpen size={14} /> Currently Reading
          </span>
        );
      case READING_STATUS.WANT_TO_READ:
      default:
        return (
          <span className="status-badge badge-status-want">
            <Bookmark size={14} /> Want to Read
          </span>
        );
    }
  };

  // Quick progress adjustment
  const handlePageUpdateSubmit = (e) => {
    e.preventDefault();
    updateReadingProgress(book.id, quickPageValue);
  };

  // Full edit submission
  const handleEditSubmit = (updatedData) => {
    updateBook(book.id, updatedData);
    setIsEditModalOpen(false);
    setQuickPageValue(updatedData.currentPage);
  };

  // Delete book and redirect
  const handleDeleteConfirm = () => {
    deleteBook(book.id);
    navigate('/books');
  };

  const fallbackCover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="book-details-page animate-fade-in">
      {/* Top Navigation Row */}
      <div className="details-nav-row">
        <Link to="/books" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Bookshelf</span>
        </Link>

        <div className="details-header-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit size={15} />
            <span>Edit Book</span>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => setIsDeleteModalOpen(true)}
            aria-label="Delete book"
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Details Hero Card */}
      <div className="book-details-hero-card">
        {/* Cover Column */}
        <div className="hero-cover-column">
          <div className="hero-cover-wrapper">
            <img
              src={imageError || !book.coverUrl ? fallbackCover : book.coverUrl}
              alt={book.title}
              className="hero-cover-image"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="hero-status-tag">{getStatusBadge(book.status)}</div>
        </div>

        {/* Content Column */}
        <div className="hero-content-column">
          <div className="hero-genre-date">
            <span className="genre-pill">{book.genre}</span>
            <span className="hero-date">
              <Calendar size={13} /> Added on {formatDate(book.dateAdded)}
            </span>
          </div>

          <h1 className="hero-book-title">{book.title}</h1>
          <h3 className="hero-book-author">by {book.author}</h3>

          {/* Rating */}
          <div className="hero-rating-row">
            <RatingStars rating={book.rating} readOnly size="md" />
            <span className="hero-rating-text">
              {book.rating > 0 ? `${book.rating} out of 5 stars` : 'Unrated'}
            </span>
          </div>

          {/* Reading Progress Showcase */}
          <div className="hero-progress-box">
            <div className="progress-box-header">
              <div>
                <span className="progress-box-title">Reading Progress</span>
                <span className="progress-box-pages">
                  <strong>{book.currentPage}</strong> of <strong>{book.totalPages}</strong> pages read
                </span>
              </div>
              <span className="progress-box-percent">{progress}%</span>
            </div>

            <ProgressBar value={book.currentPage} max={book.totalPages} size="md" />

            {/* Quick Progress Interactive Form */}
            <form onSubmit={handlePageUpdateSubmit} className="quick-update-inline-form">
              <span className="inline-form-label">Update current page:</span>

              <div className="inline-form-controls">
                <button
                  type="button"
                  className="btn btn-outline btn-sm btn-icon"
                  onClick={() => {
                    const next = Math.max(0, Number(quickPageValue) - 10);
                    setQuickPageValue(next);
                    updateReadingProgress(book.id, next);
                  }}
                  title="Subtract 10 pages"
                >
                  <Minus size={13} /> 10
                </button>

                <input
                  type="number"
                  min="0"
                  max={book.totalPages}
                  value={quickPageValue}
                  onChange={(e) => setQuickPageValue(Math.min(book.totalPages, Math.max(0, Number(e.target.value))))}
                  className="quick-page-input"
                  aria-label="Current page number"
                />

                <button
                  type="button"
                  className="btn btn-outline btn-sm btn-icon"
                  onClick={() => {
                    const next = Math.min(book.totalPages, Number(quickPageValue) + 10);
                    setQuickPageValue(next);
                    updateReadingProgress(book.id, next);
                  }}
                  title="Add 10 pages"
                >
                  +10 <Plus size={13} />
                </button>

                <button type="submit" className="btn btn-primary btn-sm">
                  Save Page
                </button>

                {book.currentPage < book.totalPages && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setQuickPageValue(book.totalPages);
                      updateReadingProgress(book.id, book.totalPages);
                    }}
                  >
                    Mark Finished
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Review & Reflections */}
          {book.review && (
            <div className="hero-review-section">
              <h4 className="section-label">
                <Quote size={15} /> Reader Review & Reflection
              </h4>
              <p className="hero-review-quote">{book.review}</p>
            </div>
          )}

          {/* Private Notes */}
          {book.notes && (
            <div className="hero-notes-section">
              <h4 className="section-label">
                <Sparkles size={14} /> Notes & Key Takeaways
              </h4>
              <p className="hero-notes-text">{book.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Book Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Book: ${book.title}`}
        subtitle="Modify information, page count, review or cover image."
        maxWidth="820px"
      >
        <BookForm
          initialValues={book}
          onSubmit={handleEditSubmit}
          submitLabel="Save Changes"
          isEdit={true}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* Delete Book Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Removal"
        subtitle={`Are you sure you want to delete "${book.title}" from your library?`}
      >
        <div className="delete-modal-content">
          <p>
            This action will permanently delete this book record, reading progress history, and notes from your browser's local storage.
          </p>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Keep Book
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteConfirm}
            >
              Yes, Delete Book
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetails;
