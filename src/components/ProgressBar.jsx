import React from 'react';

/**
 * UNIT II: ProgressBar Component
 * Reusable visual indicator for reading and goal progress.
 *
 * @param {number} value - Current value (e.g., current pages)
 * @param {number} max - Maximum value (e.g., total pages)
 * @param {boolean} showLabel - Whether to display text percentage
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} color - Optional custom CSS color
 */
export const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = true,
  size = 'md',
  color = null,
  labelSuffix = '%'
}) => {
  const current = Math.max(0, Number(value) || 0);
  const total = Math.max(1, Number(max) || 1);
  const percentage = Math.min(100, Math.round((current / total) * 100));

  // Determine progress bar track color based on completion status if not provided
  const getFillColor = () => {
    if (color) return color;
    if (percentage >= 100) return 'var(--color-success, #4B7B5E)';
    if (percentage > 50) return 'var(--color-primary, #8C5338)';
    return 'var(--color-accent, #C86D51)';
  };

  return (
    <div className={`progress-bar-wrapper progress-${size}`}>
      <div
        className="progress-bar-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: getFillColor()
          }}
        />
      </div>
      {showLabel && (
        <span className="progress-bar-label">
          {percentage}{labelSuffix}
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
