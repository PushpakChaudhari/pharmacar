import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication state
    localStorage.removeItem('isAuthenticated');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{ width: "200px", height: "100vh", position: "fixed" }}
      >
        <div>
          <h5 className="text-center mb-3">Logo</h5>

          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => navigate("default")}
          >
            Sales Page
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => navigate("add-category")}
          >
            Add Category
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => navigate("list-category")}
          >
            Category List
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => navigate("add-medicine")}
          >
            Add Medicine
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => navigate("medicine-list")}
          >
            Medicine List
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline-danger"
          className="w-100 mt-auto"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "200px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
