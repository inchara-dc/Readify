import React, { useState, useEffect, useRef } from 'react';
import { GENRES, READING_STATUS, PRESET_COVERS, calculateProgress } from '../utils/bookUtils';
import RatingStars from './RatingStars';
import { Image, Upload, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

/**
 * UNIT II, III & V: BookForm Component
 * Fully controlled form component supporting Add and Edit operations.
 * Demonstrates:
 * - Controlled inputs (onChange, onSubmit)
 * - Form validation and inline error messaging
 * - useRef for DOM focus management
 * - File reading for local image cover selection
 * - Preset covers palette
 *
 * @param {Object} initialValues - Existing data when editing
 * @param {Function} onSubmit - Callback invoked with validated book data
 * @param {string} submitLabel - Button label ('Add Book' or 'Save Changes')
 * @param {boolean} isEdit - Whether in edit mode
 * @param {Function} onCancel - Optional cancel handler
 */
export const BookForm = ({
  initialValues = null,
  onSubmit,
  submitLabel = 'Add Book to Bookshelf',
  isEdit = false,
  onCancel = null
}) => {
  // UNIT V: useRef for focusing the first input on mount
  const titleInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: GENRES[0],
    totalPages: '',
    currentPage: '0',
    status: READING_STATUS.WANT_TO_READ,
    rating: 0,
    review: '',
    notes: '',
    coverUrl: PRESET_COVERS[0].url
  });

  // Validation Errors state
  const [errors, setErrors] = useState({});
  const [coverSource, setCoverSource] = useState('preset'); // 'preset' | 'url' | 'file'
  const [imagePreviewError, setImagePreviewError] = useState(false);

  // Focus title input on mount
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  // Prepopulate form if editing
  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        author: initialValues.author || '',
        genre: initialValues.genre || GENRES[0],
        totalPages: initialValues.totalPages ? String(initialValues.totalPages) : '',
        currentPage: initialValues.currentPage !== undefined ? String(initialValues.currentPage) : '0',
        status: initialValues.status || READING_STATUS.WANT_TO_READ,
        rating: Number(initialValues.rating) || 0,
        review: initialValues.review || '',
        notes: initialValues.notes || '',
        coverUrl: initialValues.coverUrl || PRESET_COVERS[0].url
      });
      setCoverSource('url');
    }
  }, [initialValues]);

  // UNIT III: Form Input Change Handler (Generic controlled input)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Automatic sync: if user changes currentPage to equal totalPages, update status to Completed
      if (name === 'currentPage' || name === 'totalPages') {
        const current = Number(name === 'currentPage' ? value : updated.currentPage) || 0;
        const total = Number(name === 'totalPages' ? value : updated.totalPages) || 0;

        if (total > 0 && current >= total) {
          updated.status = READING_STATUS.COMPLETED;
        } else if (current > 0 && current < total && updated.status === READING_STATUS.WANT_TO_READ) {
          updated.status = READING_STATUS.CURRENTLY_READING;
        }
      }

      // If user marks status as 'Completed', set currentPage to totalPages if available
      if (name === 'status' && value === READING_STATUS.COMPLETED) {
        if (Number(updated.totalPages) > 0) {
          updated.currentPage = String(updated.totalPages);
        }
      }

      // If user marks status as 'Want to Read', set currentPage to 0
      if (name === 'status' && value === READING_STATUS.WANT_TO_READ) {
        updated.currentPage = '0';
      }

      return updated;
    });

    // Clear error for field being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle local image file upload using FileReader
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, coverUrl: 'Please select a valid image file.' }));
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, coverUrl: 'Image size should be under 2MB.' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverUrl: reader.result }));
        setImagePreviewError(false);
        setErrors((prev) => ({ ...prev, coverUrl: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Book title is required.';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters long.';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required.';
    }

    if (!formData.genre) {
      newErrors.genre = 'Please select a genre.';
    }

    const total = Number(formData.totalPages);
    if (!formData.totalPages || isNaN(total) || total <= 0) {
      newErrors.totalPages = 'Total pages must be a positive number greater than 0.';
    }

    const current = Number(formData.currentPage);
    if (isNaN(current) || current < 0) {
      newErrors.currentPage = 'Current page cannot be negative.';
    } else if (total > 0 && current > total) {
      newErrors.currentPage = `Current page cannot exceed total pages (${total}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // UNIT III: Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const total = Number(formData.totalPages);
    const current = Math.min(Number(formData.currentPage) || 0, total);

    onSubmit({
      ...formData,
      totalPages: total,
      currentPage: current,
      rating: Number(formData.rating) || 0
    });
  };

  const calculatedProgressPercent = calculateProgress(formData.currentPage, formData.totalPages);

  return (
    <form onSubmit={handleSubmit} className="readify-book-form" noValidate>
      <div className="form-grid">
        {/* Left Column: Form Fields */}
        <div className="form-fields-column">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="book-title" className="form-label required">
              Book Title
            </label>
            <input
              id="book-title"
              ref={titleInputRef}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Midnight Library"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
              required
            />
            {errors.title && (
              <p className="form-error-msg">
                <AlertCircle size={14} /> {errors.title}
              </p>
            )}
          </div>

          {/* Author */}
          <div className="form-group">
            <label htmlFor="book-author" className="form-label required">
              Author
            </label>
            <input
              id="book-author"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Matt Haig"
              className={`form-input ${errors.author ? 'is-invalid' : ''}`}
              required
            />
            {errors.author && (
              <p className="form-error-msg">
                <AlertCircle size={14} /> {errors.author}
              </p>
            )}
          </div>

          {/* Genre and Status in a 2-column row */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="book-genre" className="form-label required">
                Genre
              </label>
              <select
                id="book-genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className={`form-select ${errors.genre ? 'is-invalid' : ''}`}
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="book-status" className="form-label required">
                Reading Status
              </label>
              <select
                id="book-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value={READING_STATUS.WANT_TO_READ}>Want to Read</option>
                <option value={READING_STATUS.CURRENTLY_READING}>Currently Reading</option>
                <option value={READING_STATUS.COMPLETED}>Completed</option>
              </select>
            </div>
          </div>

          {/* Pages: Total and Current */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="book-total-pages" className="form-label required">
                Total Pages
              </label>
              <input
                id="book-total-pages"
                type="number"
                name="totalPages"
                min="1"
                max="5000"
                value={formData.totalPages}
                onChange={handleChange}
                placeholder="e.g. 304"
                className={`form-input ${errors.totalPages ? 'is-invalid' : ''}`}
                required
              />
              {errors.totalPages && (
                <p className="form-error-msg">
                  <AlertCircle size={14} /> {errors.totalPages}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="book-current-page" className="form-label">
                Current Page ({calculatedProgressPercent}%)
              </label>
              <input
                id="book-current-page"
                type="number"
                name="currentPage"
                min="0"
                max={formData.totalPages || 5000}
                value={formData.currentPage}
                onChange={handleChange}
                placeholder="e.g. 150"
                className={`form-input ${errors.currentPage ? 'is-invalid' : ''}`}
              />
              {errors.currentPage && (
                <p className="form-error-msg">
                  <AlertCircle size={14} /> {errors.currentPage}
                </p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="form-group">
            <label className="form-label">Rating</label>
            <div className="form-rating-wrapper">
              <RatingStars
                rating={formData.rating}
                onChange={(newRating) => setFormData((p) => ({ ...p, rating: newRating }))}
                size="lg"
              />
              <span className="rating-hint">
                {formData.rating > 0 ? `${formData.rating} of 5 stars` : 'Click stars to rate'}
              </span>
            </div>
          </div>

          {/* Review / Thoughts */}
          <div className="form-group">
            <label htmlFor="book-review" className="form-label">
              Review & Reflections
            </label>
            <textarea
              id="book-review"
              name="review"
              rows={3}
              value={formData.review}
              onChange={handleChange}
              placeholder="What made this book memorable? What were your key takeaways?"
              className="form-textarea"
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label htmlFor="book-notes" className="form-label">
              Private Reading Notes / Quotes
            </label>
            <textarea
              id="book-notes"
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Memorable quotes or private reading log..."
              className="form-textarea"
            />
          </div>
        </div>

        {/* Right Column: Cover Selection & Live Preview */}
        <div className="form-preview-column">
          <div className="cover-picker-card">
            <h4 className="cover-picker-title">Book Cover</h4>

            {/* Source tabs */}
            <div className="cover-source-tabs">
              <button
                type="button"
                className={`source-tab-btn ${coverSource === 'preset' ? 'active' : ''}`}
                onClick={() => setCoverSource('preset')}
              >
                Presets
              </button>
              <button
                type="button"
                className={`source-tab-btn ${coverSource === 'url' ? 'active' : ''}`}
                onClick={() => setCoverSource('url')}
              >
                URL
              </button>
              <button
                type="button"
                className={`source-tab-btn ${coverSource === 'file' ? 'active' : ''}`}
                onClick={() => setCoverSource('file')}
              >
                Upload File
              </button>
            </div>

            {/* Preset Picker */}
            {coverSource === 'preset' && (
              <div className="presets-palette">
                <p className="presets-caption">Select an aesthetic cover theme:</p>
                <div className="presets-grid">
                  {PRESET_COVERS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      className={`preset-thumb-btn ${formData.coverUrl === preset.url ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData((p) => ({ ...p, coverUrl: preset.url }));
                        setImagePreviewError(false);
                      }}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} />
                      <span className="preset-name">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* URL input */}
            {coverSource === 'url' && (
              <div className="url-picker-section">
                <label htmlFor="cover-url-input" className="form-label">
                  Cover Image URL
                </label>
                <input
                  id="cover-url-input"
                  type="url"
                  name="coverUrl"
                  value={formData.coverUrl}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, coverUrl: e.target.value }));
                    setImagePreviewError(false);
                  }}
                  placeholder="https://example.com/cover.jpg"
                  className="form-input"
                />
                <small className="form-hint">
                  Paste any public image link from Unsplash, Google Books, etc.
                </small>
              </div>
            )}

            {/* Local file upload */}
            {coverSource === 'file' && (
              <div className="file-picker-section">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="btn btn-outline file-upload-trigger"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <Upload size={16} /> Choose Image from Computer
                </button>
                <small className="form-hint">
                  Uploaded image is converted into offline base64 data.
                </small>
              </div>
            )}

            {/* Live Preview Card */}
            <div className="live-preview-box">
              <span className="live-preview-tag">
                <Sparkles size={12} /> Live Card Preview
              </span>

              <div className="preview-card-mockup">
                <div className="preview-cover-wrap">
                  <img
                    src={imagePreviewError || !formData.coverUrl ? PRESET_COVERS[0].url : formData.coverUrl}
                    alt="Preview"
                    onError={() => setImagePreviewError(true)}
                  />
                  <span className="preview-badge">{formData.status}</span>
                </div>
                <div className="preview-details">
                  <span className="preview-genre">{formData.genre}</span>
                  <h5 className="preview-title">
                    {formData.title.trim() || 'Untitled Book'}
                  </h5>
                  <p className="preview-author">
                    by {formData.author.trim() || 'Author Name'}
                  </p>
                  <div className="preview-progress">
                    <span>
                      {formData.currentPage || 0} / {formData.totalPages || 0} p.
                    </span>
                    <span className="preview-percent">
                      {calculatedProgressPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="form-actions-bar">
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-lg">
          <BookOpen size={18} />
          <span>{submitLabel}</span>
        </button>
      </div>
    </form>
  );
};

export default BookForm;
