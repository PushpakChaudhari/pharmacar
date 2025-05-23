import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import AddCategory from './components/AddCategory';
import CategoryList from "./components/CategoryList";
import RegisterForm from "./components/RegisterForm";
import AddMedicine from "./components/AddMedicine";
import DashboardContainer from "./components/DashboardContainer";
import MedicalList from "./components/MedicalList";
import ProtectedRoute from "./pages/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import ResetPasswordForm from "./components/ResetPasswordForm";
import ForgotPasswordRequestForm from "./components/ForgotPasswordRequestForm";
function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const flag = localStorage.getItem('isAuthenticated');
  
    if (!token || flag !== 'true') return false;
  
    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        console.log("Token expired");
        localStorage.clear();
        return false;
      }
      return true;
    } catch (err) {
      console.error("Token decode error:", err);
      localStorage.clear();
      return false;
    }
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register-form" element={<RegisterForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} /> {/* ✅ Add this */}
        <Route path="/forgot-password" element={<ForgotPasswordRequestForm />} />
        {/* Protect the dashboard route */}
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>}>
          <Route path="default" element={<DashboardContainer />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="add-medicine" element={<AddMedicine />} />
          <Route path="medicine-list" element={<MedicalList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
