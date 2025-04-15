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

function App() {
  const isAuthenticated = () => {
    // Check if the user is authenticated by checking a flag in local storage
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register-form" element={<RegisterForm />} />

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
