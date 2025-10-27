// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { AppProvider } from './context/AppContext'

import NavBar from './components/NavBar.jsx'
import Products from './components/Products.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import { Routes, Route } from 'react-router-dom'
// import { useEffect } from 'react'

export default function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        {<Route path="/" element={<Products/>} />}
        {<Route path="/product/:id" element={<ProductDetail/>} />}
        {<Route path="/cart" element={<Cart/>} />}
      </Routes> 
    </>
  )
}

