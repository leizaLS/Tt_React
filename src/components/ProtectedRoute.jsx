import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // evita errores al refrescar

  if (!isAuthenticated) { // si no esta logueado, redirijimos a home
    console.log("** Se intentó entrar al dashboard no siendo admin")
    return <Navigate to="/" replace />;
  }

  return children;
}
