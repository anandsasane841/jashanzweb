import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { toast } from 'react-toastify';
import JashanService from "./service/JashanService";
import {
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Snackbar,
  Toolbar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";


const Header = ({ isLoggedIn }) => {
  const [notification, setNotification] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminClick = () => {
    setAnchorEl(null);
    navigate(`/admin`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can save the dark mode preference to local storage here
  };
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const handleLogout = () => {
    const token = window.localStorage.getItem("token");
    const adminToken = window.localStorage.getItem("admin-token");
    
    if (token !== null) {
        window.localStorage.removeItem("token"); // Removing token if present
    } else if (adminToken !== null) {
      window.localStorage.removeItem("admin-token"); // Removing admin token if present
    }
    
    window.localStorage.clear(); // Clearing all localStorage items
    toast.success("Successfully logged out");
    navigate(`/`, { state: { isLoggedout: true } });
};


  const handleLinkClick = () => {
    window.open(
      "mailto:support@jashanz.com?subject=Query%20Regarding%20Recent%20Event:%20Let's%20Discuss"
    );
  };
  const handleLinkBookingStatus = () => {
    navigate(`/bookings-status`);
  };
  

  const handleLinkAdminSection = () => {
    navigate(`/admin`);
  };

  
  const handleLinkAboutus = () => {
    navigate(`/aboutus`);
  };
  return (
    <nav class="custom-nav">
      <Container maxWidth="lg">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            
            <a className="brand-navbar" href="/">
              <img
                src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/JashanzLogo.png"
                alt="site-logo"
                height="45px"
              />
            </a>
            <strong className="fs-1 domain-brand">
              Jashan<span style={{ color: "#0daefb" }}>z.com</span>
            </strong>
            
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/*
  <Switch
    color="default"
    checked={isDarkMode}
    onChange={toggleDarkMode}
    icon={<DarkModeIcon />}
    checkedIcon={<DarkModeIcon />}
  />
*/}
            
          <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            </div>
        </div>

        {/* Drawer for mobile view */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button onClick={handleLinkAboutus}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>

            {isLoggedIn && localStorage.getItem("token") && (
              <ListItem button onClick={handleLinkBookingStatus}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Bookings Status" />
              </ListItem>
            )}

{!isLoggedIn && !localStorage.getItem("token") && (
              <ListItem button onClick={handleLinkAdminSection}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Section" />
              </ListItem>
            )}

            {isLoggedIn && (
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            )}

            <ListItem button onClick={handleLinkClick}>
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Drawer>
      </Container>
    </nav>
  );
};

export default Header;
