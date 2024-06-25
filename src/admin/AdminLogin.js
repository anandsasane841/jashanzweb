import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminLogin.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import CustomLoader from "../CustomLoader";
import { Container, AppBar } from "@mui/material";
import AdminOTPEntry from "./AdminOTPEntry";
import { toast } from "react-toastify";
import AdminLoginSteps from "./adminLoginContent/AdminLoginSteps";
import AdminsContent from "./adminLoginContent/AdminsContent";

const AdminLogin = ({ isAuthenticatedAdmin, setIsAuthenticatedAdmin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firmName: "",
    specialization: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    email: "",
    password: "",
    role: "ROLE_ADMIN",
    emailormobile: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const admin_login = {
      emailormobile: formData.emailormobile,
      password: formData.password,
    };

    JashanService.admin_login(admin_login)
      .then((response) => {
        const Token = response.data.jwtToken;
        localStorage.setItem("admin-token", response.data.jwtToken);
        const username = response.data.username;

        setIsAuthenticatedAdmin(true);
        toast.success("Successfully logged in");
        navigate(`/admin-dashboard/${username}`);
      })
      .catch((error) => {
        toast.error("Invalid username or password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const mobile = formData.mobileNumber;
      const res = await JashanService.generateAdminOtp(mobile);

      if (res.status === 200) {
        setShowOTPForm(true);
      }
    } catch (error) {
      toast.error("User Already Existed!!!");
    }
  };

  const handleOTPSubmit = async (otp) => {
    try {
      const response = await JashanService.admin_register(formData, otp);

      if (response.status === 200) {
        toast.success("You have successfully registered!");
        setShowOTPForm(false);
      }
    } catch (error) {
      toast.error("User Already Existed!!!");
    }
  };

  const handleLinkAdminForgotPassword = () => {
    navigate(`/adminForgotPassword`);
  };

  const sentences = [
    "This form is exclusively designated for use by administrators, event organizers, birthday planners, DJ services, and banquet managers.",
    "Customers and general users are kindly advised not to fill out this form.",
  ];

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
          <div>
            <AdminLoginSteps />
          </div>
          <div className="row justify-content-center ">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className="card mt-5" style={{ borderRadius: "15px" }}>
                <Container className="main-container">
                  {showOTPForm && (
                    <AdminOTPEntry onSubmitOTP={handleOTPSubmit} />
                  )}
                  {!showOTPForm && (
                    <div className="content">
                      <div className="form-container">
                        <div className="text-center mt-5">
                          <img
                            src="https://icons.iconarchive.com/icons/icojam/blue-bits/256/user-settings-icon.png"
                            width="100"
                            height="100"
                            alt="admin"
                          />
                          <div className="program-manager-font-style fs-6">
                            <span
                              style={{
                                color: "#0088a9",
                                fontSize: "30px",
                                fontWeight: "bold",
                              }}
                            >
                              Program Manager Administrator
                            </span>
                          </div>
                        </div>

                        {showSignIn ? (
                          <div id="signInForm">
                            <h2 className="text-center">Sign In</h2>
                            <form onSubmit={handleSignInSubmit}>
                              <div className="form-group">
                                <label htmlFor="signInEmail">Username:</label>
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
                              onClick={handleLinkAdminForgotPassword}
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
                                  id="firmName"
                                  className="form-control rounded-pill px-4"
                                  type="text"
                                  placeholder="Enter Firm Name"
                                  name="firmName"
                                  value={formData.firmName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <select
                                  id="specialization"
                                  className="form-control rounded-pill px-4 "
                                  name="specialization"
                                  value={formData.specialization}
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option disabled value="">
                                    Choose Specialization
                                  </option>
                                  <option
                                    value="Birthday"
                                    className="custom-option"
                                  >
                                    Birthday Booking (Birthday Hall)
                                  </option>
                                  <option
                                    value="Marriage Ceremony"
                                    className="custom-option"
                                  >
                                    Marriage Ceremony Booking (Banquets)
                                  </option>
                                  <option
                                    value="Get Together or Party"
                                    className="custom-option"
                                  >
                                    Get Together / Party Booking (Party Hall)
                                  </option>
                                  <option
                                    value="Occasion Organizers"
                                    className="custom-option"
                                  >
                                    Occasion Organizers (Event Management Team)
                                  </option>
                                  <option
                                    value="Disc Jockey"
                                    className="custom-option"
                                  >
                                    Disc Jockey (DJ's)
                                  </option>
                                  <option
                                    value="Performers"
                                    className="custom-option"
                                  >
                                    Performers
                                  </option>
                                  <option
                                    value="Decorators"
                                    className="custom-option"
                                  >
                                    Decorators
                                  </option>
                                  <option
                                    value="Hosts"
                                    className="custom-option"
                                  >
                                    Hosts
                                  </option>
                                </select>
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
                                  id="alternateMobileNumber"
                                  type="text"
                                  className="form-control rounded-pill px-4"
                                  placeholder="Enter Alternate Mobile Number"
                                  name="alternateMobileNumber"
                                  value={formData.alternateMobileNumber}
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

          <div>
            <AdminsContent />
            <div className="text-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/pGIHQ34hJfc?si=9fnOzT4cVLP1t417"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
