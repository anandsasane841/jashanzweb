// AdminsContent.jsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardContent, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import CakeIcon from "@mui/icons-material/Cake";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./AdminsContent.css"; // Import external CSS file

const AdminsContent = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card className="card">
            <CardContent>
              <div className="icon event"></div>

              <Typography variant="h5" className="title">
                Event Organizers
              </Typography>
              <Typography variant="body1" className="subtitle">
                Find professional event organizers to plan and manage events of
                any scale.
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card">
            <CardContent>
              <div className="icon host"></div>

              <Typography variant="h5" className="title">
                Hosts
              </Typography>
              <Typography variant="body1" className="subtitle">
                Hire charismatic hosts who can engage and entertain your guests.
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card">
            <CardContent>
              <div className="icon birthday"></div>
              <Typography variant="h5" className="title">
                Birthday Cafe
              </Typography>
              <Typography variant="body1" className="subtitle">
                Discover specialty birthday cake services for memorable
                celebrations.
              </Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="card">
            <CardContent>
              <div className="icon decorator"></div>
              <Typography variant="h5" className="title">
                Decorators
              </Typography>
              <Typography variant="body1" className="subtitle">
                Choose from skilled decorators who can transform any venue
                beautifully.
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card">
            <CardContent>
              <div className="icon performer"></div>
              <Typography variant="h5" className="title">
                Performers
              </Typography>
              <Typography variant="body1" className="subtitle">
                Book talented performers to entertain guests with music, dance,
                and more.
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card">
            <CardContent>
              <div className="icon banquet"></div>

              <Typography variant="h5" className="title">
                Banquets
              </Typography>
              <Typography variant="body1" className="subtitle">
                Explore banquet halls and venues suitable for various events and
                gatherings.
              </Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="card">
            <CardContent>
              <div className="icon dj"></div>
              <Typography variant="h5" className="title">
                DJ
              </Typography>
              <Typography variant="body1" className="subtitle">
                Hire DJs who can set the mood with the perfect playlist for your
                event.
              </Typography>
            </CardContent>
          </Card>
        </Col>
        {/* Add more columns and cards as needed for additional services */}
      </Row>
    </Container>
  );
};

export default AdminsContent;
