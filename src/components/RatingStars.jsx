import React, { useState } from 'react';
import { Star } from 'lucide-react';

/**
 * UNIT II & III: RatingStars Component
 * Demonstrates reusable component with props, state, and event handling.
 * Can be used in 'interactive' mode (form input) or 'readOnly' mode (card/display).
 *
 * @param {number} rating - Current numerical rating (0 - 5)
 * @param {Function} onChange - Callback when rating changes (interactive mode)
 * @param {boolean} readOnly - Whether user can click to change rating
 * @param {number} maxStars - Total stars to show (default 5)
 * @param {string} size - Size in pixels ('sm', 'md', 'lg')
 */
export const RatingStars = ({
  rating = 0,
  onChange = null,
  readOnly = false,
  maxStars = 5,
  size = 'md'
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 24
  };

  const pixelSize = starSizes[size] || 18;

  const handleClick = (value) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readOnly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  return (
    <div
      className={`rating-stars-container ${readOnly ? 'read-only' : 'interactive'}`}
      onMouseLeave={handleMouseLeave}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = (hoverRating || rating) >= starValue;
        const isHalf = !isFilled && (hoverRating || rating) >= starValue - 0.5;

        return (
          <button
            type="button"
            key={starValue}
            disabled={readOnly}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            className={`star-button ${isFilled ? 'filled' : ''} ${isHalf ? 'half' : ''}`}
            aria-label={`${starValue} star`}
          >
            <Star
              size={pixelSize}
              className="star-icon"
              fill={isFilled ? '#D4A373' : isHalf ? 'url(#half-star)' : 'none'}
              stroke="#D4A373"
            />
          </button>
        );
      })}
      {rating > 0 && (
        <span className="rating-numeric-label">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
