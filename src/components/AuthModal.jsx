import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ showModal, closeModal }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    const ok = login(user, pass);

    if (ok) {
      closeModal();
      setUser("");
      setPass("");
    } else {
      alert("Usuario o contraseña incorrectos (usa a / a)");
    }
  };

  // Si NO hay modal abierto, no renderizar nada
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        {/* BOTÓN PARA CERRAR */}
        <span className="modal-close" onClick={closeModal}>
          &times;
        </span>

        {/* ======================================
             SI EL USUARIO ESTÁ LOGUEADO → LOGOUT
           ====================================== */}
        {isAuthenticated ? (
          <div className="tab-content">
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              ¿Cerrar sesión?
            </h3>

            <button
              onClick={() => {
                logout();
                closeModal();
              }}
              style={{ width: "100%" }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            {/* TABS (LOGIN / REGISTRO) */}
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

            {/* =============================
                TAB: LOGIN
               ============================= */}
            {activeTab === 'login' && (
              <div className="tab-content">
                <input 
                  type="text" 
                  placeholder="Usuario" 
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
                
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                
                <button onClick={handleLogin}>Entrar</button>
              </div>
            )}

            {/* =============================
                TAB: REGISTRO (visual solo)
               ============================= */}
            {activeTab === 'register' && (
              <div className="tab-content">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Contraseña" />
                <button>Registrarse</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
