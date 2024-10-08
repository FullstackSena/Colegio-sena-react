import { useState } from 'react'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NavBar from './Components/Navbar/Navbar'
import ManageStudents from './Components/ManageStudents/ManageStudents'
import { Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/navbar" element={<NavBar />} />
      <Route path="/ManageStudents" element={<ManageStudents/>} />
    </Routes>
    </>
  )
}

export default App