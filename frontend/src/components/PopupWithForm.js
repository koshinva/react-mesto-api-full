import { useContext, useEffect } from 'react';
import { CurrentIsLoading } from '../context/CurrentIsLoading';

function PopupWithForm(props) {
  const isLoading = useContext(CurrentIsLoading);
  useEffect(() => {
    const closePopupEsc = (e) => {
      if (e.key === 'Escape') {
        props.handleClose();
      }
    };
    window.addEventListener('keydown', closePopupEsc);
    return () => window.removeEventListener('keydown', closePopupEsc);
  }, []);

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && 'popup_opened'
      }`}
      onClick={props.handleClose}
    >
      <div
        className={`popup__body popup__body_location_${props.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`popup__title popup__title_location_${props.name}`}>
          {props.title}
        </h2>
        <form
          className={`popup__form popup__form_location_${props.name}`}
          name={`popup__form_location_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popup__button ${
              !props.isValid && 'popup__button_inactive'
            }`}
            type="submit"
            disabled={!props.isValid ? true : false}
          >
            {isLoading ? 'Сохранение...' : `${props.labelButtonSubmit}`}
          </button>
        </form>
        <button
          className="popup__close-icon"
          type="button"
          aria-label={props.ariaLabelText}
          onClick={props.handleClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
