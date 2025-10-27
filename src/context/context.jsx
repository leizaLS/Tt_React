import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambia cartItems
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Obtener los productos almacenados en localStorage (con precios)
  const getProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  };

  // Calcular el total del carrito
  const calculateTotal = () => {
    const products = getProductsFromLocalStorage();  // Obtener productos de localStorage
    return cartItems.reduce((total, { productId, quantity }) => {
      const product = products.find(p => p.id === parseInt(productId));  // Buscar el producto por id
      const price = product ? parseFloat(product.price.replace('$', '')) : 0;
      return total + (price * quantity);  // Sumar precio * cantidad
    }, 0);
  };

  // Agregar producto al carrito
  const addToCart = (productId) => {
  console.log('Producto agregado al carrito:', productId);
  setCartItems((prev) => {
    const updatedCart = [...prev];
    const existingProductIndex = updatedCart.findIndex(item => item.productId === productId.toString());
    
    console.log('Producto ya en carrito?', existingProductIndex !== -1);
    console.log('Estado previo:', updatedCart);

    if (existingProductIndex === -1) {
      updatedCart.push({ productId: productId.toString(), quantity: 1 });
    } else {
      updatedCart[existingProductIndex].quantity += 1;
      console.log('Cantidad del producto incrementada');
    }

    console.log('Estado actualizado:', updatedCart);
    return updatedCart;
    });
  };

  // Cambiar la cantidad de productos en el carrito
  const changeQuantity = (productId, delta) => {
    setCartItems((prev) => {
      const updatedCart = [...prev];
      const productIndex = updatedCart.findIndex(item => item.productId === productId.toString()); // Comparar como cadena

      if (productIndex !== -1) {
        const newQuantity = updatedCart[productIndex].quantity + delta;
        if (newQuantity > 0) {
          updatedCart[productIndex].quantity = newQuantity;
        } else {
          updatedCart.splice(productIndex, 1);  // Si la cantidad es 0 o menos, eliminar el producto
        }
      }

      return updatedCart;
    });
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Cantidad total de productos en el carrito
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    changeQuantity,
    clearCart,
    calculateTotal,
    cartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
