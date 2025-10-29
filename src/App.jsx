// import { useState } from 'react'
// import { AppProvider } from './context/AppContext'

import NavBar from './components/NavBar.jsx'
import Products from './components/Products.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
// import { useEffect } from 'react'

const NotFound = () => (
  <div>
    <h1>Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
  </div>
);


export default function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/> 
    </>
  )
}

