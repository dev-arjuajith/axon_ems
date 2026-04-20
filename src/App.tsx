 import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './feature/login/LoginPage';
import Dashboard from './feature/dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/:tabId" element={<Dashboard />} />
    </Routes>
  ) 
}

export default App
