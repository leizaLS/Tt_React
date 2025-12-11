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
    if (username === "a" && password === "a") {
      const token = `fake-token-${username}`;
      localStorage.setItem("authToken", token);
      const role = username === "a" ? "admin" : "user";

      setUsuario({ nombre: username, role });
      toast.success('Logueado como Administrador', {
        style: { backgroundColor: "#37AA9C" }
      });
      return true;
    }
    else {
      toast.success('Bienvenido ' + username , {
        style: { backgroundColor: "#37AA9C" }
      });
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
