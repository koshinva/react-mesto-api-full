import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser._id === card.owner;
  const cardDeleteButtonClassName = `place__button-remove ${
    isOwn && 'place__button-remove_visible'
  }`;
  const isLiked = card.likes.some(userLiked => userLiked === currentUser._id);
  const cardLikeButtonClassName = `place__like ${isLiked && 'place__like_active'}`
  const handleLikeClick = () => {
    props.onCardLike(card);
  }
  const handleDeleteClick = () => {
    props.onCardDelete(card);
  }
  return (
    <div className="place__element">
      <img
        className="place__image"
        src={card.link}
        alt={card.name}
        onClick={() => props.onCardClick(card)}
      />
      <div className="place__description">
        <h2 className="place__name-city">{card.name}</h2>
        <div className="place__score">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить или убрать лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="place__count-like">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}
export default Card;
