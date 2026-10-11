import React from 'react'
import Container from './components/Container'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './components/layouts/RootLayout'
import Home from './components/pages/Home'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RootLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login  />}/>
          <Route path='/profile' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
