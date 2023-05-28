import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, currentImageUrl, currentImageDescription }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Backdrop__styled" onClick={handleClickBackdrop}>
      <div className="Modal__styled">
        <div className="Modal__wrapper">
          <button className="Modal__btn" type="button" onClick={onClose}>
            <BsXLg className="Modal_icon" />
          </button>
        </div>
        <img src={currentImageUrl} alt={currentImageDescription} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string,
  currentImageDescription: PropTypes.string,
};

export default Modal;
