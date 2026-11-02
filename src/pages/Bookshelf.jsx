import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  PlusCircle,
  X,
  BookOpen
} from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { GENRES, READING_STATUS, filterAndSortBooks } from '../utils/bookUtils';
import BookList from '../components/BookList';

/**
 * UNIT I, II, III & IV: Bookshelf Page
 * Complete library browser with multi-dimensional filtering, searching,
 * sorting, and dynamic grid/list presentation view modes.
 */
export const Bookshelf = () => {
  const { books } = useBookContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search, Filter and Sort State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'All');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recent');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Synchronize state when URL search params change (e.g. from Dashboard links)
  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam && (Object.values(READING_STATUS).includes(statusParam) || statusParam === 'All')) {
      setSelectedStatus(statusParam);
    }
  }, [searchParams]);

  // UNIT V: useMemo to memoize filtered and sorted results
  const filteredBooks = useMemo(() => {
    return filterAndSortBooks(books, {
      search: searchQuery,
      genre: selectedGenre,
      status: selectedStatus,
      sortBy: sortBy
    });
  }, [books, searchQuery, selectedGenre, selectedStatus, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedGenre !== 'All' || selectedStatus !== 'All' || sortBy !== 'recent';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedStatus('All');
    setSortBy('recent');
    setSearchParams({});
  };

  // Status tabs with individual item counts
  const statusTabs = [
    { label: 'All Books', value: 'All', count: books.length },
    {
      label: 'Currently Reading',
      value: READING_STATUS.CURRENTLY_READING,
      count: books.filter((b) => b.status === READING_STATUS.CURRENTLY_READING).length
    },
    {
      label: 'Want to Read',
      value: READING_STATUS.WANT_TO_READ,
      count: books.filter((b) => b.status === READING_STATUS.WANT_TO_READ).length
    },
    {
      label: 'Completed',
      value: READING_STATUS.COMPLETED,
      count: books.filter((b) => b.status === READING_STATUS.COMPLETED).length
    }
  ];

  return (
    <div className="bookshelf-page animate-fade-in">
      {/* Top Header Row */}
      <div className="bookshelf-header-row">
        <div>
          <h1 className="page-heading">My Digital Bookshelf</h1>
          <p className="page-subheading">
            Browse, filter, and curate your personalized collection ({books.length} {books.length === 1 ? 'book' : 'books'})
          </p>
        </div>

        <Link to="/add-book" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bookshelf-toolbar">
        {/* Search Input */}
        <div className="toolbar-search-wrapper">
          <Search size={18} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search by title, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search books"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search text"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Genre Dropdown */}
        <div className="toolbar-select-group">
          <label htmlFor="filter-genre" className="toolbar-label">
            <Filter size={14} /> Genre:
          </label>
          <select
            id="filter-genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="toolbar-select"
          >
            <option value="All">All Genres</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="toolbar-select-group">
          <label htmlFor="sort-books" className="toolbar-label">
            <SlidersHorizontal size={14} /> Sort:
          </label>
          <select
            id="sort-books"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="toolbar-select"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title (A – Z)</option>
            <option value="rating">Highest Rated</option>
            <option value="progress">Reading Progress</option>
            <option value="pages">Page Count</option>
          </select>
        </div>

        {/* View Mode Toggle (Grid vs List) */}
        <div className="view-mode-toggle" role="group" aria-label="View layout mode">
          <button
            type="button"
            className={`toggle-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid view"
            aria-label="Grid view"
          >
            <Grid size={18} />
          </button>
          <button
            type="button"
            className={`toggle-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List view"
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Reading Status Filter Tabs */}
      <div className="status-tabs-nav" role="tablist">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selectedStatus === tab.value}
            className={`status-tab-btn ${selectedStatus === tab.value ? 'active' : ''}`}
            onClick={() => setSelectedStatus(tab.value)}
          >
            <span className="tab-label">{tab.label}</span>
            <span className="tab-counter">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="active-filters-bar">
          <span className="filter-summary-text">
            Showing <strong>{filteredBooks.length}</strong> of {books.length} books
          </span>

          <div className="active-tags-list">
            {searchQuery && (
              <span className="filter-chip">
                Search: "{searchQuery}"
                <button type="button" onClick={() => setSearchQuery('')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedGenre !== 'All' && (
              <span className="filter-chip">
                Genre: {selectedGenre}
                <button type="button" onClick={() => setSelectedGenre('All')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedStatus !== 'All' && (
              <span className="filter-chip">
                Status: {selectedStatus}
                <button type="button" onClick={() => setSelectedStatus('All')}>
                  <X size={12} />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-text btn-sm clear-all-btn"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Books Content */}
      <div className="bookshelf-content-area">
        <BookList
          books={filteredBooks}
          viewMode={viewMode}
          emptyTitle={books.length === 0 ? 'Your Bookshelf is Empty' : 'No matching books found'}
          emptyMessage={
            books.length === 0
              ? 'Get started by adding your first book to Readify!'
              : 'Try clearing your search query or choosing a different genre/status filter.'
          }
        />
      </div>
    </div>
  );
};

export default Bookshelf;
