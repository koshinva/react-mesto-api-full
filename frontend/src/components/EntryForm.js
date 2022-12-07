import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function EntryForm({ title, labelButton, onSubmit, link }) {
  const [dataEntryForm, setDataEntryForm] = useState({
    email: '',
    password: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataEntryForm({ ...dataEntryForm, [name]: value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(dataEntryForm.email, dataEntryForm.password).then(() => {
      setDataEntryForm({
        email: '',
        password: '',
      });
    });
  };
  return (
    <div className="entry-form">
      <h2 className="entry-form__title">{title}</h2>
      <form
        onSubmit={handleSubmit}
        className="entry-form__form"
        name="entry-form"
      >
        <input
          className="entry-form__input"
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          required
          value={dataEntryForm.email}
          onChange={handleChange}
        />
        <input
          className="entry-form__input"
          type="password"
          name="password"
          autoComplete="off"
          placeholder="Пароль"
          required
          value={dataEntryForm.password}
          onChange={handleChange}
        />
        <button type="submit" className="entry-form__button">
          {labelButton}
        </button>
        {link && (
          <Link to="/sign-in" className="entry-form__link">
            Уже зарегистрированы? Войти
          </Link>
        )}
      </form>
    </div>
  );
}

export default EntryForm;
