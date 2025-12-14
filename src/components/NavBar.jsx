import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/context';
import logo from '../img/logo.png';
import { useAuth } from "../context/AuthContext";

const NavBar = ({ openAuthModal, onSearchChange }) => {
  const { cartItems } = useCart();
  const { usuario, isAuthenticated } = useAuth();
  const [searchActive, setSearchActive] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleSearch = () => {
    setSearchActive((prevState) => !prevState);
  };

  const handleSearch = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <header id="search-banner">
      <Link to="/">
        <div className="logo-container">
          <img id="logo" src={logo} alt="Logo de GameStock" />
          <span className="site-name">GAMESTOCK</span>
        </div>
      </Link>

      <div className={`search-container ${searchActive ? 'active' : ''}`}>
        <div className="input-with-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            id="search-input"
            placeholder="Buscar..."
            onChange={handleSearch} 
          />
        </div>
        <div className="search-results"></div>
      </div>

      <div className="bar-items">
        <button className="mobile-search" onClick={toggleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {isAuthenticated && usuario?.role === "admin" && (
          <Link to="/dashboard">
            <button title="Dashboard" id="dashboard-btn">
              <i className="fa-solid fa-lock-open"></i>
            </button>
          </Link>
        )}

        <button
          title={isAuthenticated ? "Sesión iniciada" : "Iniciar sesión / Registro"}
          id="account"
          className={isAuthenticated ? "account-logged" : "account-guest"}
          onClick={openAuthModal}
        >
          <i className="fa-solid fa-user"></i>
        </button>

        <Link to="/cart">
          <button title="Ver carrito" id="cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && (
              <span id="cart-count" className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
