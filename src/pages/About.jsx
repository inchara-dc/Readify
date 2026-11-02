import React from 'react';
import {
  BookOpen,
  Code2,
  Layers,
  Sparkles,
  Cpu,
  BookMarked,
  Target,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

/**
 * About Page Component
 * Describes Readify's purpose, design philosophy, architecture,
 * and key user features.
 */
export const About = () => {
  return (
    <div className="about-page animate-fade-in">
      {/* Hero Section */}
      <div className="about-hero-card">
        <div className="about-hero-badge">
          <Sparkles size={14} /> Personal Digital Bookshelf
        </div>
        <h1 className="about-hero-title">
          Readify – Your Personal Reading Companion
        </h1>
        <p className="about-hero-description">
          Readify is a modern, responsive personal reading management platform designed with a warm,
          editorial aesthetic inspired by timeless physical libraries. It empowers readers to curate
          wishlists, log daily page progress, celebrate annual reading targets, and reflect on literary
          adventures—completely privately within the browser.
        </p>

        <div className="about-key-stats-row">
          <div className="key-stat-pill">
            <BookMarked size={16} /> Curated Bookshelf
          </div>
          <div className="key-stat-pill">
            <Target size={16} /> Annual Goal Tracker
          </div>
          <div className="key-stat-pill">
            <BarChart3 size={16} /> Reading Analytics
          </div>
          <div className="key-stat-pill">
            <ShieldCheck size={16} /> 100% Client-Side Privacy
          </div>
        </div>
      </div>

      {/* Project Objectives & Architecture Highlights */}
      <div className="about-sections-grid">
        <div className="about-info-card">
          <h3 className="info-card-title">Purpose & Core Philosophy</h3>
          <ul className="info-bullets-list">
            <li>
              <strong>Foster Reading Habits:</strong> Providing visual, encouraging feedback on daily reading velocity and yearly milestones.
            </li>
            <li>
              <strong>Distraction-Free Sanctuary:</strong> No intrusive advertisements, paywalls, or noisy social feeds—just you and your books.
            </li>
            <li>
              <strong>Intelligent Automation:</strong> Reading percentages calculate on the fly, and books automatically transition to <em>Completed</em> when the last page is turned.
            </li>
            <li>
              <strong>Complete Local Privacy:</strong> All data, custom covers, and private thoughts remain stored safely in your browser's LocalStorage.
            </li>
          </ul>
        </div>

        <div className="about-info-card">
          <h3 className="info-card-title">Architecture & Engineering</h3>
          <ul className="info-bullets-list">
            <li>
              <strong>Component-Driven UI:</strong> Built with modular, single-responsibility React functional components and hooks.
            </li>
            <li>
              <strong>Client-Side Routing:</strong> Fluid page transitions powered by React Router DOM v6 with dynamic book ID parameters.
            </li>
            <li>
              <strong>Centralized State & Context:</strong> A lightweight Context API container manages shelf records, CRUD actions, and toast alerts.
            </li>
            <li>
              <strong>Zero Backend Dependency:</strong> Full functionality with resilient offline storage and fast Vite bundling.
            </li>
          </ul>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="about-features-container">
        <h3 className="info-card-title">Key Capabilities</h3>
        <div className="about-features-grid">
          <div className="about-feature-box">
            <div className="feature-icon-wrap">
              <BookOpen size={20} />
            </div>
            <h4>Digital Bookshelf</h4>
            <p>
              Switch between grid and list views, search by title or author, and filter across 10 literary genres with status tabs.
            </p>
          </div>

          <div className="about-feature-box">
            <div className="feature-icon-wrap">
              <Target size={20} />
            </div>
            <h4>Reading Goals & Pacing</h4>
            <p>
              Set annual reading targets, monitor monthly pacing benchmarks, and unlock achievement badges as you read.
            </p>
          </div>

          <div className="about-feature-box">
            <div className="feature-icon-wrap">
              <BarChart3 size={20} />
            </div>
            <h4>Visual Analytics</h4>
            <p>
              Explore genre distributions, status allocations, reading volume metrics, and top-rated books with responsive charts.
            </p>
          </div>

          <div className="about-feature-box">
            <div className="feature-icon-wrap">
              <Sparkles size={20} />
            </div>
            <h4>Custom Artwork & Notes</h4>
            <p>
              Select aesthetic preset covers, link external image URLs, or upload local book covers stored offline via FileReader.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
