import React, { useMemo } from 'react';
import {
  BarChart3,
  PieChart,
  BookOpen,
  Star,
  CheckCircle,
  TrendingUp,
  Bookmark,
  Layers,
  Sparkles
} from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { calculateComprehensiveStats } from '../utils/bookUtils';
import StatisticsCard from '../components/StatisticsCard';
import ProgressBar from '../components/ProgressBar';

/**
 * UNIT I, II & V: Statistics Page
 * Provides visual analytics and metrics derived from live LocalStorage data.
 * Features:
 * - Genre distribution breakdown with responsive visual progress bars
 * - Reading status distribution
 * - Page analytics and catalog completion rates
 * - Average ratings and top performing titles
 */
export const Statistics = () => {
  const { books, yearlyGoal } = useBookContext();

  const stats = useMemo(() => {
    return calculateComprehensiveStats(books, yearlyGoal);
  }, [books, yearlyGoal]);

  // Find top rated book
  const topRatedBook = useMemo(() => {
    if (books.length === 0) return null;
    return [...books].sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))[0];
  }, [books]);

  // Find top genre
  const topGenre = stats.genreDistribution.length > 0 ? stats.genreDistribution[0] : null;

  return (
    <div className="statistics-page animate-fade-in">
      <div className="stats-header-box">
        <div className="stats-header-icon">
          <BarChart3 size={26} />
        </div>
        <div>
          <h1 className="page-heading">Reading Analytics & Insights</h1>
          <p className="page-subheading">
            Quantitative analysis of your reading patterns, literary genres, and page completions.
          </p>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <section className="stats-metric-cards-grid">
        <StatisticsCard
          title="Books Read"
          value={stats.completedCount}
          subtitle={`Out of ${stats.totalBooks} total books in shelf`}
          icon={CheckCircle}
          variant="success"
        />

        <StatisticsCard
          title="Total Pages Logged"
          value={stats.totalPagesRead.toLocaleString()}
          subtitle={`Across ${stats.totalBooks} catalogued volumes`}
          icon={BookOpen}
          variant="primary"
        />

        <StatisticsCard
          title="Average Rating"
          value={`${stats.averageRating} ★`}
          subtitle="Based on books rated so far"
          icon={Star}
          variant="gold"
        />

        <StatisticsCard
          title="Catalog Completion"
          value={`${stats.overallProgress}%`}
          subtitle="Total pages read / total pages"
          icon={TrendingUp}
          variant="terracotta"
        />
      </section>

      {/* Detailed Analytics Grid */}
      <div className="stats-charts-layout">
        {/* Genre Distribution Card */}
        <div className="chart-card genre-breakdown-card">
          <div className="chart-card-header">
            <div className="chart-header-title-group">
              <Layers size={18} className="chart-icon" />
              <div>
                <h3 className="chart-title">Genre Distribution</h3>
                <p className="chart-subtitle">Breakdown of books by literary category</p>
              </div>
            </div>
          </div>

          <div className="genre-bars-list">
            {stats.genreDistribution.length === 0 ? (
              <p className="chart-empty-msg">No books to analyze yet.</p>
            ) : (
              stats.genreDistribution.map((item) => (
                <div key={item.genre} className="genre-bar-item">
                  <div className="genre-bar-labels">
                    <span className="genre-name">{item.genre}</span>
                    <span className="genre-count">
                      <strong>{item.count}</strong> {item.count === 1 ? 'book' : 'books'} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="genre-bar-track">
                    <div
                      className="genre-bar-fill"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reading Status Distribution Card */}
        <div className="chart-card status-breakdown-card">
          <div className="chart-card-header">
            <div className="chart-header-title-group">
              <PieChart size={18} className="chart-icon" />
              <div>
                <h3 className="chart-title">Reading Status Distribution</h3>
                <p className="chart-subtitle">Allocation across reading phases</p>
              </div>
            </div>
          </div>

          <div className="status-bars-list">
            {stats.statusDistribution.map((item) => (
              <div key={item.status} className="status-item-row">
                <div className="status-item-left">
                  <span
                    className="status-color-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="status-item-name">{item.status}</span>
                </div>
                <div className="status-item-right">
                  <span className="status-item-count">
                    {item.count} {item.count === 1 ? 'book' : 'books'}
                  </span>
                  <span className="status-item-percent">{item.percentage}%</span>
                </div>
                <div className="status-item-bar-track">
                  <div
                    className="status-item-bar-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Highlights Box */}
          <div className="analytics-highlights-box">
            <div className="highlight-item">
              <span className="highlight-label">Favorite Genre:</span>
              <span className="highlight-value">
                {topGenre ? `${topGenre.genre} (${topGenre.count} books)` : 'N/A'}
              </span>
            </div>

            <div className="highlight-item">
              <span className="highlight-label">Highest Rated:</span>
              <span className="highlight-value">
                {topRatedBook ? `${topRatedBook.title} (${topRatedBook.rating} ★)` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Completion Velocity Card */}
      <section className="chart-card catalog-pages-card">
        <div className="chart-card-header">
          <div className="chart-header-title-group">
            <Sparkles size={18} className="chart-icon" />
            <div>
              <h3 className="chart-title">Volume & Pages Overview</h3>
              <p className="chart-subtitle">
                Cumulative progress across your entire catalog collection
              </p>
            </div>
          </div>
        </div>

        <div className="pages-overview-body">
          <div className="pages-big-numbers">
            <div className="page-metric-unit">
              <span className="metric-num read">{stats.totalPagesRead.toLocaleString()}</span>
              <span className="metric-label">Pages Completed</span>
            </div>
            <div className="page-metric-divider">/</div>
            <div className="page-metric-unit">
              <span className="metric-num total">{stats.totalPagesOverall.toLocaleString()}</span>
              <span className="metric-label">Total Pages in Library</span>
            </div>
            <div className="page-metric-divider">=</div>
            <div className="page-metric-unit">
              <span className="metric-num percent">{stats.overallProgress}%</span>
              <span className="metric-label">Library Finished</span>
            </div>
          </div>

          <ProgressBar
            value={stats.totalPagesRead}
            max={stats.totalPagesOverall}
            size="lg"
            color="var(--color-primary, #8C5338)"
          />
        </div>
      </section>
    </div>
  );
};

export default Statistics;
