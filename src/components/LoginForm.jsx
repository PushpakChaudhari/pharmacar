import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import './style/LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      
      // Store token and username in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('isAuthenticated', 'true');
  
      alert(res.data.message); // "Login successful"
      navigate('/dashboard/default');
    } catch (err) {
      alert("Login failed: " + (err.response?.data || err.message));
    }
  };
  

  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body>
            <div className="text-center mb-4">
              <img src="https://imgs.search.brave.com/2MklXIO4RQUPivFWsHA8eTG5roYjXVfK-P_G2vQnQAw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9tWUFERTZIak02/cm93T19nZkxaaUFm/QW1JTzQ9LzM3OXg0/OjEzNTB4OTc1L2Zp/dC1pbi81MDB4NTAw/L3Byb2plY3RzLWZp/bGVzLzE4LzE4NzQv/MTg3NDM1LzljMDZm/YTQ4LWE2ZDQtODNl/YS03ODM4LWI2Y2E0/Yzc5ZDExNi5wbmc" alt="Pharmacare Logo" height="80" />
              <h5 className="mt-2">Pharmacare</h5>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>

                      <div className="d-flex justify-content-between mb-3">
  <a href="/forgot-password" className="small">Forgot password?</a>
  <a href="/register-form" className="small">Register</a>
</div>

              <Button variant="success" type="submit" className="w-100">
                Sign in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginForm;
