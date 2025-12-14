import NavBar from './components/NavBar.jsx';
import Products from './components/Products.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Cart from './components/Cart.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NewProduct from "./components/NewProduct.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import AuthModal from "./components/AuthModal.jsx";
import { useState } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotFound = () => (
  <div>
    <h1>Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
  </div>
);

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthProvider>
      <>
        {/* Pasamos setSearchTerm al navbar */}
        <NavBar 
          openAuthModal={() => setShowAuthModal(true)}
          onSearchChange={setSearchTerm}   // conectar buscador
        />

        <Routes>
          {/* Página principal con búsqueda */}
          <Route 
            path="/" 
            element={<Products searchTerm={searchTerm} />} 
          />

          {/* Detalle del producto */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Carrito */}
          <Route path="/cart" element={<Cart />} />

          {/* Dashboard ADMIN */}
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Formulario agregar producto ADMIN */}
          <Route 
            path="/addProduct"
            element={
              <ProtectedRoute>
                <NewProduct />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          draggable
          pauseOnHover
          theme='colored'
        />

        <AuthModal
          showModal={showAuthModal}
          closeModal={() => setShowAuthModal(false)}
        />
      </>
    </AuthProvider>
  );
}
