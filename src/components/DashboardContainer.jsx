import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CATEGORY_API_URL = "http://localhost:8080/api/categories";
const MEDICINE_API_URL = "http://localhost:8080/api/medicines";

const DashboardContainer = () => {
  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const invoiceDiscount = 0.02;
  const VAT_RATE = 0.05;

  useEffect(() => {
    fetchCategories();
    fetchAllMedicines();
  }, []);

  useEffect(() => {
    if (selectedCategoryId === "all") {
      fetchAllMedicines();
    } else {
      fetchMedicinesByCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API_URL);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchAllMedicines = async () => {
    try {
      const res = await axios.get(MEDICINE_API_URL);
      setMedicines(res.data);
    } catch (err) {
      console.error("Failed to fetch all medicines:", err);
    }
  };

  const fetchMedicinesByCategory = async (categoryId) => {
    try {
      const res = await axios.get(`${MEDICINE_API_URL}/category/${categoryId}`);
      setMedicines(res.data);
    } catch (err) {
      console.error("Failed to fetch medicines by category:", err);
    }
  };

  const calculateSummary = () => {
    const subtotal = selectedMedicines.reduce((sum, med) => {
      const qty = med.quantity || 1;
      const mrp = med.mrp || 0;
      return sum + qty * mrp;
    }, 0);

    const totalDiscount = selectedMedicines.reduce((sum, med) => {
      const qty = med.quantity || 1;
      const mrp = med.mrp || 0;
      const discount = med.discount || 0;
      return sum + qty * mrp * (discount / 100);
    }, 0);

    const vat = (subtotal - totalDiscount) * VAT_RATE;
    const grandTotal = subtotal - totalDiscount + vat - invoiceDiscount;

    return { subtotal, totalDiscount, vat, grandTotal };
  };

  return (
    <div className="row">
      {/* Sidebar */}
      <div className="col-md-2 border-end" style={{ height: "auto" }}>
        <h6 className="mt-3">Categories</h6>
        <ul className="list-group">
          <li
            className={`list-group-item ${selectedCategoryId === "all" ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedCategoryId("all")}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category.id}
              className={`list-group-item ${selectedCategoryId === category.id ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-md-10">
        <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
          <h4>New Sale</h4>
          <Form.Select style={{ width: "200px" }}>
            <option>Walking Customer</option>
          </Form.Select>
        </div>

        {/* Medicine Cards */}
        <div className="d-flex mb-4 gap-3 flex-wrap">
          {medicines.length > 0 ? (
            medicines.map((med) => (
              <div
                key={med.id}
                className="card"
                style={{ width: "150px", cursor: "pointer" }}
                onClick={() => {
                  if (!selectedMedicines.find((m) => m.id === med.id)) {
                    setSelectedMedicines([
                      ...selectedMedicines,
                      { ...med, quantity: 1 },
                    ]);
                  }
                }}
              >
                <img
                  src="https://imgs.search.brave.com/JUMbHIWKbGcFPlpjMr7jmD_JoZ2oysnqHKiSuUKOJfM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9t/ZWRpY2luZS1jYXBz/dWxlcy1nbG9iYWwt/aGVhbHRoLXdpdGgt/Z2VvbWV0cmljLXBh/dHRlcm4tZGlnaXRh/bC1yZW1peF81Mzg3/Ni0xMjY3NDIuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA"
                  className="card-img-top"
                  alt={med.name}
                />
                <div className="card-body text-center p-2">
                  <p className="card-text">{med.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No medicines to display.</p>
          )}
        </div>

        {/* Sales Table */}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Medicine Info</th>
              <th>Batch</th>
              <th>Expiry Date</th>
              <th>Qty</th>
              <th>MRP</th>
              <th>Discount %</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedMedicines.map((med) => {
              const qty = med.quantity || 1;
              const mrp = med.mrp || 0;
              const discount = med.discount || 0;
              const total = (qty * mrp * (1 - discount / 100)).toFixed(2);

              return (
                <tr key={med.id}>
                  <td>{med.name}</td>
                  <td>{med.batch || "N/A"}</td>
                  <td>{med.expiryDate || "MM/YY"}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => {
                        const updatedQty = parseInt(e.target.value, 10);
                        setSelectedMedicines((prev) =>
                          prev.map((m) =>
                            m.id === med.id ? { ...m, quantity: updatedQty } : m
                          )
                        );
                      }}
                    />
                  </td>
                  <td>{mrp.toFixed(2)}</td>
                  <td>{discount}%</td>
                  <td>{total}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        setSelectedMedicines((prev) =>
                          prev.filter((m) => m.id !== med.id)
                        )
                      }
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Summary */}
        {(() => {
          const { totalDiscount, vat, grandTotal } = calculateSummary();
          return (
            <>
              <div className="row mt-4">
                <div className="col-md-6 offset-md-6">
                  <Table borderless size="sm">
                    <tbody>
                      <tr><td>Invoice Discount:</td><td>{invoiceDiscount.toFixed(2)}</td></tr>
                      <tr><td>Total Discount:</td><td>{totalDiscount.toFixed(2)}</td></tr>
                      <tr><td>Total VAT:</td><td>{vat.toFixed(2)}</td></tr>
                      <tr><td>Grand Total:</td><td>{grandTotal.toFixed(2)}</td></tr>
                      <tr><td>Previous:</td><td>0.00</td></tr>
                      <tr><td>Change:</td><td>0.00</td></tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="warning">Full Paid</Button>
                <Button variant="success">Cash Payment</Button>
                <Button variant="primary">Bank Payment</Button>
              </div>

              <div className="d-flex justify-content-between mt-4 border-top pt-3">
                <div>Net Total: <strong>{grandTotal.toFixed(2)}</strong></div>
                <div>Paid Amount: <strong>0.00</strong></div>
                <div>Due Amount: <strong>{grandTotal.toFixed(2)}</strong></div>
              </div>
            </>
          );
        })()}
      </div> 
    </div> 
  );
};

export default DashboardContainer;
