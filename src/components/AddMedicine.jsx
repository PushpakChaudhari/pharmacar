import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: '',
    batch: '',
    expiryDate: '',
    quantity: '',
    mrp: '',
    discount: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch categories when component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/categories')
      .then((res) => {
        console.log('Fetched categories:', res.data);
        setCategories(res.data); // Fixed: assign directly if API returns an array
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      name: medicine.name,
      batch: medicine.batch,
      expiryDate: medicine.expiryDate,
      quantity: parseInt(medicine.quantity),
      mrp: parseFloat(medicine.mrp),
      discount: parseFloat(medicine.discount),
      category: {
        id: medicine.categoryId,
      },
    };

    try {
      console.log("Payload to send:", payload);

      const response = await axios.post('http://localhost:8080/api/medicines', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Medicine added successfully!');
        setMedicine({
          name: '',
          batch: '',
          expiryDate: '',
          quantity: '',
          mrp: '',
          discount: '',
          categoryId: '',
        });
      }
    } catch (err) {
      console.error('Error adding medicine:', err);
      setMessage('Failed to add medicine.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Medicine</h2>
      {message && <div style={styles.message}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={medicine.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="batch"
            placeholder="Batch"
            value={medicine.batch}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="date"
            name="expiryDate"
            value={medicine.expiryDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={medicine.quantity}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="number"
            name="mrp"
            placeholder="MRP"
            step="0.01"
            value={medicine.mrp}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            step="0.01"
            value={medicine.discount}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <select
            name="categoryId"
            value={medicine.categoryId}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Category</option>
            {Array.isArray(categories) && categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={styles.button}>Add Medicine</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginBottom: '15px',
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default AddMedicine;
