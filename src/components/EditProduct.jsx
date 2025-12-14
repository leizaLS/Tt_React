import React, { useState } from "react";
import { db } from "../db-firebase/firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { toast } from "react-toastify";

export default function EditProduct({ product, closeModal }) {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(
    product.isSteam && !product.description ? "" : product.description || ""
  );
  const [price, setPrice] = useState(product.price?.replace("$", "") || "");
  const [visibility, setVisibility] = useState(product.visibility ?? true);
  const [saving, setSaving] = useState(false);

  // Validación de campos antes de guardar
  const validateFields = () => {
    if (!name.trim()) {
      toast.error("El nombre del producto es obligatorio", {
        style: { backgroundColor: "#a80000ff" }
      });
      return false;
    }
    if (!description.trim()) {
      toast.error("La descripción del producto es obligatoria", {
        style: { backgroundColor: "#a80000ff" }
      });
      return false;
    }
    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      toast.error("El precio debe ser un número mayor a cero", {
        style: { backgroundColor: "#a80000ff" }
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return; // Solo guarda si la validación es exitosa

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
      toast.success("Producto actualizado correctamente", {
        style: { backgroundColor: "#28a745" }
      });
      window.location.reload(); // Recarga la página para reflejar los cambios

    } catch (err) {
      console.error("Error guardando:", err);
      toast.error("Error al guardar los cambios", {
        style: { backgroundColor: "#a80000ff" }
      });
    }

    setSaving(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal" id="editProd">

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
                ? "Descripción"
                : "Descripción"
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Precio (números)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Visibility */}
          <label>
            <input
              type="checkbox"
              checked={visibility}
              onChange={(e) => setVisibility(e.target.checked)}
              style={{ width: "30px" }}
            />
            Visible en la tienda
          </label>
          <br />
          <button onClick={handleSave} disabled={saving} style={{ marginTop: "15px" }}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

        </div>
      </div>
    </div>
  );
}
