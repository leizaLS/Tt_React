import { Link } from "react-router-dom";

const NavBar = () => {
    // let n = "";
    // if (localStorage.getItem("cartList")) {
    //     let list = JSON.parse(localStorage.getItem("cartList")).length;
    //     if (list > 0) {
    //         n = list;
    //     }
    // }
    return (
        <header id="search-banner">
            <Link to='/'>
                <div className="logo-container">
                    <img id="logo" src="../src/img/logo.png" alt="Logo"></img>
                    <span className="site-name">GAMESTOCK</span>
                </div>
            </Link>

            <div className="search-container">
                <div className="input-with-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="search-input" placeholder="Buscar..."></input>
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
                    <span id="cart-count"></span>
                </button>            
            </div>

        </header>
    )
}
export default NavBar;