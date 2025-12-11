import { useState } from "react";
import { db } from "../db-firebase/firebase.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error("Error al guardar los cambios", {
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
