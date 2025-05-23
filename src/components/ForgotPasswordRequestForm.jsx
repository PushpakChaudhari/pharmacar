import React, { useState } from 'react';
import { sendResetLink } from '../api/auth';
import { Form, Button, Card, Container } from 'react-bootstrap';

const ForgotPasswordRequestForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendResetLink(email);
      setMessage(res.data.message || "Check your email for the reset link.");
    } catch (err) {
      setMessage("Failed to send reset link: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body>
            <h5 className="text-center mb-3">Forgot Password</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Send Reset Link
              </Button>
            </Form>
            {message && <p className="mt-3 text-center text-info">{message}</p>}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPasswordRequestForm;
