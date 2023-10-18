import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CreateAccount(){

    return(
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-primary">
            <h1 className="text-black mt-4">Create Your Account</h1>
            <Form className="mt-4 bg-light">
                <Form.Group className="mb-3 ms-3 my-3 mx-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 ms-3 mx-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
  
                <Button className="ms-3 my-3" variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    );
}
