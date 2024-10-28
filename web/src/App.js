import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'

import LoadingPage from './pages/Loading'
import LogInPage from './pages/LogIn'
import SignUpPage from './pages/SignUp'
import TokenPage from './pages/SignUp/Token'

import HomePage from './pages/Home'
import AppletPage from './pages/Applet'
import AreaPage from './pages/MyAreas'
import ProfilPage from './pages/Profil'
import NotFoundPage from './pages/NotFound'

export default function App() {
  return (
    <div className={"App"}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={ <LoadingPage /> } />
            <Route path="/login" element={
              <GoogleOAuthProvider clientId="733741385886-vj0nh2nl4d3727svetolbjvotckmuvk6.apps.googleusercontent.com">
                <LogInPage />
              </GoogleOAuthProvider> }
            />
            <Route path="/signup" element={ <SignUpPage /> } />
            <Route path="/token" element={ <TokenPage /> } />
            <Route path="/home" element={ <HomePage /> } />
            <Route path="/applets" element={ <AppletPage /> } />
            <Route path="/areas" element={ <AreaPage /> } />
            <Route path="/profil" element={ <ProfilPage /> } />
            <Route path="*" element={ <NotFoundPage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
