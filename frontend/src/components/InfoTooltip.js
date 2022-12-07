import React, { useEffect } from 'react';
import fail from '../images/info-tool-tip/fail.svg';
import success from '../images/info-tool-tip/success.svg';

function InfoTooltip({ isOpen, onClose, ariaLabelText, title, logo }) {
  const typeLogo = { success, fail };
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    const closePopupEsc = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleClose();
      }
    };
    window.addEventListener('keydown', closePopupEsc);
    return () => window.removeEventListener('keydown', closePopupEsc);
  }, []);
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={handleClose}>
      <div
        className="popup__body popup__body_location_entry-form"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="popup__status-image" src={typeLogo[logo]} />
        <h2 className="popup__title_location_entry-form">
          {title}
        </h2>
        <button
          className="popup__close-icon"
          type="button"
          aria-label={ariaLabelText}
          onClick={handleClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
