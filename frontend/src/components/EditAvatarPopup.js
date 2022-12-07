import React, { useEffect, useRef } from 'react';
import { useFormWithValidation } from '../hooks/formValidator';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef();
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();
  const resetFormOnClose = () => {
    resetForm();
    avatar.current.value = '';
  };
  useEffect(() => {
    resetFormOnClose();
  }, [isOpen])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };
  const handleClose = () => {
    onClose();
  };
  const isAvatarError = 'avatar' in errors && errors.avatar.length > 0;
  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      labelButtonSubmit="Да"
      ariaLabelText="Закрыть окно изменения аватара профиля"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      handleClose={handleClose}
    >
      <input
        className={`popup__input ${isAvatarError && 'popup__input_type_error'}`}
        id="input-avatar"
        type="url"
        name="avatar"
        autoComplete="off"
        placeholder="Ссылка на аватар профиля"
        required
        ref={avatar}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          isAvatarError && 'popup__input-error_active'
        }`}
      >
        {isAvatarError && errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
