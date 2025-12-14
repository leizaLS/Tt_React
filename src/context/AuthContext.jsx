import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  //Restaurar sesión
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("authRole");
    const username = localStorage.getItem("authUser");

    if (token && role && username) {
      setUsuario({ nombre: username, role });
    }
  }, []);

  //Login
  const login = (username, password) => {
    // ADMIN
    if (username === "admin" && password === "1234.react") {
      localStorage.setItem("authToken", "fake-token-admin");
      localStorage.setItem("authUser", username);
      localStorage.setItem("authRole", "admin");

      setUsuario({ nombre: username, role: "admin" });

      toast.success("Logueado como Administrador", {
        style: { backgroundColor: "#37AA9C" }
      });

      return true;
    }

    // USUARIO NORMAL
    if (username && password) {
      localStorage.setItem("authToken", `fake-token-${username}`);
      localStorage.setItem("authUser", username);
      localStorage.setItem("authRole", "user");

      setUsuario({ nombre: username, role: "user" });

      toast.success(`Bienvenido ${username}`, {
        style: { backgroundColor: "#37AA9C" }
      });

      return true;
    }

    return false;
  };

  //Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authRole");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
