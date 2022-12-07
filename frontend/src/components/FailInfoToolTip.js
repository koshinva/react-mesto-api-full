import React from 'react';
import InfoTooltip from './InfoTooltip';

function FailInfoToolTip({ isOpen, onClose }) {
  return (
    <InfoTooltip
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelText="Закрыть окно подтверждения неуспешной регистрации"
      title="Что-то пошло не так! Попробуйте ещё раз."
      logo="fail"
    />
  );
}

export default FailInfoToolTip;
