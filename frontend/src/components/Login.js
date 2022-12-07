import React from 'react';
import EntryForm from './EntryForm';

function Login({ onLogin }) {
  return <EntryForm title="Вход" labelButton="Войти" onSubmit={onLogin} />;
}

export default Login;