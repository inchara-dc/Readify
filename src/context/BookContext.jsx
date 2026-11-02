import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { INITIAL_BOOKS, INITIAL_YEARLY_GOAL } from '../utils/initialData';
import { autoResolveStatus, calculateProgress } from '../utils/bookUtils';

const BookContext = createContext(null);

const STORAGE_KEYS = {
  BOOKS: 'readify_books_collection_v1',
  GOAL: 'readify_reading_goal_v1'
};

/**
 * UNIT II & V: BookProvider component
 * Provides global state management for book collection, reading targets,
 * CRUD operations, and user feedback toast notifications.
 */
export const BookProvider = ({ children }) => {
  // Unit V: Synchronizing state with LocalStorage via useLocalStorage custom hook
  const [books, setBooks] = useLocalStorage(STORAGE_KEYS.BOOKS, INITIAL_BOOKS);
  const [yearlyGoal, setYearlyGoal] = useLocalStorage(STORAGE_KEYS.GOAL, INITIAL_YEARLY_GOAL);

  // Toast notification state
  const [toast, setToast] = useState(null);

  /**
   * Helper to trigger transient toast notification
   */
  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  /**
   * CREATE: Add a new book to the bookshelf
   */
  const addBook = useCallback((newBookData) => {
    const total = Number(newBookData.totalPages) || 1;
    const current = Math.min(Number(newBookData.currentPage) || 0, total);
    const resolvedStatus = autoResolveStatus(current, total, newBookData.status);

    const newBook = {
      ...newBookData,
      id: `book-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      totalPages: total,
      currentPage: current,
      status: resolvedStatus,
      rating: Number(newBookData.rating) || 0,
      dateAdded: new Date().toISOString()
    };

    setBooks((prevBooks) => [newBook, ...prevBooks]);
    showToast(`"${newBook.title}" added to your bookshelf!`, 'success');
    return newBook;
  }, [setBooks, showToast]);

  /**
   * READ: Find a single book by its unique ID
   */
  const getBookById = useCallback((id) => {
    return books.find((b) => String(b.id) === String(id));
  }, [books]);

  /**
   * UPDATE: Modify an existing book's details
   */
  const updateBook = useCallback((id, updatedFields) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (String(book.id) !== String(id)) return book;

        const total = Number(updatedFields.totalPages !== undefined ? updatedFields.totalPages : book.totalPages) || 1;
        const current = Math.min(
          Number(updatedFields.currentPage !== undefined ? updatedFields.currentPage : book.currentPage) || 0,
          total
        );
        const desiredStatus = updatedFields.status !== undefined ? updatedFields.status : book.status;
        const resolvedStatus = autoResolveStatus(current, total, desiredStatus);

        return {
          ...book,
          ...updatedFields,
          totalPages: total,
          currentPage: current,
          status: resolvedStatus,
          rating: updatedFields.rating !== undefined ? Number(updatedFields.rating) : book.rating,
          lastUpdated: new Date().toISOString()
        };
      })
    );
    showToast('Book details updated successfully!', 'success');
  }, [setBooks, showToast]);

  /**
   * UPDATE QUICK PROGRESS: Update just the current page and auto-resolve status
   */
  const updateReadingProgress = useCallback((id, newPage) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (String(book.id) !== String(id)) return book;

        const total = Number(book.totalPages) || 1;
        const current = Math.max(0, Math.min(Number(newPage) || 0, total));
        const resolvedStatus = autoResolveStatus(current, total, book.status);

        return {
          ...book,
          currentPage: current,
          status: resolvedStatus,
          lastUpdated: new Date().toISOString()
        };
      })
    );
    showToast('Reading progress updated!', 'info');
  }, [setBooks, showToast]);

  /**
   * DELETE: Remove a book from the bookshelf
   */
  const deleteBook = useCallback((id) => {
    const bookToDelete = books.find((b) => String(b.id) === String(id));
    setBooks((prevBooks) => prevBooks.filter((book) => String(book.id) !== String(id)));
    showToast(
      bookToDelete ? `"${bookToDelete.title}" removed from bookshelf.` : 'Book deleted.',
      'info'
    );
  }, [books, setBooks, showToast]);

  /**
   * Reset collection to initial sample data
   */
  const resetToSampleData = useCallback(() => {
    setBooks(INITIAL_BOOKS);
    setYearlyGoal(INITIAL_YEARLY_GOAL);
    showToast('Bookshelf reset to sample collection.', 'info');
  }, [setBooks, setYearlyGoal, showToast]);

  /**
   * Update Yearly Reading Goal
   */
  const updateGoal = useCallback((newGoalTarget) => {
    const sanitized = Math.max(1, Number(newGoalTarget) || 1);
    setYearlyGoal(sanitized);
    showToast(`Yearly reading target set to ${sanitized} books!`, 'success');
  }, [setYearlyGoal, showToast]);

  // Memoized context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({
    books,
    yearlyGoal,
    toast,
    addBook,
    getBookById,
    updateBook,
    updateReadingProgress,
    deleteBook,
    resetToSampleData,
    updateGoal,
    showToast,
    clearToast
  }), [
    books,
    yearlyGoal,
    toast,
    addBook,
    getBookById,
    updateBook,
    updateReadingProgress,
    deleteBook,
    resetToSampleData,
    updateGoal,
    showToast,
    clearToast
  ]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

/**
 * Custom hook to consume the BookContext
 */
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

export default BookContext;
