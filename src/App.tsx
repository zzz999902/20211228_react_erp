import React from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Admin />} />
      </Routes>
    </HashRouter>
  )
}
