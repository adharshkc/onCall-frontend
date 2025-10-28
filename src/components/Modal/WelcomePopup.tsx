"use client";
import styles from './WelcomePopup.module.css';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      {/* Backdrop */}
      <div 
        className={styles.backdrop}
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          {/* Close button */}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close popup"
          >
            <svg 
              className={styles.closeIcon} 
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className={styles.content}>

            {/* Brand Name */}
            <h1 className={styles.brandName}>
              On Call
            </h1>

            {/* Title */}
            <h2 className={styles.title}>
              Temporary Recruitment Agency / Staffing Solutions
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
