import React from 'react';
import { BookOpen } from 'lucide-react';

/**
 * UNIT II: Reusable EmptyState Component
 * Displays a warm illustration/icon and guidance when no items exist.
 */
export const EmptyState = ({
  icon: Icon = BookOpen,
  title = 'No books found',
  description = 'Try adjusting your search criteria or add a new book to your library.',
  action = null
}) => {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon-box">
        <Icon size={36} className="empty-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
