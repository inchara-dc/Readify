import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookPlus } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import BookForm from '../components/BookForm';

/**
 * UNIT II, III & IV: AddBook Page
 * Provides full book creation interface with validation and redirection.
 */
export const AddBook = () => {
  const { addBook } = useBookContext();
  const navigate = useNavigate();

  const handleFormSubmit = (newBookData) => {
    const createdBook = addBook(newBookData);
    // Navigate immediately to the newly created book's details or bookshelf
    navigate(`/book/${createdBook.id}`);
  };

  return (
    <div className="add-book-page animate-fade-in">
      {/* Breadcrumb / Back button */}
      <div className="page-nav-back">
        <Link to="/books" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Bookshelf</span>
        </Link>
      </div>

      <div className="page-header-box">
        <div className="page-header-icon">
          <BookPlus size={26} />
        </div>
        <div>
          <h1 className="page-heading">Add a New Book</h1>
          <p className="page-subheading">
            Catalogue your latest read, set page counts, and start tracking your reading journey.
          </p>
        </div>
      </div>

      <div className="form-card-container">
        <BookForm
          onSubmit={handleFormSubmit}
          submitLabel="Save Book to Bookshelf"
          onCancel={() => navigate('/books')}
        />
      </div>
    </div>
  );
};

export default AddBook;
