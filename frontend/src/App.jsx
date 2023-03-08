import { Routes, Route } from "react-router-dom"
import { HomepageContainer, LoginContainer, SignupContainer } from './components/containers'
import './App.css'

const App = () => {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<HomepageContainer />} />
        <Route path="/signup" element={<SignupContainer />} />
        <Route path="/login" element={<LoginContainer />} />
      </Routes>
    </div>
  )
}

export default App
