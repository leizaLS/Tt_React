import React from "react";
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de administración.</p>

      <Link to="/addProduct">
        <button className="add-product-btn">Agregar Producto</button>
      </Link>
    </div>
  );
}
