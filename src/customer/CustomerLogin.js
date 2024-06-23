import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import "./CustomerLogin.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import { Container, AppBar } from "@mui/material";
import { Link as MaterialLink } from "@mui/material";
import OTPEntry from "./OtpEntry";
import FeatureComponent from "./FeatureComponent";
import { toast } from "react-toastify";
import { Box, Typography, Button, IconButton, Paper } from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";

const CustomerLogin = ({ isAuthenticatedUser, setIsAuthenticatedUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedout, setIsLoggedout] = useState(
    location.state && location.state.isLoggedout
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sign-in");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "ROLE_USER",
    emailormobile: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showOTPForm, setShowOTPForm] = useState(false);

  useEffect(() => {
    if (isLoggedout) {
      handleLogoutNotification();
    }
  }, [isLoggedout]);

  const handleLogoutNotification = () => {
    setNotification({
      message: "You have been successfully logged out.",
      severity: "success",
    });
    navigate("/", { state: null });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user_login = {
        emailormobile: formData.emailormobile,
        password: formData.password,
      };
      const response = await JashanService.user_login(user_login);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwtToken);
        setIsAuthenticatedUser(true);
        toast.success("Successfully logged in");
        navigate("/home");
      } else {
        setNotification({
          message: "Token not received in response.",
          severity: "error",
        });
      }
    } catch (error) {
      toast.error("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const mobile = formData.mobileNumber;
      const res = await JashanService.generateUserOtp(mobile);

      if (res.status === 200) {
        setShowOTPForm(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User Already Existed!!!");
      } else {
        toast.error("Failed to generate OTP. Please try again.");
      }
    }
  };

  const handleOTPSubmit = async (otp) => {
    try {
      const response = await JashanService.user_register(formData, otp);

      if (response.status === 200) {
        toast.success("You have successfully registered!");
        setShowOTPForm(false);
      }
    } catch (error) {
      toast.error("Please Enter Valid OTP");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLinkForgotPassword = () => {
    navigate(`/forgotPassword`);
  };

  return (
    <div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <AppBar position="static" color="default">
            <Header />
          </AppBar>
          <Container
            sx={{
              borderRadius: 2,
              backgroundColor: "#3498db",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              padding: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="white" sx={{ my: 2 }}>
              Download the Jashanz App now!
            </Typography>
            <a
              href="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/Jashanz.apk"
              download
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                startIcon={<AndroidIcon />}
                sx={{
                  color: "#000",
                  backgroundColor: "#fff",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#ddd",
                  },
                }}
              >
                Download App
              </Button>
            </a>
          </Container>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div>
              <div>
                {/* Your CustomerLogin component content */}
                <FeatureComponent /> {/* Use the FeatureComponent here */}
              </div>
              <div>
                {showOTPForm && <OTPEntry onSubmitOTP={handleOTPSubmit} />}
                {!showOTPForm && (
                  <Container>
                    <div className="login-wrap mt-5">
                      <div className="login-html">
                        <input
                          id="tab-1"
                          type="radio"
                          name="tab"
                          className="sign-in"
                          checked={selectedTab === "sign-in"}
                          onChange={() => handleTabChange("sign-in")}
                        />
                        <label htmlFor="tab-1" className="tab">
                          Sign In
                        </label>
                        <input
                          id="tab-2"
                          type="radio"
                          name="tab"
                          className="for-pwd"
                          checked={selectedTab === "sign-up"}
                          onChange={() => handleTabChange("sign-up")}
                        />
                        <label htmlFor="tab-2" className="tab">
                          Sign Up
                        </label>
                        <div className="login-form">
                          <div className="sign-in-htm">
                            <form onSubmit={handleSignInSubmit}>
                              <div className="group">
                                <input
                                  id="user"
                                  type="text"
                                  className="input"
                                  required
                                  placeholder="Enter  Email or Mobile Number"
                                  name="emailormobile"
                                  value={formData.emailormobile}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="group">
                                <input
                                  id="pass"
                                  type="password"
                                  className="input"
                                  data-type="password"
                                  required
                                  placeholder="Enter Password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="group">
                                <input
                                  type="submit"
                                  className="btn btn-primary"
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    borderRadius: "20px",
                                    padding: "10px",
                                  }}
                                  value="Sign In"
                                />
                              </div>
                              <p className="text-right">
                                <MaterialLink
                                  component="button"
                                  variant="body2"
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleLinkForgotPassword}
                                >
                                  Forgot Password
                                </MaterialLink>
                              </p>
                            </form>
                            <div className="hr"></div>
                          </div>
                          <div className="for-pwd-htm">
                            <form onSubmit={handleSignUpSubmit}>
                              <div className="group">
                                <input
                                  id="name"
                                  type="text"
                                  className="input"
                                  placeholder="Your Name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="group">
                                <input
                                  id="email"
                                  type="email"
                                  className="input"
                                  placeholder="Your Email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="group">
                                <input
                                  id="contact_number"
                                  type="tel"
                                  className="input"
                                  placeholder="Your Contact Number"
                                  name="mobileNumber"
                                  value={formData.mobileNumber}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="group">
                                <input
                                  id="password"
                                  type="password"
                                  className="input"
                                  placeholder="Your Password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                  minLength={6}
                                  required
                                />
                              </div>
                              <input
                                type="hidden"
                                name="role"
                                value={formData.role}
                              />
                              <div className="group">
                                <input
                                  type="submit"
                                  className="btn btn-primary"
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    borderRadius: "20px",
                                    padding: "10px",
                                  }}
                                  value="Register"
                                />
                              </div>
                            </form>
                            <div className="hr"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>
                )}
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerLogin;
