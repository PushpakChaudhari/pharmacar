import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/medicines';
const CATEGORY_API = 'http://localhost:8080/api/categories';

export default function MedicalList() {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [filterText, setFilterText] = useState('');
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    batch: '',
    expiryDate: '',
    quantity: 0,
    mrp: 0,
    discount: 0,
    category: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const navigate = useNavigate();

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(API_URL);
      setMedicines(res.data);
      console.log('Fetched Medicines:', res.data); // Debugging line
    } catch (err) {
      console.error('Failed to fetch medicines:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);

      // Create a map: { id: name }
      const map = {};
      res.data.forEach(cat => {
        map[cat.id] = cat.name;
      });
      setCategoryMap(map);
      console.log('Category Map:', map); // Debugging line
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStatusMessage('Medicine deleted successfully.');
      setStatusType('success');
      fetchMedicines();
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setStatusMessage('Failed to delete medicine.');
      setStatusType('danger');
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine.id);

    setFormData({
      id: medicine.id || '',
      name: medicine.name || '',
      batch: medicine.batch || '',
      expiryDate: medicine.expiryDate || '',
      quantity: medicine.quantity ?? 0,
      mrp: medicine.mrp ?? 0,
      discount: medicine.discount ?? 0,
      category: medicine.category?.id ?? '',
    });

    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedMedicine = {
      id: editingMedicine, // ✅ Include ID
      name: formData.name,
      batch: formData.batch,
      expiryDate: formData.expiryDate,
      quantity: formData.quantity,
      mrp: formData.mrp,
      discount: formData.discount,
      category: {
        id: parseInt(formData.category),
      },
    };

    try {
      await axios.put(`${API_URL}/${editingMedicine}`, updatedMedicine, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setStatusMessage('Medicine updated successfully.');
      setStatusType('success');
      setEditingMedicine(null);
      setFormData({
        id: null,
        name: '',
        batch: '',
        expiryDate: '',
        quantity: 0,
        mrp: 0,
        discount: 0,
        category: '',
      });
      setShowModal(false);
      fetchMedicines();
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setStatusMessage('Failed to update medicine.');
      setStatusType('danger');
    }
  };

  const filteredItems = medicines.filter(
    item => item.name?.toLowerCase().includes(filterText.toLowerCase())
  );
  console.log('Filtered Medicines:', filteredItems); // Debugging line

  const columns = [
    { name: 'SL', selector: (_, index) => index + 1, width: '60px' },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Batch', selector: row => row.batch },
    { name: 'Expiry', selector: row => row.expiryDate },
    { name: 'Qty', selector: row => row.quantity, right: true },
    { name: 'MRP', selector: row => row.mrp, right: true },
    { name: 'Discount', selector: row => row.discount + '%', right: true },
    {
      name: 'Category',
      selector: row => categoryMap[row.category?.id] || 'Unknown',
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>✏️</button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>🗑️</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Manage Medicines</h2>

        <div className="mb-3 d-flex justify-content-end">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by medicine name..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button className="btn btn-success ms-3" onClick={() => navigate('/dashboard/add-medicine')}>
            ➕ Add Medicine
          </button>
        </div>

        {/* ✅ Status Alert */}
        {statusMessage && (
          <div className={`alert alert-${statusType} alert-dismissible fade show`} role="alert">
            {statusMessage}
            <button type="button" className="btn-close" onClick={() => setStatusMessage('')} aria-label="Close"></button>
          </div>
        )}

        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content border-0 shadow">
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Medicine</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Medicine Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Batch</label>
                    <input type="text" className="form-control" value={formData.batch} onChange={(e) => setFormData({ ...formData, batch: e.target.value })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input type="date" className="form-control" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">MRP</label>
                    <input type="number" className="form-control" value={formData.mrp} onChange={(e) => setFormData({ ...formData, mrp: parseFloat(e.target.value) })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Discount (%)</label>
                    <input type="number" className="form-control" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })} />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer mt-3">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">💾 Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
