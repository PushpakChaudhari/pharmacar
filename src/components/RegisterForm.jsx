import { useState } from 'react';
import { register } from '../api/auth';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './style/LoginForm.css';
export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setMessage('Registration successful!');
      setForm({ username: '', email: '', password: '' });
      if (onRegister) onRegister();
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="register-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body>
            <div className="text-center mb-4">
              <img src="https://imgs.search.brave.com/2MklXIO4RQUPivFWsHA8eTG5roYjXVfK-P_G2vQnQAw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9tWUFERTZIak02/cm93T19nZkxaaUFm/QW1JTzQ9LzM3OXg0/OjEzNTB4OTc1L2Zp/dC1pbi81MDB4NTAw/L3Byb2plY3RzLWZp/bGVzLzE4LzE4NzQv/MTg3NDM1LzljMDZm/YTQ4LWE2ZDQtODNl/YS03ODM4LWI2Y2E0/Yzc5ZDExNi5wbmc" alt="Pharmacare Logo" height="80" />
              <h5 className="mt-2 text-success fw-bold">Pharmacare</h5>
            </div>
            <h4 className="mb-3 text-center">Register</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="registerUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Register
              </Button>
              {message && (
                <div className="mt-3 text-center text-muted" style={{ fontSize: '0.9rem' }}>
                  {message}
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
