import { useEffect, useState } from "react";
import { useCart } from "../context/context";
import { db } from "../db-firebase/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import cartEmpty from "../img/cart-empty.png";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, changeQuantity, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Obtener productos desde Firebase
  useEffect(() => {
    const fetchProductsFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromFirebase();
  }, []);

  // 🔹 Vincular los productos del carrito con los datos de Firebase
  const cartItemsWithDetails = cartItems
    .map((item) => {
      const product = products.find(
        (p) => p.id?.toString() === item.productId?.toString()
      );
      if (!product) return null;

      const priceNum = parseFloat(product.price?.replace("$", "")) || 0;
      return {
        ...product,
        quantity: item.quantity,
        numericPrice: priceNum,
        subtotal: priceNum * item.quantity,
      };
    })
    .filter((item) => item !== null);

  // 🔹 Calcular total del carrito
  const totalPrice = cartItemsWithDetails.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  // 🔹 Controlar cambios de cantidad
  const handleQuantityChange = (productId, delta) => {
    changeQuantity(productId, delta);
  };

  if (loading) return;

  return (
    <main className="container">
      <div className="detail">
        <h3>Detalle de compra:</h3>

        <div className="items">
          {cartItemsWithDetails.length === 0 ? (
            <div className="emptyMsg">
              <img src={cartEmpty} alt="empty cart" />
              <h3>No tienes productos en el carrito</h3>
            </div>
          ) : (
            cartItemsWithDetails.map((item) => (
              <div key={item.id} className="item">
                <Link to={`/product/${item.id}`}>
                  <img src={item.capsule_image} alt={item.name} />
                </Link>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">
                    {item.price} x {item.quantity} = $
                    {item.subtotal.toFixed(2)}
                  </p>
                  <div className="qty-controls">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, +1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItemsWithDetails.length > 0 && (
          <div className="cart-total">
            <button onClick={clearCart}>Vaciar carrito</button>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        )}
      </div>

      {/* Formulario de pago */}
      {cartItemsWithDetails.length > 0 && (
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
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              required
            />
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Apellido"
              required
            />
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Ciudad"
              required
            />
            <input
              type="text"
              id="billing-address"
              name="billingAddress"
              placeholder="Dirección de facturación"
              required
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Teléfono de contacto"
              required
            />

            <button type="submit">Confirmar compra</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default Cart;
