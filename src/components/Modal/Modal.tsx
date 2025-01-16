// src/components/Modal.tsx
import React, { ReactNode } from 'react';
import classNames from 'classnames';

// CSS
import './Modal.scss'; // Importing the SCSS file for styling

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // Do not render modal if not open

  return (
    <div className={classNames('modal-overlay', {'show': isOpen})} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
