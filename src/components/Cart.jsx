// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../context/context";

const Cart = () => {
    return (
    <div className="pay_method">
      
      <form className="payment-form" >
        <h4>Información de Pago</h4>
        <label htmlFor="card-type">Complete con datos de su tarjeta:</label>
        
        <select id="card-type" name="cardType" value="" onChange="" required>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
        </select>

        
        <input type="tel" id="card-number" name="cardNumber" placeholder="Número de tarjeta" required maxLength="19" value="" onChange="" />
        <input type="text" id="expiry-date" name="expiryDate" placeholder="MM/AA" required maxLength="5" value="" onChange="" />
        <input type="text" id="security-code" name="securityCode" placeholder="CVV" required maxLength="3" pattern="\d{3}" value="" onChange="" />

        <h4>Información de facturación</h4>
        <label htmlFor="name">Complete con sus datos:</label>
        <input type="text" id="name" name="name" placeholder="Nombre" required value="" onChange="" />
        <input type="text" id="surname" name="surname" placeholder="Apellido" required value="" onChange="" />
        <input type="text" id="city" name="city" placeholder="Ciudad" required value="" onChange="" />
        <input type="text" id="billing-address" name="billingAddress" placeholder="Dirección de facturación" required value="" onChange="" />
        <input type="tel" id="phone" name="phone" placeholder="Teléfono de contacto" required value="" onChange="" />
        
        <button type="submit">Confirmar compra</button>
      </form>
    </div>
  );
};

export default Cart;