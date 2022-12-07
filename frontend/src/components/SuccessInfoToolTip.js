import React from 'react';
import InfoTooltip from './InfoTooltip';

function SuccessInfoToolTip({ isOpen, onClose }) {
  return (
    <InfoTooltip
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelText="Закрыть окно подтверждения успешной регистрации"
      title="Вы успешно зарегистрировались!"
      logo="success"
    />
  );
}

export default SuccessInfoToolTip;
