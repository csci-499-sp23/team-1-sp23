import { useState } from 'react'
import {Routes, Route} from "react-router-dom"

import { HomepageContainer, SignupContainer } from './components/containers'
import Navbar from './components/navbar'

import './App.css'

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path = "/" component = {HomepageContainer}/>
        <Route exact path="/signup" component={SignupContainer}/>
        <Route />
      </Routes>
    </div>
  )
}

export default App
