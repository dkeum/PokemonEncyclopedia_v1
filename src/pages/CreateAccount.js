import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      if (password !== confirmPassword) {
        setError('Password and confirm password do not match');
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-primary">
      <h1 className="text-black mt-4">Create Your Account</h1>
      <Form className="mt-4 bg-light" onSubmit={createAccount}>
        <Form.Group className="mb-3 ms-3 my-3 mx-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 ms-3 mx-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 ms-3 mx-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="ms-3 my-3" variant="primary" type="submit">
          Create
        </Button>
      </Form>
      {error && <p>{error}</p>}
    </div>
  );
}
