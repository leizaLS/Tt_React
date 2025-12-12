import { useState } from "react";
import { db } from "../db-firebase/firebase.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error("Por favor complete los datos requeridos", {
        style: { backgroundColor: "#a80000ff" }
      });
      return;
    }
    setLoading(true);

    try {
      const generatedId = `m${Date.now()}`;
      
      await setDoc(doc(collection(db, "games"), generatedId), {
        id: generatedId,
        name,
        description,
        price: `$${price}`,
        capsule_image: "/src/img/dummy_product.jpg"
      });

      toast.success('¡Producto agregado!', {
        style: { backgroundColor: "#3a403d" }
      });

      // Reset datos
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error al agregar:", error);
      toast.error('Error al agregar', {
        style: { backgroundColor: "#3a403d" }
      });
    }
    setLoading(false);
  };

  return (
    <main className="containerForm">
      <h2> Agregar nuevo producto </h2>

      <h3>*Por favor complete los siguientes datos</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text" value={name} placeholder="Nombre del producto"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          value={description}
          placeholder="Descripción del producto"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          value={price}
          placeholder="Precio (Solo números)"
          onChange={(e) => setPrice(e.target.value)}
        />

        <h4>*Si no se completaron los datos, no se añadirá el nuevo producto.</h4>
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Agregar producto"}
        </button>

        
        <Link to="/dashboard">
          <button id="dashboard-btn" style={{ backgroundColor: "#616161ff" }}>
            <i className="fa-solid fa-lock-open"></i> Volver a dashboard 
          </button>
        </Link>
                
      </form>
    </main>
  );
}
