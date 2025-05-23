// src/components/ResetPasswordForm.jsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/auth';
const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword({ token, newPassword: password });
      
      setMessage(res.data.message || "Password reset successfully!");
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setMessage("Reset failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body>
            <h5 className="text-center mb-3">Reset Password</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Reset Password
              </Button>
            </Form>
            {message && <p className="mt-3 text-center text-info">{message}</p>}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResetPasswordForm;
