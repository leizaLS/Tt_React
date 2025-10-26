import { Link } from "react-router-dom";
import { useCart } from "../context/context";

const NavBar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.length;

  return (
    <header id="search-banner">
      <Link to="/">
        <div className="logo-container">
          <img id="logo" src="../src/img/logo.png" alt="Logo" />
          <span className="site-name">GAMESTOCK</span>
        </div>
      </Link>

      <div className="search-container">
        <div className="input-with-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            id="search-input"
            placeholder="Buscar..."
          />
        </div>
        <div className="search-results"></div>
      </div>

      <div className="bar-items">
        <button className="mobile-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        <button title="Iniciar sesión/Registro" id="account">
          <i className="fa-solid fa-user"></i>
        </button>

        <button title="Ver carrito" id="cart">
          <i className="fa-solid fa-cart-shopping"></i>

          {/* ✅ Solo mostramos el círculo si hay algo en el carrito */}
          {cartCount > 0 && (
            <span id="cart-count" className="cart-badge">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
