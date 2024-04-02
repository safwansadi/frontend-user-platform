// Modal.tsx

import React, { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: ReactNode; // Include children prop explicitly
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
