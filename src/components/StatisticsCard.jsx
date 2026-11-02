import React from 'react';

/**
 * UNIT II: StatisticsCard Component
 * Reusable metric card displaying KPI numbers, icons, and trend indicators.
 *
 * @param {string} title - Label for the statistic (e.g., 'Total Books')
 * @param {string|number} value - The numerical value or metric
 * @param {string} subtitle - Secondary description or context
 * @param {React.ComponentType} icon - Lucide icon component
 * @param {string} variant - Theme accent ('primary', 'success', 'terracotta', 'gold')
 * @param {string} badgeText - Optional pill text (e.g. '+2 this month')
 * @param {Function} onClick - Optional click handler for drilldown
 */
export const StatisticsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'primary',
  badgeText = null,
  onClick = null
}) => {
  return (
    <div
      className={`stat-card stat-${variant} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stat-card-top">
        <div className="stat-icon-wrapper">
          {Icon && <Icon size={22} className="stat-icon" />}
        </div>
        {badgeText && <span className="stat-badge">{badgeText}</span>}
      </div>

      <div className="stat-card-bottom">
        <span className="stat-value">{value}</span>
        <h4 className="stat-title">{title}</h4>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatisticsCard;
