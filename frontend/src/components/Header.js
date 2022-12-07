import { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../images/header/logo.png';

function Header({ loggedIn, userEmail, handleSignOut }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [buttonBurgerIsActive, setButtonBurgerIsActive] = useState(false);
  const navigate = useNavigate();

  const onSignOut = () => {
    handleSignOut();
    setMenuIsOpen(false);
    setButtonBurgerIsActive(false);
    navigate('sign-in');
  };
  const handleClickBurgerButton = () => {
    setMenuIsOpen(!menuIsOpen);
    setButtonBurgerIsActive(!buttonBurgerIsActive);
  };
  return (
    <header className={`header ${menuIsOpen && 'header_type_menu-open'}`}>
      <img className="header__logo" src={logo} alt="логотип шапки сайта" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            loggedIn && (
              <>
                <button
                  type="button"
                  className={`header__burger-button ${
                    buttonBurgerIsActive && 'header__burger-button_type_active'
                  }`}
                  onClick={handleClickBurgerButton}
                >
                  <span></span>
                </button>
                <div className="header__menu">
                  <p className="header__user-email">{userEmail}</p>
                  <button type="button" className="header__button-outlet" onClick={onSignOut}>
                    Выйти
                  </button>
                </div>
              </>
            )
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
