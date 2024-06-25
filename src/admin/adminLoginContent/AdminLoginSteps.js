import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AccountCircle, Login, CloudUpload, People } from '@mui/icons-material';
import './AdminLoginSteps.css';

const AdminLoginSteps = () => {
  return (
    <Container className="admin-login-steps">
      <Row>
        <Col sm={3}>
          <Card className="step-box step-box-register">
            <Card.Body>
              <AccountCircle className="step-icon" />
              <Card.Title>Register On Jashanz</Card.Title>
              <Card.Text>
                Begin your journey by creating an account on Jashanz. It's quick and simple!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="step-box step-box-signin">
            <Card.Body>
              <Login className="step-icon" />
              <Card.Title>Make SignIn</Card.Title>
              <Card.Text>
                Access your account by signing in with your credentials. Your dashboard awaits!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="step-box step-box-upload">
            <Card.Body>
              <CloudUpload className="step-icon" />
              <Card.Title>Upload Advertisement</Card.Title>
              <Card.Text>
                Post your advertisements . Reach potential customers effortlessly!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="step-box step-box-customers">
            <Card.Body>
              <People className="step-icon" />
              <Card.Title>Get Free Customers</Card.Title>
              <Card.Text>
                Enjoy the influx of free customers discovering your services. Watch your business grow!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLoginSteps;
