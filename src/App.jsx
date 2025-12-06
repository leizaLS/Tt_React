import NavBar from './components/NavBar.jsx';
import Products from './components/Products.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Cart from './components/Cart.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import AuthModal from "./components/AuthModal.jsx";
import { useState } from "react";

const NotFound = () => (
  <div>
    <h1>Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
  </div>
);

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <>
        <NavBar openAuthModal={() => setShowAuthModal(true)} />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />

          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        <AuthModal
          showModal={showAuthModal}
          closeModal={() => setShowAuthModal(false)}
        />
      </>
    </AuthProvider>
  );
}
