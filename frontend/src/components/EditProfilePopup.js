import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { useFormWithValidation } from '../hooks/formValidator';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormWithValidation();
  useEffect(() => {
    setIsValid(true);
  }, []);
  useEffect(() => {
    resetFormOnClose();
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };
  const resetFormOnClose = () => {
    resetForm(
      { ...values, name: currentUser.name, about: currentUser.about },
      true
    );
  };
  const handleClose = () => {
    onClose();
  } 
  const isNameError = 'name' in errors && errors.name.length > 0;
  const isAboutError = 'about' in errors && errors.about.length > 0;

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      labelButtonSubmit="Сохранить"
      ariaLabelText="Закрыть окно редактирования профиля"
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
        placeholder="Имя пользователя"
        required
        minLength="2"
        maxLength="40"
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
        className={`popup__input ${isAboutError && 'popup__input_type_error'}`}
        type="text"
        name="about"
        autoComplete="off"
        placeholder="Информация о пользователе"
        required
        minLength="2"
        maxLength="200"
        value={values.about ?? ""}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          isAboutError && 'popup__input-error_active'
        }`}
      >
        {isAboutError && errors.name}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
