 import './App.css';
 import { Routes, Route } from "react-router-dom";
 import LoginPage from './feature/login/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  ) 
}

export default App
