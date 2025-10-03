import React, { ReactNode } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 'max-w-lg',
  height = 'max-h-[80vh]'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-backdrop"
        onClick={onClose}
      />
      <div
        className={`modal-container ${width === 'max-w-lg' ? 'modal-width-default' : ''}`}
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">
            {title}
          </h3>
          <button
            className="modal-close-button"
            onClick={onClose}
          >
            <X className="modal-close-icon" />
          </button>
        </div>

        {/* Modal Body */}
        <div className={`modal-body ${height === 'max-h-[80vh]' ? 'modal-height-default' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;