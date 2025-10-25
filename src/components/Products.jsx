import { useState, useEffect } from "react";
import { db } from "../db-firebase/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import Product from "./ProductCard.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let productsList = [];
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        productsList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Firebase Error:", error);
      } finally {
        setLoading(false);
        console.log(productsList); //Gamelist firebase
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    // return <h2>Cargando...</h2>;
  }

  return (
    <div className="products">
          
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}  
    </div>
  );
};

export default Products;
