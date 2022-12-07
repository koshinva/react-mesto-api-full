import React from 'react';
import EntryForm from './EntryForm';

function Register({ onRegister }) {
  return (
    <EntryForm
      title="Регистрация"
      labelButton="Зарегистрироваться"
      onSubmit={onRegister}
      link={true}
    />
  );
}

export default Register;
