import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    // const priceValue = parseFloat(product.price.replace('$', '').trim());
    const details = (gameId) => {
        localStorage.setItem("gameId", JSON.stringify(gameId));     
    };
    
    return (
        <Link to= {`/product/${product.id}`} onClick={() => details(product.id)} >
            <div className="productCard" game-id={product.id}> {}
                <img src={product.capsule_image} alt={product.name} /> {}
                <h4>{product.name}</h4>
                <p>{product.price}</p>
            </div>
        </Link>
    );
}
export default ProductCard;