import React  from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmCardRemovePopup({ isOpen, onClose, onDelete }) {
  const handleDeleteCard = (e) => {
    e.preventDefault();
    onDelete();
  }
  const handleClose = () => {
    onClose();
  } 
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      labelButtonSubmit="Да"
      ariaLabelText="Закрыть окно подтверждения удаления карточки"
      isOpen={isOpen}
      onSubmit={handleDeleteCard}
      isValid={true}
      handleClose={handleClose}
    ></PopupWithForm>
  );
}

export default ConfirmCardRemovePopup;
