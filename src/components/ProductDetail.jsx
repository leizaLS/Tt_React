import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/context";
import { db } from "../db-firebase/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import { useAuth } from "../context/AuthContext";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { usuario, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        let firebaseData = null;

        // Cargar datos desde Firebase
        const ref = doc(db, "games", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          firebaseData = snap.data();
        }

        // PRODUCTO MANUAL (ID empieza con "m")
        if (id.startsWith("m")) {
          if (firebaseData) {
            setProduct({
              ...firebaseData,
              id,
              isSteam: false,
              capsule_image: firebaseData.image
                ? `/img/${firebaseData.image}`
                : null,
            });
          } else {
            setError("Producto manual no encontrado.");
          }
          return;
        }

        // PRODUCTO STEAM
        const response = await fetch(`/api/steam?appids=${id}`);
        const data = await response.json();

        if (!data?.[id]?.success) {
          setError("No se pudo obtener información de Steam.");
          return;
        }

        const steamData = data[id].data;

        setProduct({
          id,
          isSteam: true,
          name: firebaseData?.name || steamData.name,
          description:
            firebaseData?.description && firebaseData.description !== ""
              ? firebaseData.description
              : steamData.about_the_game,
          price:
            firebaseData?.price ||
            steamData.price_overview?.final_formatted ||
            "Gratis",
          capsule_image: steamData.capsule_image,
          visibility: firebaseData?.visibility ?? true,
          steamRaw: steamData,
        });
      } catch (err) {
        console.error(err);
        setError("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product || product.visibility === false)
    return <h2>Producto no disponible.</h2>;

  if (showEditModal) {
    return (
      <EditProduct
        product={product}
        closeModal={() => setShowEditModal(false)}
      />
    );
  }

  const handleAddToCart = (id) => {
    // Llamamos a la función addToCart
    addToCart(id);   
    toast.success('¡Producto agregado al carrito!', {
      style: { backgroundColor: "#3a403d" }
    });
  };

  return (
    <div className="product-detail-container">
      {/* Botón editar solo admin */}
      {isAuthenticated && usuario?.role === "admin" && (
        <button
          title="Editar producto"
          id="edit-product-btn"
          onClick={ () => setShowEditModal(true) }
        >
          <i className="fa-solid fa-hammer"></i> Editar producto
        </button>
      )}

      <h1>{product.name}</h1>

      {/* Imagen del producto */}
      {product.capsule_image ? (
        <img
          src={
            product.isSteam
              ? product.steamRaw.header_image
              : product.capsule_image // imagen local
          }
          alt={product.name}
        />
      ) : (
        <p>Este producto no tiene imagen.</p>
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: product.isSteam
            ? product.description
            : `<p>${product.description}</p>`,
        }}
      />

      <p>Precio: {product.price}</p>

      {/* Botón para agregar al carrito */}
      <button onClick={() => handleAddToCart(id)} >COMPRAR</button>
    </div>
  );
}
