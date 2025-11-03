"use client";
import { useState, useEffect } from 'react';
import styles from './WelcomePopup.module.css';
import Image from 'next/image';
import { API_URL } from '@/config/api';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PopupConfig {
  enabled: boolean;
  title: string;
  content: string;
  buttonText: string;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopupConfig = async () => {
      try {
        const response = await fetch(`${API_URL}/settings/popup_config/value`);
        const { data } = await response.json();
        
        if (data && data.enabled) {
          setPopupConfig(data);
        }
      } catch (error) {
        console.error('Error fetching popup config:', error);
        // Fallback to default config if API fails
        setPopupConfig({
          enabled: true,
          title: 'ON CALL®',
          content: 'Temporary Recruitment Agency / Staffing Solutions',
          buttonText: 'Close'
        });
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPopupConfig();
    }
  }, [isOpen]);

  if (!isOpen || loading) return null;
  if (!popupConfig || !popupConfig.enabled) return null;

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
              {/* Brand Name - bold and larger */}
              <h1 className={styles.brandName} style={{marginBottom: '0rem'}}>
                {popupConfig.title}
              </h1>
              <p className={styles.introText}>
                We care for you
              </p>

              {/* Title */}
              <h2 className={styles.title}>
                {popupConfig.content}
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
