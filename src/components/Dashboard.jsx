import React from "react";
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <main style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px"}}>
      <h1>Dashboard de Administrador</h1>
      <br />

      <p>Bienvenido al panel de administración.</p>
      <p>● Para poder editar los datos de un producto ya registrado porfavor ingrese a su página dedicada en la pantalla principal y haga click en "Editar producto".</p>

      <br />
      <Link to="/addProduct">
        <button className="add-product-btn">Agregar nuevo Producto</button>
      </Link>
    </main>
  );
}
