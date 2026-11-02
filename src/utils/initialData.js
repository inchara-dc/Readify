import { READING_STATUS } from './bookUtils';

/**
 * Initial sample dataset for Readify.
 * Seeded automatically into LocalStorage if no previous user data exists.
 */
export const INITIAL_BOOKS = [
  {
    id: 'book-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help & Personal Growth',
    totalPages: 320,
    currentPage: 320,
    status: READING_STATUS.COMPLETED,
    rating: 5,
    review: 'An exceptional framework on habit formation. The 1% improvement rule and environmental cues radically shifted my daily writing routine.',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-01-15T09:30:00.000Z',
    notes: 'Key takeaway: You do not rise to the level of your goals, you fall to the level of your systems.'
  },
  {
    id: 'book-2',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    totalPages: 688,
    currentPage: 412,
    status: READING_STATUS.CURRENTLY_READING,
    rating: 5,
    review: 'Masterful worldbuilding and political intrigue on Arrakis. Frank Herbert created a profound ecosystem and spiritual mythos.',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-02-01T14:15:00.000Z',
    notes: 'Currently in Book Two: Muad\'Dib. Paul and Jessica adapting to Fremen culture in the deep desert.'
  },
  {
    id: 'book-3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    totalPages: 180,
    currentPage: 180,
    status: READING_STATUS.COMPLETED,
    rating: 4.5,
    review: 'A lyrical, haunting indictment of the American Dream in the Roaring Twenties. The prose glows with decadence and longing.',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-02-20T11:00:00.000Z',
    notes: 'The green light at the end of Daisy\'s dock remains one of literature\'s most enduring symbols.'
  },
  {
    id: 'book-4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    totalPages: 496,
    currentPage: 210,
    status: READING_STATUS.CURRENTLY_READING,
    rating: 4.5,
    review: 'Incredible blend of hard science problem solving, heart, and humor. Ryland Grace is a delightful protagonist.',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-03-05T16:45:00.000Z',
    notes: 'Amaze! Rocky is one of the best characters created in modern science fiction.'
  },
  {
    id: 'book-5',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    totalPages: 336,
    currentPage: 0,
    status: READING_STATUS.WANT_TO_READ,
    rating: 5,
    review: 'Re-reading scheduled for winter. Atticus Finch’s lessons on empathy remain timeless.',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-03-12T10:20:00.000Z',
    notes: 'Planning to read alongside a reading club discussion.'
  },
  {
    id: 'book-6',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Philosophy & Psychology',
    totalPages: 499,
    currentPage: 150,
    status: READING_STATUS.CURRENTLY_READING,
    rating: 4,
    review: 'A brilliant exploration of cognitive biases, System 1 intuitive thinking versus System 2 deliberate logic.',
    coverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-03-18T13:00:00.000Z',
    notes: 'Focusing on loss aversion and heuristics in decision making.'
  },
  {
    id: 'book-7',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    totalPages: 304,
    currentPage: 304,
    status: READING_STATUS.COMPLETED,
    rating: 4,
    review: 'A comforting philosophical tale on regret, infinite potential lives, and finding peace with the life you are living.',
    coverUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-04-02T18:00:00.000Z',
    notes: 'Between life and death there is a library, and within that library, the shelves go on forever.'
  },
  {
    id: 'book-8',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    genre: 'Fiction',
    totalPages: 303,
    currentPage: 0,
    status: READING_STATUS.WANT_TO_READ,
    rating: 4.5,
    review: 'Heard glowing praise about Ishiguro’s tender depiction of artificial friendship and human loneliness.',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80',
    dateAdded: '2024-04-10T08:15:00.000Z',
    notes: 'Recommended by favorite literature professor.'
  }
];

export const INITIAL_YEARLY_GOAL = 12;
export const CURRENT_YEAR = new Date().getFullYear();
