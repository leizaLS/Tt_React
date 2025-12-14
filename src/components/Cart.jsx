import { useEffect, useState } from "react";
import { useCart } from "../context/context";
import { db } from "../db-firebase/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import cartEmpty from "../img/cart-empty.png";
import { Link } from "react-router-dom";
import dummyImg from "../img/dummy_product.jpg";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, changeQuantity, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Facturación
  const [billing, setBilling] = useState({
    name: "", surname: "", city: "", address: "", phone: "",
  });

  // Tarjeta
  const [card, setCard] = useState({ 
    type: "visa", number: "", expiry: "", cvv: "",
  });

  const [autoFill, setAutoFill] = useState(false);

  // Obtener productos firebase
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "games"));
      setProducts(snap.docs.map((d) => d.data()));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const cartItemsWithDetails = cartItems
    .map((item) => {
      const product = products.find(
        (p) => p.id?.toString() === item.productId?.toString()
      );
      if (!product) return null;

      const price = parseFloat(product.price?.replace("$", "")) || 0;
      return {
        ...product,
        quantity: item.quantity,
        subtotal: price * item.quantity,
      };
    })
    .filter(Boolean);

  const totalPrice = cartItemsWithDetails.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  // Autofill TEST (tarjeta + facturación)
  const handleAutofill = (checked) => {
    setAutoFill(checked);

    if (checked) {
      setBilling({
        name: "Cosme",
        surname: "Fulanito",
        city: "Buenos Aires",
        address: "Calle Falsa 123",
        phone: "1112345678",
      });

      setCard({
        type: "visa",
        number: "1111111111111111",
        expiry: "12/30",
        cvv: "123",
      });

    } else {
      //Reset datos
      setBilling({
        name: "", surname: "", city: "", address: "", phone: "",
      });

      setCard({
        type: "visa", number: "", expiry: "", cvv: "",
      });
    }
  };

  const handleConfirmPurchase = (e) => {
    e.preventDefault();

    toast.success("¡Gracias por su compra! 🎉", {
      style: { backgroundColor: "#37AA9C" },
    });

    clearCart();
    setAutoFill(false);
  };

  if (loading) return null;

  return (
    <main className="container">
      <div className="detail">
        <h3>Detalle de compra:</h3>

        <div className="items">
          {cartItemsWithDetails.length === 0 ? (
            <div className="emptyMsg">
              <img src={cartEmpty} alt="empty" />
              <h3>No tienes productos en el carrito</h3>
            </div>
          ) : (
            cartItemsWithDetails.map((item) => (
              <div key={item.id} className="item">
                <Link to={`/product/${item.id}`}>
                  <img src={item.capsule_image || dummyImg} alt={item.name} />
                </Link>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>
                    {item.price} x {item.quantity} = $
                    {item.subtotal.toFixed(2)}
                  </p>

                  <div className="qty-controls">
                    <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, +1)}>+</button>
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

            {/* CHECKBOX TEST */}
            <label style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
              <input
                type="checkbox"
                checked={autoFill}
                onChange={(e) => handleAutofill(e.target.checked)}
              />
              Rellenar con datos falsos
            </label>
          </div>
        )}
      </div>

      {cartItemsWithDetails.length > 0 && (
        <div className="pay_method">
          <form className="payment-form" onSubmit={handleConfirmPurchase}>
            <h4>Información de Pago</h4>

            <select
              value={card.type}
              onChange={(e) => setCard({ ...card, type: e.target.value })}
            >
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>

            <input
              type="tel"
              placeholder="Número de tarjeta"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="MM/AA"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              required
            />

            <h4>Información de facturación</h4>

            <input
              type="text"
              placeholder="Nombre"
              value={billing.name}
              onChange={(e) => setBilling({ ...billing, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={billing.surname}
              onChange={(e) => setBilling({ ...billing, surname: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={billing.city}
              onChange={(e) => setBilling({ ...billing, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Dirección"
              value={billing.address}
              onChange={(e) => setBilling({ ...billing, address: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={billing.phone}
              onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
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
