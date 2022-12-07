import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './Layout.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentIsLoading } from '../context/CurrentIsLoading.js';
import ConfirmCardRemovePopup from './ConfirmCardRemovePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import SuccessInfoToolTip from './SuccessInfoToolTip.js';
import FailInfoToolTip from './FailInfoToolTip.js';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmCardRemovePopupOpen, setIsConfirmCardRemovePopupOpen] = useState(false);
  const [isSuccessInfoToolTipOpen, setIsSuccessInfoToolTipOpen] = useState(false);
  const [isFailInfoToolTipOpen, setIsFailInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardOnDelete, setCardOnDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api
        .getCardInfo()
        .then(({ data }) => {
          setCards([...data]);
        })
        .catch((error) => console.log(error));
      api
        .getUserInfo()
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  const checkToken = () => {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    checkToken();
  }, []);
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((userLiked) => userLiked === currentUser._id);
    api
      .changeLikeCard(card._id, !isLiked)
      .then(({ data: newCard }) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((error) => console.log(error));
  };
  const handleConfirmDeleteClick = (card) => {
    setIsConfirmCardRemovePopupOpen(true);
    setCardOnDelete(card);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmCardRemovePopupOpen(false);
    setIsSuccessInfoToolTipOpen(false);
    setIsFailInfoToolTipOpen(false);
    setSelectedCard({});
    setCardOnDelete({});
  };
  const useFetching = (callback) => {
    return (...args) => {
      setIsLoading(true);
      callback(...args)
        .then(() => closeAllPopups())
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  };
  const handleUpdateUser = useFetching(({ name, about }) => {
    return api.editProfile(name, about).then(({ data }) => {
      setCurrentUser(data);
    });
  });
  const handleUpdateAvatar = useFetching(({ avatar }) => {
    return api.updateAvatar(avatar).then(({ data }) => {
      setCurrentUser(data);
    });
  });
  const handleAddPlaceSubmit = useFetching(({ name, link }) => {
    return api.addNewCard(name, link).then(({ data: newCard }) => {
      setCards([newCard, ...cards]);
    });
  });
  const handleCardDelete = useFetching(() => {
    return api.deleteCard(cardOnDelete._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardOnDelete._id));
    });
  });

  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setIsSuccessInfoToolTipOpen(true);
        navigate('/sign-in');
      })
      .catch((error) => {
        setIsFailInfoToolTipOpen(true);
        console.log(error);
      });
  };

  const handleLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/');
        }
      })
      .catch((error) => {
        setIsFailInfoToolTipOpen(true);
        console.log(error);
      });
  };
  const handleSignOut = () => {
    return auth
      .signout()
      .then((res) => {
        if (res) {
          navigate('sign-in');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentIsLoading.Provider value={isLoading}>
        <div className="page">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <Layout userEmail={userEmail} loggedIn={loggedIn} handleSignOut={handleSignOut} />
                }
              >
                <Route
                  index
                  element={
                    <ProtectedRoute loggedIn={loggedIn}>
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleConfirmDeleteClick}
                        cards={cards}
                      />
                      <Footer />
                    </ProtectedRoute>
                  }
                />

                <Route path="sign-up" element={<Register onRegister={handleRegister} />} />
                <Route path="sign-in" element={<Login onLogin={handleLogin} />} />
                <Route
                  path="*"
                  element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-up" />}
                />
              </Route>
            </Routes>
          </div>
          <SuccessInfoToolTip isOpen={isSuccessInfoToolTipOpen} onClose={closeAllPopups} />
          <FailInfoToolTip isOpen={isFailInfoToolTipOpen} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ConfirmCardRemovePopup
            isOpen={isConfirmCardRemovePopupOpen}
            onClose={closeAllPopups}
            onDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentIsLoading.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
