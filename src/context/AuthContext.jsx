import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Restaurar sesión
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token && token.startsWith("fake-token-")) {
      const username = token.replace("fake-token-", "");
      const role = username === "a" ? "admin" : "user";

      setUsuario({ nombre: username, role });
    }
  }, []);

  // Login
  const login = (username, password) => {
  // Login Admin
  if (username === "admin" && password === "1234.react") {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    setUsuario({ nombre: username, role: "admin" });

    toast.success('Logueado como Administrador', {
      style: { backgroundColor: "#37AA9C" }
    });
    return true;
  }

  // Usuario normal
  if (username && password) {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    setUsuario({ nombre: username, role: "user" });

    toast.success(`Bienvenido ${username}`, {
      style: { backgroundColor: "#37AA9C" }
    });
    return true;
  }
  return false;
};

  // Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      isAuthenticated: !!usuario,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
