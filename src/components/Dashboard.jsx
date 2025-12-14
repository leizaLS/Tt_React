import React from "react";
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <main style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px"}}>
      <h1>Dashboard de Administrador</h1>
      <br />

      <p>Bienvenido al panel de administración. Lea con atención porfavor:</p>
      <p>● Para poder editar los datos de un producto ya registrado ingrese a su página dedicada en la pantalla principal y haga click en "Editar producto".</p>
      <p>● Un producto cargado no se puede eliminar, pero si se lo puede poner "invisible" para el usuario normal (soft delete).</p>
      <p>● En la pantalla principal los producto "invisibles" tienen un icono a su izquierda.</p>

      <br />
      <Link to="/addProduct">
        <button className="add-product-btn">Agregar nuevo Producto</button>
      </Link>
    </main>
  );
}
