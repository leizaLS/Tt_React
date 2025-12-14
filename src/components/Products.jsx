import { useState, useEffect } from "react";
import { db } from "../db-firebase/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import Product from "./ProductCard.jsx";
import { useAuth } from "../context/AuthContext";

const Products = ({ searchTerm = "" }) => {
  const { usuario, isAuthenticated } = useAuth();
  const isAdmin = isAuthenticated && usuario?.role === "admin"; // Determinar si es admin

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Solución para bug de búsqueda cuando no se está en la página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Fetch productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        let productsList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Filtrar productos por visibilidad si NO es admin
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

      let rows = 3;
      if (window.innerWidth < 600) rows = 12;

      if (columns >= 1) {
        setItemsPerPage(columns * rows);
      }
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);

    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  if (loading) return null;

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación sobre los productos filtrados
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <main>
      <div className="products">
        {currentProducts.map((product) => (
          <Product key={product.id} product={product} isAdmin={isAdmin} />
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
