import { useState, useEffect } from "react";
import { db } from "../db-firebase/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import Product from "./ProductCard.jsx";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const { usuario, isAuthenticated } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Fetch productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        let productsList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // 🔥 FILTRAR SEGÚN PERMISOS
        if (!(isAuthenticated && usuario?.role === "admin")) {
          productsList = productsList.filter((p) => p.visibility === true);
        }

        setProducts(productsList);
      } catch (error) {
        console.error("Firebase Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated, usuario]);

  // Calcular columnas dinámicamente
  useEffect(() => {
    const calculateGrid = () => {
      const containerWidth = document.body.clientWidth;

      const cardWidth = 235;
      const gap = 20;
      const totalWidth = cardWidth + gap;

      const columns = Math.floor(containerWidth / totalWidth);

      const windowWidth = window.innerWidth;
      let rows = 3;

      if (windowWidth < 600) {
        rows = 12;
      }

      if (columns >= 1) {
        setItemsPerPage(columns * rows);
      }
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);

    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  if (loading) return null;

  // Paginación
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentProducts = products.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <main>
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
    </main>
  );
};

export default Products;
