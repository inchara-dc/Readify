import React, { useState } from 'react';
import { Target, Award, Edit3, CheckCircle2, TrendingUp } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import Modal from './Modal';

/**
 * UNIT II & III: ReadingGoal Component
 * Displays yearly target progress, remaining books calculation,
 * and allows users to update their reading target.
 *
 * @param {boolean} compact - Compact layout mode for widgets
 * @param {boolean} showEdit - Whether to allow editing the goal directly
 */
export const ReadingGoal = ({ compact = false, showEdit = true }) => {
  const { books, yearlyGoal, updateGoal } = useBookContext();
  const [isEditing, setIsEditing] = useState(false);
  const [goalInput, setGoalInput] = useState(yearlyGoal);

  const completedBooks = books.filter((b) => b.status === 'Completed').length;
  const target = Math.max(1, Number(yearlyGoal) || 1);
  const percentage = Math.min(100, Math.round((completedBooks / target) * 100));
  const remaining = Math.max(0, target - completedBooks);
  const isGoalReached = completedBooks >= target;

  const handleOpenEdit = () => {
    setGoalInput(target);
    setIsEditing(true);
  };

  const handleSaveGoal = (e) => {
    e.preventDefault();
    const newTarget = parseInt(goalInput, 10);
    if (!isNaN(newTarget) && newTarget > 0) {
      updateGoal(newTarget);
      setIsEditing(false);
    }
  };

  // Circular progress calculations for SVG
  const radius = compact ? 38 : 56;
  const stroke = compact ? 6 : 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (compact) {
    return (
      <div className="reading-goal-compact-card">
        <div className="compact-goal-header">
          <div className="compact-goal-icon">
            <Target size={16} />
          </div>
          <span className="compact-goal-label">Annual Goal</span>
          {showEdit && (
            <button
              type="button"
              className="compact-edit-btn"
              onClick={handleOpenEdit}
              title="Edit reading goal"
              aria-label="Edit reading goal"
            >
              <Edit3 size={13} />
            </button>
          )}
        </div>

        <div className="compact-goal-body">
          <div className="compact-goal-stats">
            <div className="compact-goal-numbers">
              <span className="compact-completed">{completedBooks}</span>
              <span className="compact-divider">/</span>
              <span className="compact-target">{target}</span>
            </div>
            <span className="compact-subtext">
              {isGoalReached ? 'Target Reached!' : `${remaining} to go`}
            </span>
          </div>

          <div className="compact-progress-mini">
            <div
              className="compact-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Modal for adjusting goal */}
        <Modal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          title="Update Annual Reading Goal"
          subtitle="Set how many books you wish to read this year."
        >
          <form onSubmit={handleSaveGoal} className="goal-edit-form">
            <div className="form-group">
              <label htmlFor="compact-goal-target" className="form-label">
                Target Number of Books
              </label>
              <input
                id="compact-goal-target"
                type="number"
                min="1"
                max="500"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Target
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  return (
    <div className={`reading-goal-card ${isGoalReached ? 'goal-achieved' : ''}`}>
      <div className="goal-card-header">
        <div className="goal-title-group">
          <div className="goal-icon-badge">
            {isGoalReached ? <Award size={20} /> : <Target size={20} />}
          </div>
          <div>
            <h3 className="goal-title">Annual Reading Target</h3>
            <p className="goal-subtitle">
              {new Date().getFullYear()} Reading Challenge
            </p>
          </div>
        </div>

        {showEdit && (
          <button
            type="button"
            className="btn btn-outline btn-sm goal-edit-action"
            onClick={handleOpenEdit}
          >
            <Edit3 size={14} />
            <span>Edit Target</span>
          </button>
        )}
      </div>

      <div className="goal-card-content">
        <div className="goal-chart-container">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="goal-circular-chart"
          >
            {/* Background Track Circle */}
            <circle
              stroke="var(--color-border, #E8DFD8)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Active Progress Circle */}
            <circle
              stroke={isGoalReached ? 'var(--color-success, #4B7B5E)' : 'var(--color-accent, #C86D51)'}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.6s ease' }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="goal-chart-label">
            <span className="goal-chart-percent">{percentage}%</span>
            <span className="goal-chart-status">
              {isGoalReached ? 'Done' : 'Progress'}
            </span>
          </div>
        </div>

        <div className="goal-details-info">
          <div className="goal-stat-item">
            <span className="goal-stat-label">Books Completed</span>
            <span className="goal-stat-value completed">{completedBooks}</span>
          </div>
          <div className="goal-stat-item">
            <span className="goal-stat-label">Yearly Target</span>
            <span className="goal-stat-value">{target}</span>
          </div>
          <div className="goal-stat-item">
            <span className="goal-stat-label">Remaining Books</span>
            <span className="goal-stat-value remaining">{remaining}</span>
          </div>

          <div className="goal-status-banner">
            {isGoalReached ? (
              <span className="goal-tag achieved">
                <CheckCircle2 size={15} /> Goal Completed! Outstanding milestone!
              </span>
            ) : percentage >= 50 ? (
              <span className="goal-tag on-track">
                <TrendingUp size={15} /> Over halfway there! Keep turning pages!
              </span>
            ) : (
              <span className="goal-tag in-progress">
                <Target size={15} /> {remaining} more books to reach your annual goal
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Target Adjustment Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Reading Goal"
        subtitle={`Adjust your reading target for ${new Date().getFullYear()}.`}
      >
        <form onSubmit={handleSaveGoal} className="goal-edit-form">
          <div className="form-group">
            <label htmlFor="goal-target-input" className="form-label">
              Total Books to Read This Year
            </label>
            <input
              id="goal-target-input"
              type="number"
              min="1"
              max="500"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="form-input"
              required
            />
            <small className="form-hint">
              Currently completed: {completedBooks} {completedBooks === 1 ? 'book' : 'books'}
            </small>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save New Goal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReadingGoal;
