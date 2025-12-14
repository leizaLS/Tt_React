import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <h2>No tienes permiso para acceder a esta sección.</h2>;
  }

  if (usuario.role !== "admin") {
    return <h2>No tienes permiso para acceder a esta sección.</h2>;
  }

  return children;
}

