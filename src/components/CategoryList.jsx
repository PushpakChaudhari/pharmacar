import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Add this at the top

const API_URL = 'https://pharmacare-backend.onrender.com/api/categories';

export default function EditDeleteCategory() {
  const [categories, setCategories] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ id: null, name: '', status: 'Active' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Inside your component

  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setFormData({
      id: category.id,
      name: category.name,
      status: category.status ? 'Active' : 'Inactive',
    });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedCategory = {
        name: formData.name,
        status: formData.status === 'Active' // Ensure status is a boolean
    };
    try {
        const response = await axios.put(
            `${API_URL}/${editingCategory}`,
            updatedCategory,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("Category updated:", response.data);
        setStatusMessage('Category updated successfully.');
        setStatusType('success');
        setEditingCategory(null);
        setFormData({ name: '', status: 'Active' });
        setShowModal(false);
        fetchCategories(); // Refresh the category list
    } catch (err) {
        console.error('Update error:', err);
        setStatusMessage('Failed to update category.');
        setStatusType('danger');
        // Optionally, display an error message to the user
    }
};


  const filteredItems = categories.filter(
    item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: 'SL',
      selector: (_, index) => index + 1,
      width: '70px',
    },
    {
      name: 'Category Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (row.status ? 'Active' : 'Inactive'),
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleEdit(row)}
          >
            ✏️ 
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.id)}
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Manage Categories</h2>

        {/* Search Bar */}
        <div className="mb-3 d-flex justify-content-end">
          <input
            type="text"
            placeholder="Search by category name..."
            className="form-control w-50"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button className="btn btn-success ms-3" onClick={() => navigate('/dashboard/add-category')}>
  ➕ Add Category
</button>

        </div>
        {statusMessage && (
          <div className={`alert alert-${statusType} alert-dismissible fade show`} role="alert">
            {statusMessage}
            <button type="button" className="btn-close" onClick={() => setStatusMessage('')} aria-label="Close"></button>
          </div>
        )}

        {/* Category Table */}
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
        <>
          <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow">
                <form onSubmit={handleUpdate}>
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Category</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">Category Name</label>
                      <input
                        type="text"
                        id="categoryName"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="categoryStatus" className="form-label">Status</label>
                      <select
                        id="categoryStatus"
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      💾 Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
