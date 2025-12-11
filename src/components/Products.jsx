import { useState, useEffect } from "react";
import { db } from "../db-firebase/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import Product from "./ProductCard.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // temporal

  // Fetch productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const productsList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(productsList);
      } catch (error) {
        console.error("Firebase Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calcular columnas dinámicamente
  useEffect(() => {
    const calculateGrid = () => {
      const containerWidth = document.body.clientWidth;

      const cardWidth = 235; 
      const gap = 20;
      const totalWidth = cardWidth + gap;

      const columns = Math.floor(containerWidth / totalWidth);

      if (columns >= 1) {
        const rows = 3; // siempre 3 filas (menos en última página)
        setItemsPerPage(columns * rows);
      }
    };
    calculateGrid();
    window.addEventListener("resize", calculateGrid);

    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  if (loading) return ;

  // Paginación
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentProducts = products.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      <div className="products">
        {currentProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination" style={{ textAlign: "center", marginTop: 20 }}>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active-page-btn" : ""}
              >
              {page}
            </button>
          );
        })}
        </div>
    )}
    </div>
  );
};

export default Products;
