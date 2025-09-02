import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Merchandise from './pages/Merchandise'

import Cart from './pages/Cart'
import Residential from './pages/Residential'
import ProjectManagement from './pages/ProjectManagement'

import Renovations from './pages/Renovations'
import Commercial from './pages/Commercial'
import AdminDashboard from './Dashboard/AdminDasboard'

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index/>} /> 
      <Route path='/Merchandise' element={<Merchandise/>}/>
      {/*<Route path='/checkOut' element={<CheckOut/>}/>*/}
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Residential' element={<Residential/>}/>
      <Route path='/ProjectManagemnet' element={<ProjectManagement/>}/>
      <Route path='/Commercial' element={<Commercial/>}/>
      <Route path='/Renovations' element={<Renovations/>}/>
      <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
   </BrowserRouter>

  )
}

export default App

