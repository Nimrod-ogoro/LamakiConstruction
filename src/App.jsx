import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Merchandise from './pages/Merchandise'


import Residential from './pages/Residential'
import ProjectManagement from './pages/ProjectManagement'

import Renovations from './pages/Renovations'
import Commercial from './pages/Commercial'
import AdminDashboard from './Dashboard/AdminDasboard'
import MerchShop from './Merch/MerchShop'
import Checkout from './Merch/CheckOut'
import Cart from './Merch/Cart'
import OrderSuccess from './Merch/orderSucces'
import Login from './auth/login'
import SignUp from './auth/signup'
import { AuthProvider } from './auth/authContext'




const App = () => {
  return (
   <BrowserRouter>
   <AuthProvider>
    <Routes>
      <Route path="/" element={<Index/>} /> 
      <Route path='/Merchandise' element={<Merchandise/>}/>
      {/*<Route path='/checkOut' element={<CheckOut/>}/>*/}
      <Route path='/Residential' element={<Residential/>}/>
      <Route path='/ProjectManagemnet' element={<ProjectManagement/>}/>
      <Route path='/Commercial' element={<Commercial/>}/>
      <Route path='/Renovations' element={<Renovations/>}/>
      <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
      <Route path='/MerchShop' element={<MerchShop/>}/>
      <Route path='/CheckOut' element={<Checkout/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/orderSuccess' element={<OrderSuccess/>}/>
    <Route path='/Login' element={<Login/>} />
    <Route path='Signup' element={<SignUp/>}/>      
    <Route path="*" element={<NotFound/>} />
    </Routes>
    </AuthProvider>
   </BrowserRouter>

  )
}

export default App

