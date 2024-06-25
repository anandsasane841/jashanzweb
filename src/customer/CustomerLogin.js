import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import "./CustomerLogin.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import { Container, AppBar } from "@mui/material";
import OTPEntry from "./OtpEntry";
import FeatureComponent from "./customerLoginContent/FeatureComponent";
import { toast } from "react-toastify";

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
  const [showSignIn, setShowSignIn] = useState(true);
  const toggleForms = () => {
    setShowSignIn(!showSignIn);
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
              </div>{" "}
              <div className="row justify-content-center ">
                <div className="col-lg-6 col-md-8 col-sm-10">
                  <div className="card mt-5 bg-white" style={{ borderRadius: "15px" }}>
                    <Container className="main-container">
                      {showOTPForm && (
                        <OTPEntry onSubmitOTP={handleOTPSubmit} />
                      )}

                      {!showOTPForm && (
                        <div className="content">
                          <div className="form-container">
                            {showSignIn ? (
                              <div id="signInForm">
                                <h2 className="text-center">Sign In</h2>
                                <form onSubmit={handleSignInSubmit} >
                                  <div className="form-group">
                                    <label htmlFor="signInEmail">
                                      Username:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control rounded-pill px-4"
                                      id="signInEmail"
                                      required
                                      placeholder="Enter Email or Mobile Number"
                                      name="emailormobile"
                                      value={formData.emailormobile}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="signInPassword">
                                      Password:
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control rounded-pill px-4"
                                      id="signInPassword"
                                      required
                                      placeholder="Enter Password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <button
                                      type="submit"
                                      className="btn btn-primary rounded-pill"
                                    >
                                      Sign In
                                    </button>
                                  </div>
                                </form>
                                <a
                                  href="#"
                                  className="toggle-link"
                                  onClick={handleLinkForgotPassword}
                                >
                                  Forgot Password
                                </a>
                                <a
                                  href="#"
                                  className="toggle-link"
                                  onClick={toggleForms}
                                >
                                  Don't have an account? Sign Up
                                </a>
                              </div>
                            ) : (
                              <div id="signUpForm">
                                <h2 className="text-center">Sign Up</h2>
                                <form onSubmit={handleSignUpSubmit}>
                                  <div className="form-group">
                                    <input
                                      id="name"
                                      type="text"
                                      className="form-control rounded-pill px-4"
                                      placeholder="Your Name"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>

                                  <div className="form-group">
                                    <input
                                      id="mobileNumber"
                                      type="text"
                                      className="form-control rounded-pill px-4"
                                      placeholder="Enter Mobile Number"
                                      name="mobileNumber"
                                      value={formData.mobileNumber}
                                      onChange={handleInputChange}
                                      pattern="[0-9]{10}"
                                      title="Mobile number should be 10 digits"
                                      required
                                    />
                                  </div>

                                  <div className="form-group">
                                    <input
                                      id="email"
                                      type="email"
                                      className="form-control rounded-pill px-4"
                                      placeholder="Enter Email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <input
                                      id="signUpPassword"
                                      type="password"
                                      className="form-control rounded-pill px-4"
                                      placeholder="Enter Password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <button
                                      type="submit"
                                      className="btn btn-primary rounded-pill"
                                 >
                                    Submit
                                  </button>
                                  </div>
                                </form>
                                <a
                                  href="#"
                                  className="toggle-link"
                                  onClick={toggleForms}
                                >
                                  Already have an account? Sign In
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Container>
                  </div>
                </div>
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
