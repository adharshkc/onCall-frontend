"use client";
import styles from './WelcomePopup.module.css';
import Image from 'next/image';

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
            {/* Text Content */}
            <div className={styles.textContent}>
              {/* First line - lighter text */}
              {/* <p className={styles.introText}>
                You call us &ldquo;On Call&rdquo;
              </p>
              <p className={styles.introText}>
                so we are moving to
              </p> */}

              {/* Brand Name - bold and larger */}
              <h1 className={styles.brandName} style= {{marginBottom: '0rem'}}>
                ON CALL<sup className={styles.trademark}>®</sup>
              </h1>
              <p className={styles.introText}>
                We care for you
              </p>

              {/* Title */}
              <h2 className={styles.title}>
                Temporary Recruitment Agency / Staffing Solutions
              </h2>
            </div>

            {/* HR Illustration */}
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/hr.png" 
                alt="HR Recruitment Illustration"
                width={600}
                height={300}
                className={styles.hrImage}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
