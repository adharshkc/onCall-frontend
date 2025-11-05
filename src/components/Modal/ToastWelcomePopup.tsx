"use client";
import { useState, useEffect } from 'react';
import styles from './ToastWelcomePopup.module.css';
import Image from 'next/image';
import { API_URL } from '@/config/api';

interface ToastWelcomePopupProps {
  onClose: () => void;
}

interface PopupConfig {
  enabled: boolean;
  title: string;
  content: string;
  buttonText: string;
}

const POPUP_SHOWN_KEY = 'welcomePopupShown';
const POPUP_EXPIRY = 24 * 60 * 60 * 1000; // 1 day in milliseconds

const ToastWelcomePopup: React.FC<ToastWelcomePopupProps> = ({ onClose }) => {
  const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkPopupStatus = () => {
      const popupShown = localStorage.getItem(POPUP_SHOWN_KEY);
      if (popupShown) {
        const timestamp = parseInt(popupShown);
        if (Date.now() - timestamp < POPUP_EXPIRY) {
          return false;
        }
      }
      return true;
    };

    const fetchPopupConfig = async () => {
      if (!checkPopupStatus()) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/settings/popup_config/value`);
        const { data } = await response.json();
        console.log('Fetched popup config:', data);
        
        if (data) {
          setPopupConfig(data);
          setShow(true);
          localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
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
        setShow(true);
        localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
      } finally {
        setLoading(false);
      }
    };

    fetchPopupConfig();
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 500); // Wait for exit animation
  };

  if (loading || !popupConfig || !popupConfig.enabled || !show) return null;

  return (
    <div className={`${styles.toastContainer} ${show ? styles.show : ''}`}>
      <div className={styles.toastContent}>
        {/* Logo/Brand Section */}
        <div className={styles.brandSection}>
          <Image 
            src="/images/logo.png" 
            alt="ON CALL Logo"
            width={120}
            height={120}
            className={styles.logo}
          />
        </div>

        {/* Content Section */}
        <div className={styles.messageSection}>
          <div className={styles.welcomeText}>
            Welcome to{' '}
            <span className={styles.brandNameInline}>
              {popupConfig.title}
            </span>
          </div>
          
          <p className={styles.contentText}>{popupConfig.content}</p>
        </div>

        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close welcome message"
        >
          <svg 
            className={styles.closeIcon} 
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className={styles.progressBar}></div>
    </div>
  );
};

export default ToastWelcomePopup;