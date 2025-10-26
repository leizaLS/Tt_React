import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // LocalStorage cada vez que cambie cartItems
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito 
  const addToCart = (productId) => {
    setCartItems((prev) => [...prev, productId]);
  };

  // Cantidad de productos en el carrito
  const cartCount = cartItems.length;

  const value = {
    cartItems,
    addToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook para usar el contexto fácilmente
export const useCart = () => useContext(CartContext);
