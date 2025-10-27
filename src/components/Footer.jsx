const Footer = () => {
  return (
    <div className="footer-content">
        <p>&copy; GameStock. Todos los derechos reservados.</p>
        <ul className="footer-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Acerca de</a></li>
        <li><a href="#">Contacto</a></li>
        </ul>

        <div className="social-media">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
        </div>
    </div>
  );
};

export default Footer;