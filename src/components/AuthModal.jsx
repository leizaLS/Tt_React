import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ showModal, closeModal }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [autoFillAdmin, setAutoFillAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    const ok = login(user, pass);

    if (ok) {
      closeModal();
      setUser("");
      setPass("");
      setAutoFillAdmin(false);
      setShowPassword(false);
    }
  };

  const handleAutofill = (checked) => {
    setAutoFillAdmin(checked);

    if (checked) {
      setUser("admin");
      setPass("1234.react");
    } else {
      setUser("");
      setPass("");
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        {/* BOTÓN CERRAR */}
        <span className="modal-close" onClick={closeModal}>
          &times;
        </span>

        {/* LOGOUT */}
        {isAuthenticated ? (
          <div className="tab-content">
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              ¿Cerrar sesión?
            </h3>

            <button
              onClick={() => {
                logout();
                closeModal();
                setUser("");
                setPass("");
                setAutoFillAdmin(false);
                setShowPassword(false);
              }}
              style={{ width: "100%" }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            {/* TABS */}
            <div className="tabs">
              <div
                className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </div>

              <div
                className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Registro
              </div>
            </div>

            {/* LOGIN */}
            {activeTab === 'login' && (
              <div className="tab-content">
                <input
                  type="text"
                  placeholder="Usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />

                {/* PASSWORD CON OJO */}
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    style={{ paddingRight: "40px" }}
                  />

                  <i
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "38%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#aaa"
                    }}
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  />
                </div>

                {/* AUTOFILL ADMIN */}
                <label
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    marginTop: "10px",
                    paddingRight: "20px",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={autoFillAdmin}
                    onChange={(e) => handleAutofill(e.target.checked)}
                  />
                  Probar Administrador
                </label>

                <button onClick={handleLogin}>Entrar</button>
              </div>
            )}

            {/* REGISTRO (placeholder) */}
            {activeTab === 'register' && (
              <div className="tab-content">
                <input type="email" placeholder="Email (Próximamente)" />
                <input type="password" placeholder="Contraseña (Próximamente)" />
                <button disabled>Registrarse</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
