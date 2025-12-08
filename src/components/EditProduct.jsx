import React, { useState } from "react";
import { db } from "../db-firebase/firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

export default function EditProduct({ product, closeModal }) {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(
    product.isSteam && !product.description ? "" : product.description || ""
  );
  const [price, setPrice] = useState(
    product.price?.replace("$", "") || ""
  );
  const [visibility, setVisibility] = useState(product.visibility ?? true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      await setDoc(
        doc(db, "games", product.id),
        {
          id: product.id,
          name,
          description,
          price: `$${price}`,
          visibility,
          capsule_image: product.capsule_image
        },
        { merge: true }
      );

      alert("Producto actualizado correctamente.");
      window.location.reload();


    } catch (err) {
      console.error("Error guardando:", err);
      alert("Error al guardar los cambios.");
    }

    setSaving(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        {/* BOTÓN PARA CERRAR */}
        <span className="modal-close" onClick={closeModal}>
          &times;
        </span>

        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Editar producto
        </h3>

        <div className="tab-content">

          {/* Name */}
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder={
              product.isSteam
                ? "Descripción (vacío = usar descripción de Steam)"
                : "Descripción"
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: "80px" }}
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Precio (números)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Visibility */}
          <label style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              checked={visibility}
              onChange={(e) => setVisibility(e.target.checked)}
              style={{ marginRight: "5px" }}
            />
            Visible en la tienda
          </label>

          <button onClick={handleSave} disabled={saving} style={{ marginTop: "15px" }}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

        </div>
      </div>
    </div>
  );
}
