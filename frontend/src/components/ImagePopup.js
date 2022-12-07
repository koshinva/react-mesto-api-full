import { useEffect } from 'react';

function ImagePopup({ card, onClose }) {
  const isEmpty = Object.keys(card).length === 0;
  useEffect(() => {
    const closePopupEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closePopupEsc);
    return () => window.removeEventListener('keydown', closePopupEsc);
  }, []);
  return (
    !isEmpty && (
      <div className="popup popup_type_image popup_opened" onClick={onClose}>
        <div
          className="popup__image-container"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="popup__image"
            src={card.link}
            alt={card.name}
          />
          <p className="popup__image-description">{card.name}</p>
          <button
            className="popup__close-icon"
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно просмотра изображения"
          ></button>
        </div>
      </div>
    )
  );
}

export default ImagePopup;
