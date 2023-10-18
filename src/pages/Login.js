import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-primary">
      <h1 className="text-black mt-4">Login to Your Account</h1>
      <Form className="mt-4 bg-light" onSubmit={logIn}>
        <Form.Group className="mb-3 ms-3 my-3 mx-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
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
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </Form.Group>

        <div className="d-flex justify-content-between ms-3 my-3">
          <Button variant="primary" type="submit">
            Submit
          </Button>

          <LinkContainer to="/createaccount">
            <Button className="mx-3" variant="primary" type="button">
              Create Account
            </Button>
          </LinkContainer>
        </div>

        {error && <p>There was a problem</p> }
      </Form>
    </div>
  );
}
