import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <Link to= {`/product/${product.id}`} >
            <div className="productCard" game-id={product.id}> {}
                <img src={product.capsule_image} alt={product.name} /> {}
                <h4>{product.name}</h4>
                <p>{product.price}</p>
            </div>
        </Link>
    );
}
export default ProductCard;