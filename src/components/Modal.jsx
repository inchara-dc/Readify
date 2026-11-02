import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * UNIT II & V: Modal Component
 * Demonstrates props.children, DOM event listener in useEffect with cleanup,
 * and backdrop interaction.
 *
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback invoked when close is requested
 * @param {string} title - Modal heading
 * @param {string} subtitle - Optional descriptive subtitle
 * @param {React.ReactNode} children - Embedded content via props.children
 * @param {string} maxWidth - Max width CSS string (default '540px')
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '540px'
}) => {
  const modalRef = useRef(null);

  // UNIT V: useEffect hook to handle ESC key press and scroll locking
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        // Close if user clicks the dark backdrop outside the dialog
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container"
        ref={modalRef}
        style={{ maxWidth }}
      >
        <div className="modal-header">
          <div>
            <h3 id="modal-title" className="modal-title">{title}</h3>
            {subtitle && <p className="modal-subtitle">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* UNIT II: Rendering props.children */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
