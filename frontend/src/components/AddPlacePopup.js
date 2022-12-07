import React, { useEffect } from 'react';
import { useFormWithValidation } from '../hooks/formValidator';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  const resetFormOnClose = () => {
    resetForm({ ...values, name: '', link: '' });
  };
  useEffect(() => {
    resetFormOnClose();
  }, [isOpen])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };
  const handleClose = () => {
    onClose();
  } 
  const isNameError = 'name' in errors && errors.name.length > 0;
  const isLinkError = 'link' in errors && errors.link.length > 0;
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      labelButtonSubmit="Создать"
      ariaLabelText="Закрыть окно добавления нового места"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      handleClose={handleClose}
    >
      <input
        className={`popup__input ${isNameError && 'popup__input_type_error'}`}
        type="text"
        name="name"
        autoComplete="off"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values.name ?? ""}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          isNameError && 'popup__input-error_active'
        }`}
      >
        {isNameError && errors.name}
      </span>
      <input
        className={`popup__input ${isLinkError && 'popup__input_type_error'}`}
        type="url"
        name="link"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        value={values.link ?? ""}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          isLinkError && 'popup__input-error_active'
        }`}
      >
        {isLinkError && errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
