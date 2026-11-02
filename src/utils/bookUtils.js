/**
 * Utility functions for Readify application
 * Demonstrates clean JavaScript helper logic, functional data transformations,
 * and robust progress/status calculations.
 */

export const READING_STATUS = {
  WANT_TO_READ: 'Want to Read',
  CURRENTLY_READING: 'Currently Reading',
  COMPLETED: 'Completed'
};

export const GENRES = [
  'Fiction',
  'Classic',
  'Science Fiction',
  'Fantasy',
  'Non-Fiction',
  'Mystery & Thriller',
  'Biography & Memoir',
  'Self-Help & Personal Growth',
  'Philosophy & Psychology',
  'History'
];

export const PRESET_COVERS = [
  {
    name: 'Warm Leather Journal',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Minimalist Editorial',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Vintage Open Pages',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Celestial Night Sky',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Antique Library Stack',
    url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Earthy Botanical',
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80'
  }
];

/**
 * Calculates reading progress percentage: (current / total) * 100
 * Clamped between 0 and 100.
 */
export const calculateProgress = (currentPage, totalPages) => {
  const current = Number(currentPage) || 0;
  const total = Number(totalPages) || 0;
  if (total <= 0) return 0;
  if (current >= total) return 100;
  return Math.round((current / total) * 100);
};

/**
 * Automatically adjusts status based on current and total pages:
 * - If current == total, returns 'Completed'
 * - If current > 0 and current < total and was 'Want to Read', transitions to 'Currently Reading'
 * - If current == 0 and was 'Completed', transitions to 'Want to Read'
 */
export const autoResolveStatus = (currentPage, totalPages, currentStatus) => {
  const current = Number(currentPage) || 0;
  const total = Number(totalPages) || 0;

  if (total > 0 && current >= total) {
    return READING_STATUS.COMPLETED;
  }
  if (current > 0 && current < total && currentStatus === READING_STATUS.WANT_TO_READ) {
    return READING_STATUS.CURRENTLY_READING;
  }
  if (current === 0 && currentStatus === READING_STATUS.COMPLETED) {
    return READING_STATUS.WANT_TO_READ;
  }
  return currentStatus || READING_STATUS.WANT_TO_READ;
};

/**
 * Format ISO date string into readable English date (e.g., 'Oct 24, 2024')
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Recently';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Recently';
  }
};

/**
 * Filter and sort books based on query, genre, status, and sort option
 */
export const filterAndSortBooks = (books, { search = '', genre = 'All', status = 'All', sortBy = 'recent' }) => {
  if (!Array.isArray(books)) return [];

  return books
    .filter((book) => {
      // Search matching (Title or Author)
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        (book.title && book.title.toLowerCase().includes(q)) ||
        (book.author && book.author.toLowerCase().includes(q));

      // Genre filter
      const matchesGenre = genre === 'All' || book.genre === genre;

      // Status filter
      const matchesStatus = status === 'All' || book.status === status;

      return matchesSearch && matchesGenre && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'rating') {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      }
      if (sortBy === 'pages') {
        return (Number(b.totalPages) || 0) - (Number(a.totalPages) || 0);
      }
      if (sortBy === 'progress') {
        const progA = calculateProgress(a.currentPage, a.totalPages);
        const progB = calculateProgress(b.currentPage, b.totalPages);
        return progB - progA;
      }
      // Default: recent (newest dateAdded or highest id)
      const dateA = new Date(a.dateAdded || 0).getTime();
      const dateB = new Date(b.dateAdded || 0).getTime();
      return dateB - dateA;
    });
};

/**
 * Generate comprehensive statistics from user's bookshelf
 */
export const calculateComprehensiveStats = (books = [], yearlyGoal = 12) => {
  const totalBooks = books.length;
  const completedBooks = books.filter((b) => b.status === READING_STATUS.COMPLETED);
  const readingBooks = books.filter((b) => b.status === READING_STATUS.CURRENTLY_READING);
  const wantToReadBooks = books.filter((b) => b.status === READING_STATUS.WANT_TO_READ);

  const totalPagesRead = books.reduce((sum, b) => {
    const current = Math.min(Number(b.currentPage) || 0, Number(b.totalPages) || 0);
    return sum + current;
  }, 0);

  const totalPagesOverall = books.reduce((sum, b) => sum + (Number(b.totalPages) || 0), 0);

  const overallProgress =
    totalPagesOverall > 0 ? Math.round((totalPagesRead / totalPagesOverall) * 100) : 0;

  // Average Rating
  const ratedBooks = books.filter((b) => Number(b.rating) > 0);
  const averageRating =
    ratedBooks.length > 0
      ? (ratedBooks.reduce((sum, b) => sum + Number(b.rating), 0) / ratedBooks.length).toFixed(1)
      : '0.0';

  // Genre breakdown
  const genreCounts = {};
  books.forEach((b) => {
    const g = b.genre || 'Uncategorized';
    genreCounts[g] = (genreCounts[g] || 0) + 1;
  });

  const genreDistribution = Object.entries(genreCounts)
    .map(([genre, count]) => ({
      genre,
      count,
      percentage: totalBooks > 0 ? Math.round((count / totalBooks) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);

  // Status breakdown
  const statusDistribution = [
    {
      status: READING_STATUS.COMPLETED,
      count: completedBooks.length,
      percentage: totalBooks > 0 ? Math.round((completedBooks.length / totalBooks) * 100) : 0,
      color: '#4B7B5E' // Forest sage green
    },
    {
      status: READING_STATUS.CURRENTLY_READING,
      count: readingBooks.length,
      percentage: totalBooks > 0 ? Math.round((readingBooks.length / totalBooks) * 100) : 0,
      color: '#C86D51' // Terracotta accent
    },
    {
      status: READING_STATUS.WANT_TO_READ,
      count: wantToReadBooks.length,
      percentage: totalBooks > 0 ? Math.round((wantToReadBooks.length / totalBooks) * 100) : 0,
      color: '#B08968' // Muted warm sand
    }
  ];

  // Reading Goal calculation
  const goalTarget = Math.max(Number(yearlyGoal) || 1, 1);
  const goalCompleted = completedBooks.length;
  const goalPercent = Math.min(Math.round((goalCompleted / goalTarget) * 100), 100);
  const goalRemaining = Math.max(goalTarget - goalCompleted, 0);

  return {
    totalBooks,
    completedCount: completedBooks.length,
    readingCount: readingBooks.length,
    wantToReadCount: wantToReadBooks.length,
    totalPagesRead,
    totalPagesOverall,
    overallProgress,
    averageRating,
    genreDistribution,
    statusDistribution,
    goal: {
      target: goalTarget,
      completed: goalCompleted,
      percent: goalPercent,
      remaining: goalRemaining,
      isAchieved: goalCompleted >= goalTarget
    }
  };
};
