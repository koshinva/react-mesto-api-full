import React, { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Card from './Card.js';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__button-change-avatar"
          type="button"
          onClick={onEditAvatar}
          aria-label="Открыть окно изменения аватара профиля"
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар профиля"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            onClick={onEditProfile}
            aria-label="Открыть окно редактирования профиля"
          ></button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}
          aria-label="Открыть окно добавления карточки"
        ></button>
      </section>
      <section className="place">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
