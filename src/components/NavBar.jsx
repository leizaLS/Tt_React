import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/context';
import logo from '../img/logo.png';
import { useAuth } from "../context/AuthContext";

const NavBar = ({ openAuthModal }) => {
  const { cartItems } = useCart();
  const { usuario, isAuthenticated } = useAuth();
  const [searchActive, setSearchActive] = useState(false);

  // Contar la cantidad total de productos
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Función para manejar el clic en el botón de búsqueda de celular
  const toggleSearch = () => {
    setSearchActive((prevState) => !prevState); 
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
          <input type="text" id="search-input" placeholder="Buscar..." />
        </div>
        <div className="search-results"></div>
      </div>

      <div className="bar-items">
        <button className="mobile-search" onClick={toggleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {/* Dashboard  */}
        {isAuthenticated && usuario?.role === "admin" && (
          <Link to="/dashboard">
            <button title="Dashboard" id="dashboard-btn">
              <i className="fa-solid fa-lock-open"></i>
            </button>
          </Link>
        )}

        {/* Modal */}
        <button title="Iniciar sesión/Registro" id="account" onClick={openAuthModal}>
          <i className="fa-solid fa-user"></i>
        </button>

        {/* Cart */}
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
