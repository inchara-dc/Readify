import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Bookmark,
  TrendingUp,
  PlusCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { calculateComprehensiveStats, READING_STATUS } from '../utils/bookUtils';
import StatisticsCard from '../components/StatisticsCard';
import ReadingGoal from '../components/ReadingGoal';
import ProgressBar from '../components/ProgressBar';
import BookCard from '../components/BookCard';

/**
 * UNIT I, II & IV: Dashboard Page
 * Main portal presenting live dynamic statistics, active reading progress,
 * annual goals, and recent shelf additions.
 */
export const Dashboard = () => {
  const { books, yearlyGoal } = useBookContext();

  // UNIT V: useMemo to recalculate comprehensive stats only when books or goal change
  const stats = useMemo(() => {
    return calculateComprehensiveStats(books, yearlyGoal);
  }, [books, yearlyGoal]);

  // Active currently reading books
  const currentlyReadingBooks = useMemo(() => {
    return books.filter((b) => b.status === READING_STATUS.CURRENTLY_READING);
  }, [books]);

  // Recently added books (top 3)
  const recentlyAddedBooks = useMemo(() => {
    return [...books]
      .sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0))
      .slice(0, 3);
  }, [books]);

  return (
    <div className="dashboard-page animate-fade-in">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-tag">
            <Sparkles size={14} /> Welcome to your personal library
          </div>
          <h1 className="welcome-title">
            Keep expanding your horizons, one page at a time.
          </h1>
          <p className="welcome-subtext">
            You currently have <strong>{stats.readingCount}</strong> active {stats.readingCount === 1 ? 'read' : 'reads'} and have finished <strong>{stats.completedCount}</strong> of your <strong>{stats.goal.target}</strong> book yearly target.
          </p>

          <div className="welcome-actions">
            <Link to="/add-book" className="btn btn-primary">
              <PlusCircle size={17} /> Add New Book
            </Link>
            <Link to="/books" className="btn btn-outline">
              Explore Bookshelf <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="welcome-overall-meter">
          <div className="meter-header">
            <span className="meter-label">Total Catalog Read Progress</span>
            <span className="meter-value">{stats.overallProgress}%</span>
          </div>
          <ProgressBar value={stats.totalPagesRead} max={stats.totalPagesOverall} size="md" />
          <div className="meter-footer">
            <span>{stats.totalPagesRead.toLocaleString()} pages read</span>
            <span>{stats.totalPagesOverall.toLocaleString()} total pages</span>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Cards Grid */}
      <section className="stats-cards-grid" aria-label="Reading Statistics">
        <StatisticsCard
          title="Total Books"
          value={stats.totalBooks}
          subtitle="In your digital collection"
          icon={BookOpen}
          variant="primary"
        />

        <StatisticsCard
          title="Currently Reading"
          value={stats.readingCount}
          subtitle="Books actively in progress"
          icon={Clock}
          variant="terracotta"
          badgeText="Active"
        />

        <StatisticsCard
          title="Completed"
          value={stats.completedCount}
          subtitle="Successfully finished"
          icon={CheckCircle}
          variant="success"
          badgeText={`${stats.goal.percent}% of goal`}
        />

        <StatisticsCard
          title="Want to Read"
          value={stats.wantToReadCount}
          subtitle="Waiting on your wishlist"
          icon={Bookmark}
          variant="gold"
        />
      </section>

      {/* Main Grid: Reading Goal + Currently Reading */}
      <div className="dashboard-layout-columns">
        {/* Left Column: Annual Reading Challenge */}
        <div className="dashboard-col-left">
          <ReadingGoal showEdit={true} />
        </div>

        {/* Right Column: Currently Reading Spotlight */}
        <div className="dashboard-col-right">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Currently Reading</h2>
              <p className="section-subheading">
                Jump straight back into your ongoing books
              </p>
            </div>
            <Link to="/books?status=Currently+Reading" className="section-link">
              View All ({currentlyReadingBooks.length})
            </Link>
          </div>

          {currentlyReadingBooks.length === 0 ? (
            <div className="empty-spotlight-card">
              <Clock size={32} className="empty-spotlight-icon" />
              <h4>No books currently in progress</h4>
              <p>Pick a book from your wishlist and start reading today!</p>
              <Link to="/books" className="btn btn-outline btn-sm">
                Browse Bookshelf
              </Link>
            </div>
          ) : (
            <div className="currently-reading-spotlight-list">
              {currentlyReadingBooks.slice(0, 2).map((book) => (
                <BookCard key={book.id} book={book} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recently Added Books Section */}
      <section className="recently-added-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-heading">Recently Added to Bookshelf</h2>
            <p className="section-subheading">
              Latest additions to your personal catalog
            </p>
          </div>
          <Link to="/books" className="section-link">
            See Complete Shelf <ArrowRight size={14} />
          </Link>
        </div>

        <div className="recent-books-grid">
          {recentlyAddedBooks.map((book) => (
            <BookCard key={book.id} book={book} viewMode="grid" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
