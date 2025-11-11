import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/context";

const ProductDetail = () => {
  const { id } = useParams(); // obtenemos el id de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Agregar item al carrito

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const baseUrl = import.meta.env.DEV
          ? "/steam-api" // local 
          : "https://store.steampowered.com"; // vercel

        const response = await fetch(
          `${baseUrl}/api/appdetails?appids=${id}&l=spanish&cc=US`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data[id] && data[id].success) {
          setProduct(data[id].data);
        } else {
          setError("No se pudo obtener la información del juego.");
        }
      } catch (err) {
        console.error("Error al obtener los datos del juego:", err);
        setError("Error al cargar los datos del juego.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return null;
  if (error) return <h1>{error}</h1>;
  if (!product) return <h1>Producto no encontrado o no disponible.</h1>;

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <img src={product.header_image} alt={product.name} />
      <div dangerouslySetInnerHTML={{ __html: product.about_the_game }} />
      <p>Precio: {product.price_overview?.final_formatted}</p>

      <button
        onClick={() => {
          console.log("Botón COMPRAR presionado para producto:", id);
          addToCart(id);
        }}
      >
        COMPRAR
      </button>
    </div>
  );
};

export default ProductDetail;
