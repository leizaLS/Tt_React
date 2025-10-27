import { useEffect, useState } from "react";
import { useCart } from "../context/context"; // Asegúrate de que el contexto maneje el carrito
import { db } from "../db-firebase/firebase.js"; // Asegúrate de importar correctamente tu configuración de Firebase
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const Cart = () => {
  const { cartItems, changeQuantity, clearCart, calculateTotal } = useCart();
  const [products, setProducts] = useState([]);  // Guardamos los productos obtenidos de Firebase
  const [loading, setLoading] = useState(true);  // Cargamos la información

  // Función para obtener los productos de Firebase
  const fetchProductsFromFirebase = async () => {
    setLoading(true);  // Activamos el estado de "loading"
    try {
      // Consulta a la colección de productos (games) en Firebase
      const querySnapshot = await getDocs(collection(db, "games"));
      const fetchedProducts = [];

      // Iteramos sobre cada documento obtenido
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        fetchedProducts.push({ 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          capsule_image: product.capsule_image, 
          genres: product.genres 
        });  // Guardamos el producto con los campos relevantes
      });

      // Actualizamos el estado de los productos
      setProducts(fetchedProducts);
      setLoading(false);  // Finalizamos la carga
    } catch (error) {
      console.error("Error fetching products from Firebase:", error);
      setLoading(false);  // Si hay error, también finalizamos la carga
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductsFromFirebase();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  // Función que se ejecuta al cambiar la cantidad de productos
  const handleChangeQuantity = (productId, delta) => {
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(item => item.productId === productId);

    if (index !== -1) {
      const newQuantity = updatedCart[index].quantity + delta;
      if (newQuantity > 0) {
        updatedCart[index].quantity = newQuantity;
      } else {
        updatedCart.splice(index, 1);  // Si la cantidad es 0 o menos, eliminar el producto
      }
    }

    // Actualizamos el carrito en el contexto
    changeQuantity(productId, delta);

    // Guardar carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Recalcular el total
  const totalPrice = calculateTotal();

  // Asociar los productos del carrito con los datos de Firebase
  const cartItemsWithDetails = cartItems.map((item) => {
    const product = products.find((p) => p.id.toString() === item.productId.toString());
    if (product) {
      return {
        ...product,
        quantity: item.quantity
      };
    }
    return null;
  }).filter(item => item !== null);  // Filtramos los productos nulos (si no se encuentra el producto)

  return (
    <main className="container">
      <div className="detail">
        <h3>Detalle de compra:</h3>
        <div className="items">
          {loading ? (
            <p>Cargando...</p>
          ) : cartItemsWithDetails.length === 0 ? (
            <div className="emptyMsg">
              <img src="../src/img/cart-empty.png" alt="empty cart" />
              <h3>No tienes productos en el carrito</h3>
            </div>
          ) : (
            cartItemsWithDetails.map((item) => {
              const totalProductPrice = parseFloat(item.price.replace('$', '')) * item.quantity;

              return (
                <div key={item.id} className="item">
                  <img src={item.capsule_image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="price">
                      {item.price} x {item.quantity} = ${totalProductPrice.toFixed(2)}
                    </p>
                    <div className="qty-controls">
                      <button >-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button>+</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-total">
          <button onClick={clearCart}>Vaciar carrito</button>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      </div>

      {/* Formulario de pago */}
      <div className="pay_method">
        <form className="payment-form">
          <h4>Información de Pago</h4>
          <label htmlFor="card-type">Seleccione el tipo de tarjeta:</label>
          <select id="card-type" name="cardType" required>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
          </select>

          <input
            type="tel"
            id="card-number"
            name="cardNumber"
            placeholder="Número de tarjeta"
            required
            maxLength="19"
          />
          <input
            type="text"
            id="expiry-date"
            name="expiryDate"
            placeholder="MM/AA"
            required
            maxLength="5"
          />
          <input
            type="text"
            id="security-code"
            name="securityCode"
            placeholder="CVV"
            required
            maxLength="3"
            pattern="\d{3}"
          />

          <h4>Información de facturación</h4>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" placeholder="Nombre" required />
          <input type="text" id="surname" name="surname" placeholder="Apellido" required />
          <input type="text" id="city" name="city" placeholder="Ciudad" required />
          <input
            type="text"
            id="billing-address"
            name="billingAddress"
            placeholder="Dirección de facturación"
            required
          />
          <input type="tel" id="phone" name="phone" placeholder="Teléfono de contacto" required />

          <button type="submit">Confirmar compra</button>
        </form>
      </div>
    </main>
  );
};

export default Cart;
