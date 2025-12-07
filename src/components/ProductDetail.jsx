import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/context";
import { db } from "../db-firebase/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        //Producto cargado manualmente
        if (id.startsWith("m")) {
          const ref = doc(db, "games", id);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            setProduct({
              ...snap.data(),
              isSteam: false, // etiqueta para usar luego
            });
          } else {
            setError("Producto manual no encontrado.");
          }
          return;
        }

        //Producto de steam
        const response = await fetch(`/api/steam?appids=${id}`);
        const data = await response.json();

        if (data && data[id] && data[id].success) {
          setProduct({
            ...data[id].data,
            isSteam: true,
          });
        } else {
          setError("No se pudo obtener información de Steam.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Hubo un problema al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Cargando producto...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Producto no encontrado.</h2>;

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>

      {product.isSteam && (
        <img
          src={product.header_image}
          alt={product.name}
        />
      )}

      {product.isSteam ? (
        <div dangerouslySetInnerHTML={{ __html: product.about_the_game }} />
      ) : (
        <p>{product.description}</p>
      )}

      <p>
        Precio:{" "}
        {product.isSteam
          ? product.price_overview?.final_formatted || "Gratis"
          : product.price}
      </p>

      <button onClick={() => addToCart(id)}>COMPRAR</button>
    </div>
  );
};

export default ProductDetail;
