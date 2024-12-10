import React, { useEffect } from "react";
import './App.css'; 
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Wishlist from './Pages/Wishlist';
import { Routes, Route } from 'react-router-dom';
import View from './Pages/View';
import { useDispatch } from 'react-redux';
import { fetchProduct } from './Redux/productSlice';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct()); // Fetch products when the app starts
  }, [dispatch]);
  return (
   <>
   

   <Routes>
    
    <Route element={<Home/>} path='/'/>
    <Route element={<Cart/>} path='/cart'/>
    <Route element={<Wishlist/>} path='/wishlist'/>
    <Route element={<View/>} path='/view/:id'/>
  </Routes>


  <Footer />
   </>
  );
}

export default App;
