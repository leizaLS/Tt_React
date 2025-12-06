import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ showModal, closeModal }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const { login } = useAuth();

  const handleLogin = () => {
    const ok = login(user, pass);

    if (ok) {
      closeModal();
    } else {
      alert("Usuario o contraseña incorrectos (usa a / a)");
    }
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal">
          <span className="modal-close" onClick={closeModal}>
            &times;
          </span>

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

          {activeTab === 'register' && (
            <div className="tab-content">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Contraseña" />
              <button>Registrarse</button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default AuthModal;
