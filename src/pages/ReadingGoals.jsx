import React, { useState, useMemo } from 'react';
import {
  Target,
  Award,
  CheckCircle,
  TrendingUp,
  Flame,
  Calendar,
  BookOpen,
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { READING_STATUS } from '../utils/bookUtils';
import ReadingGoal from '../components/ReadingGoal';
import ProgressBar from '../components/ProgressBar';
import RatingStars from '../components/RatingStars';
import { Link } from 'react-router-dom';

/**
 * UNIT I, II & III: ReadingGoals Page
 * Interactive challenge center for annual reading targets, milestone badges,
 * pacing analytics, and completed celebration showcase.
 */
export const ReadingGoals = () => {
  const { books, yearlyGoal, updateGoal } = useBookContext();
  const [customGoalInput, setCustomGoalInput] = useState(yearlyGoal);

  const completedBooks = useMemo(() => {
    return books.filter((b) => b.status === READING_STATUS.COMPLETED);
  }, [books]);

  const target = Math.max(1, Number(yearlyGoal) || 1);
  const completedCount = completedBooks.length;
  const percentage = Math.min(100, Math.round((completedCount / target) * 100));
  const remaining = Math.max(0, target - completedCount);
  const isGoalAchieved = completedCount >= target;

  // Monthly pace calculations
  const currentMonthIndex = new Date().getMonth() + 1; // 1 to 12
  const expectedPaceSoFar = Math.round((target / 12) * currentMonthIndex);
  const isPaceAhead = completedCount >= expectedPaceSoFar;

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    const parsed = parseInt(customGoalInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      updateGoal(parsed);
    }
  };

  // Milestone badges list
  const milestones = [
    {
      title: 'First Step',
      desc: 'Complete 1 book',
      reached: completedCount >= 1,
      icon: BookOpen
    },
    {
      title: 'Habit Builder',
      desc: 'Complete 5 books',
      reached: completedCount >= 5,
      icon: Flame
    },
    {
      title: 'Double Digits',
      desc: 'Complete 10 books',
      reached: completedCount >= 10,
      icon: Award
    },
    {
      title: 'Annual Champion',
      desc: `Reach full goal (${target} books)`,
      reached: isGoalAchieved,
      icon: Trophy
    }
  ];

  return (
    <div className="reading-goals-page animate-fade-in">
      <div className="goals-hero-banner">
        <div className="hero-banner-content">
          <div className="banner-tag">
            <Sparkles size={14} /> {new Date().getFullYear()} Annual Reading Challenge
          </div>
          <h1 className="banner-title">Turn Reading Into a Daily Ritual</h1>
          <p className="banner-subtext">
            Setting intentional goals fosters focus and consistency. Track every completed title on your journey.
          </p>
        </div>

        {/* Quick Goal Setting Widget */}
        <div className="hero-goal-quickset">
          <form onSubmit={handleGoalSubmit} className="quick-goal-form">
            <label htmlFor="yearly-target-input" className="quick-goal-label">
              <Target size={16} /> Set Annual Goal:
            </label>
            <div className="quick-goal-input-row">
              <input
                id="yearly-target-input"
                type="number"
                min="1"
                max="365"
                value={customGoalInput}
                onChange={(e) => setCustomGoalInput(e.target.value)}
                className="form-input text-center"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Update
              </button>
            </div>
            <span className="quick-goal-hint">
              Target: {target} books in {new Date().getFullYear()}
            </span>
          </form>
        </div>
      </div>

      {/* Main Reading Goal Component */}
      <div className="goals-main-component-wrapper">
        <ReadingGoal showEdit={true} />
      </div>

      {/* Milestone Badges & Pacing Grid */}
      <div className="goals-analytics-grid">
        {/* Pacing Insights Card */}
        <div className="goals-card pacing-card">
          <div className="goals-card-header">
            <div className="goals-card-icon">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="goals-card-title">Reading Pace & Momentum</h3>
              <p className="goals-card-subtitle">Month {currentMonthIndex} of 12</p>
            </div>
          </div>

          <div className="pacing-metrics-list">
            <div className="pacing-metric-item">
              <span className="pacing-label">Completed to Date:</span>
              <span className="pacing-value">{completedCount} books</span>
            </div>
            <div className="pacing-metric-item">
              <span className="pacing-label">Pace Benchmark:</span>
              <span className="pacing-value">{expectedPaceSoFar} books</span>
            </div>
            <div className="pacing-metric-item">
              <span className="pacing-label">Pace Status:</span>
              <span className={`pacing-status-pill ${isPaceAhead ? 'ahead' : 'behind'}`}>
                {isPaceAhead ? 'Ahead of Schedule 🔥' : 'Slightly behind pace'}
              </span>
            </div>
          </div>

          <div className="pacing-footer-note">
            <p>
              To complete all {target} books by December 31, read approximately{' '}
              <strong>
                {Math.max(1, Math.round(remaining / Math.max(1, 12 - currentMonthIndex + 1)))}{' '}
                {remaining === 1 ? 'book' : 'books'} per month
              </strong>.
            </p>
          </div>
        </div>

        {/* Milestone Badges Showcase */}
        <div className="goals-card milestones-card">
          <div className="goals-card-header">
            <div className="goals-card-icon">
              <Award size={20} />
            </div>
            <div>
              <h3 className="goals-card-title">Reading Milestones</h3>
              <p className="goals-card-subtitle">Unlock achievements as you read</p>
            </div>
          </div>

          <div className="milestones-grid">
            {milestones.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className={`milestone-badge-box ${m.reached ? 'unlocked' : 'locked'}`}
                >
                  <div className="milestone-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="milestone-text">
                    <span className="milestone-name">{m.title}</span>
                    <span className="milestone-desc">{m.desc}</span>
                  </div>
                  <span className="milestone-status">
                    {m.reached ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completed Books Showcase Toward Goal */}
      <section className="completed-challenge-showcase">
        <div className="section-header-row">
          <div>
            <h2 className="section-heading">Completed Books This Year</h2>
            <p className="section-subheading">
              {completedCount} titles counted toward your {target}-book goal
            </p>
          </div>
          <Link to="/books?status=Completed" className="section-link">
            Filter Shelf <ArrowRight size={14} />
          </Link>
        </div>

        {completedBooks.length === 0 ? (
          <div className="empty-goal-list-card">
            <BookOpen size={32} />
            <p>No books completed yet. Log your first finished book to light up your challenge!</p>
            <Link to="/books" className="btn btn-outline btn-sm">
              Explore Wishlist
            </Link>
          </div>
        ) : (
          <div className="completed-books-mini-grid">
            {completedBooks.map((book) => (
              <div key={book.id} className="completed-mini-card">
                <img
                  src={book.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                  alt={book.title}
                  className="completed-mini-cover"
                />
                <div className="completed-mini-info">
                  <span className="completed-mini-genre">{book.genre}</span>
                  <Link to={`/book/${book.id}`} className="completed-mini-title">
                    {book.title}
                  </Link>
                  <span className="completed-mini-author">by {book.author}</span>
                  <RatingStars rating={book.rating} readOnly size="sm" />
                </div>
                <div className="completed-check-icon">
                  <CheckCircle size={18} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReadingGoals;
