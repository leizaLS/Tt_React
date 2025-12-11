import { createContext, useContext, useState, useEffect } from "react";

//Crear contexto
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //Guardar carrito en localStorage automáticamente cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = [...prev];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.productId === productId.toString()
      );

      if (existingProductIndex === -1) {
        updatedCart.push({ productId: productId.toString(), quantity: 1 });
      } else {
        updatedCart[existingProductIndex].quantity += 1;
      }
      return updatedCart;
    });
  };

  //  Cambiar cantidad (botones + / -)
  const changeQuantity = (productId, delta) => {
    setCartItems((prev) => {
      const updatedCart = [...prev];
      const index = updatedCart.findIndex(
        (item) => item.productId === productId.toString()
      );

      if (index !== -1) {
        const newQuantity = updatedCart[index].quantity + delta;
        if (newQuantity > 0) {
          updatedCart[index].quantity = newQuantity;
        } else {
          updatedCart.splice(index, 1); // Eliminar si llega a 0
        }
      }
      return updatedCart;
    });
  };

  //Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  //Calcular total (precio)/localStorage
  const calculateTotal = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    return cartItems.reduce((total, { productId, quantity }) => {
      const product = storedProducts.find(
        (p) => p.id?.toString() === productId?.toString()
      );
      const price = parseFloat(product?.price?.replace("$", "")) || 0;
      return total + price * quantity;
    }, 0);
  };

  //Cantidad total dentro de carrito
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        changeQuantity,
        clearCart,
        calculateTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
