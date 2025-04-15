import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Active');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const categoryData = {
            name: categoryName,
            status: status,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/categories', categoryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSuccess('Category added successfully!');
                setCategoryName('');
                setStatus('Active');
            }
        } catch (err) {
            setError('Error adding category. Please try again.');
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>Add Category</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="categoryName">
                        Category Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Status <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div>
                    <label>
    <input
        type="radio"
        value="Active"
        checked={status === true}
        onChange={handleStatusChange}
    />
    Active
</label>
<label>
    <input
        type="radio"
        value="Inactive"
        checked={status === false}
        onChange={handleStatusChange}
    />
    Inactive
</label>

                    </div>
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddCategory;
