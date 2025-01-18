import React, { ReactNode } from 'react';
import classNames from 'classnames';

// COMPONENT
import Icon from '../Icon/Icon';

// CSS
import './Modal.scss'; // Importing the SCSS file for styling


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  modalContainerClassName?: string,
  modalOverlayClassName?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, modalContainerClassName, modalOverlayClassName }) => {
  if (!isOpen) return null; // Do not render modal if not open

  return (
    <div className={classNames('modal-overlay', {'show': isOpen}, modalOverlayClassName)} onClick={onClose}>
      <div className={classNames("modal-container",modalContainerClassName)} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <span>{title}</span>}
          <Icon name="fa-solid fa-xmark" className='close-icon' onClick={onClose}/>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
