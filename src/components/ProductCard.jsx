import { Link } from "react-router-dom";
import dummyImg from "../img/dummy_product.jpg";

const ProductCard = ({ product, isAdmin }) => {
  const imageSrc = product.capsule_image || dummyImg;
  const isHidden = isAdmin && product.visibility === false;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="productCard" game-id={product.id}>

        {isHidden && (
          <div
            className="visibility-icon"
            title="Producto oculto para usuarios"
          >
            <i className="fa-solid fa-eye-slash"></i>
          </div>
        )}

        <img src={imageSrc} alt={product.name} />
        <h4>{product.name}</h4>
        <p>{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;