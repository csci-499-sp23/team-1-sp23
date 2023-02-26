import { Routes, Route } from "react-router-dom"
import { HomepageContainer, SignupContainer } from './components/containers'
import Navbar from './components/navbar'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Navbar />
       
      <Routes>
        <Route path="/" element={<HomepageContainer />} />
        <Route path="/signup" element={<SignupContainer />} />
      </Routes>
    </div>
  )
}

export default App
