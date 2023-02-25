import { useState } from 'react'
import {Switch, Route} from "react-router-dom"

import Navbar from './components/navbar'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Navbar />
      
      <Switch>
        <Route />
        <Route />
        <Route />
      </Switch>
    </div>
  )
}

export default App
