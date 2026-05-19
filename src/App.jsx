import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import Equipo from "./pages/Equipo/Equipo"
import Crud from "./pages/crud/Crud"
import MainLayout from "./layout/MainLayout"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"

function App() {
  
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Equipo" element={<Equipo />} />
          <Route path="/crud" element={<Crud/>} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
      </MainLayout>
    </Router>
    
  )
}

export default App