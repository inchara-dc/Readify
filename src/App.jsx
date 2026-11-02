import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useBookContext } from './context/BookContext';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Toast from './components/Toast';

// Pages
import Dashboard from './pages/Dashboard';
import Bookshelf from './pages/Bookshelf';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import ReadingGoals from './pages/ReadingGoals';
import Statistics from './pages/Statistics';
import About from './pages/About';
import NotFound from './pages/NotFound';

/**
 * UNIT II & IV: Root Application Component
 * Sets up the application layout shell (Sidebar + Navbar + Content Area),
 * responsive mobile navigation state, and React Router routes.
 */
function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { toast, clearToast } = useBookContext();

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="readify-app-layout">
      {/* Toast Notification Banner */}
      <Toast toast={toast} onClose={clearToast} />

      {/* Persistent Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      {/* Main Content Area */}
      <div className="readify-main-container">
        {/* Top Header Navbar */}
        <Navbar onToggleSidebar={toggleMobileSidebar} />

        {/* Page Content Body */}
        <main className="readify-content-body">
          {/* UNIT IV: React Router v6 Routes and Route */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Bookshelf />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/goals" element={<ReadingGoals />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
