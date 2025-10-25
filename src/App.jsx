import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { AppProvider } from './context/AppContext'

import NavBar from './components/NavBar.jsx'
import Products from './components/Products.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

export default function App() {
  //const [cartItems] = useState([])

  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];  
  //   localStorage.setItem("cartItems", JSON.stringify(savedCart))
  //   console.log(savedCart);
  // }, [cartItems]);

  return (
    <>
      <NavBar/>
      <Routes>
        {<Route path="/" element={<Products/>} />}
        {<Route path="/product/:id" element={<ProductDetail/>} />}
      </Routes> 
    </>
  )
}

