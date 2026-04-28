 import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from './feature/login/LoginPage';
import Dashboard from './feature/dashboard/Dashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("access_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/:tabId" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  ) 
}

export default App
