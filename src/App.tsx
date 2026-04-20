 import './App.css';
 import { Routes, Route } from "react-router-dom";
 import LoginPage from './feature/login/LoginPage';
import Dashboard from './feature/dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  ) 
}

export default App
