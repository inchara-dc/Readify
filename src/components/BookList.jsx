import React from 'react';
import BookCard from './BookCard';
import EmptyState from './EmptyState';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * UNIT I & II: BookList Component
 * Renders lists of books using unique keys (`book.id`), handles grid or list layout,
 * and renders fallback EmptyState when no books match the current criteria.
 *
 * @param {Array} books - Array of book entities
 * @param {string} viewMode - 'grid' or 'list'
 * @param {string} emptyTitle - Custom heading for empty state
 * @param {string} emptyMessage - Custom explanation for empty state
 */
export const BookList = ({
  books = [],
  viewMode = 'grid',
  emptyTitle = 'No books found',
  emptyMessage = 'No books match your current filter or search criteria.'
}) => {
  if (books.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title={emptyTitle}
        description={emptyMessage}
        action={
          <Link to="/add-book" className="btn btn-primary">
            Add a New Book
          </Link>
        }
      />
    );
  }

  return (
    <div className={`book-list-container ${viewMode === 'list' ? 'view-list' : 'view-grid'}`}>
      {/* UNIT I: Rendering dynamic list using map() with key={book.id} */}
      {books.map((book) => (
        <BookCard key={book.id} book={book} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default BookList;
