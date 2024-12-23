import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar/> 
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

function RequireAuth() {
  const {currentUser}=useContext(AuthContext)
  const location = useLocation()
  const isTakeQuizPage = location.pathname === '/take-quiz';

  return (
    !currentUser ? (<Navigate to="/login"/>):
    (<div className="layout">
      {!isTakeQuizPage && <div className="navbar"><Navbar/> </div>}
      <div className="content">
        <Outlet/>
      </div>
    </div>
    )
  )
}

export {Layout,RequireAuth};