import { useState } from "react";
import { db } from "../db-firebase/firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";;

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "games"), {
        id: `m${Date.now()}`,
        name,
        description,
        price: `$${price}`,
        capsule_image:
          "https://drive.google.com/uc?export=view&id=1p6A1r9l2QRDeVEb-BjwE9DK3qF17Qv35"
      });

      alert("Producto agregado!");

      // Reset
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar producto");
    }

    setLoading(false);
  };

  return (
    <div
      className="container"
      style={{ maxWidth: 500, margin: "0 auto", display: "grid" }}
    >
      <h2>Agregar nuevo producto</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <textarea
          value={description}
          placeholder="Descripción"
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "-webkit-fill-available", height: "60px" }}
        />

        <br />

        <input
          type="number"
          value={price}
          placeholder="Precio (Solo números)"
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Agregar"}
        </button>
      </form>
    </div>
  );
}
