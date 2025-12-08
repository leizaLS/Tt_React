import { Link } from "react-router-dom";
import dummyImg from "../img/dummy_product.jpg";

const ProductCard = ({ product }) => {
    const imageSrc = product.capsule_image ? product.capsule_image : dummyImg;

    return (
        <Link to= {`/product/${product.id}`} >
            <div className="productCard" game-id={product.id}> {}
                <img src={imageSrc} alt={product.name} /> {}
                <h4>{product.name}</h4>
                <p>{product.price}</p>
            </div>
        </Link>
    );
}
export default ProductCard;