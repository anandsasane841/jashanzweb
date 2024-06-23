import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  AppBar,
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import { useNavigate } from "react-router-dom";
const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JashanService.adminForgotPassword(mobileNumber);
      if (response.status === 200) {
        setOtpSent(true);
        setShowOtpInput(true);
        setOtpError(false);
        toast.success("Otp Successfully sent");
      } else {
        setOtpError(true);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError(true);
      setSuccessMessage("");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JashanService.adminVerifyOtpForForgotPassword(
        mobileNumber,
        otp
      );
      console.log(response.data);
      if (response.status === 200) {
        // Otp verified successfully, now update the password
        await JashanService.adminUpdatePassword(mobileNumber, newPassword);
        toast.success("Password updated successfully!");
        navigate(`/admin`);
      }
    } catch (error) {
      toast.error("Error verifying OTP:");
      setOtpError(true);
      setSuccessMessage("");
    }
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Header />
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%", // Set width to 100% to cover the entire viewport width
          textAlign: "center",
        }}
      >
        <Container>
          <h1>Admin Forgot Password</h1>
          <Paper
            sx={{
              backgroundColor: "#0088a9",
              padding: 3,
              boxShadow: "0 4px 8px rgba(4,19,125,0.4)",
            }}
          >
            <Typography
              align="center"
              sx={{
                color: "#333", // Adjust color to a professional tone, such as a dark gray
                marginBottom: 3,
                textAlign: "center",
                fontFamily: "Arial, sans-serif", // Use a common professional font
                fontWeight: "bold", // Emphasize the message
              }}
            >
              Forgot Password
            </Typography>

            {!showOtpInput ? (
              <form onSubmit={handleMobileSubmit}>
                <div className="text-center">
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(
                        e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                      )
                    }
                    placeholder="Enter Mobile Number"
                    style={{ borderRadius: "20px", padding: "10px" }}
                    required
                  />

                  <div className="text-center mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        borderRadius: "20px",
                        padding: "10px",
                        width: "30%",
                      }}
                    >
                      Get OTP
                    </button>
                  </div>
                </div>
                {otpError && (
                  <Typography
                    variant="body1"
                    sx={{ color: "white", marginTop: 2, textAlign: "center" }}
                  >
                    Error sending OTP. Please try again.
                  </Typography>
                )}
                {successMessage && (
                  <Typography
                    variant="body1"
                    sx={{ color: "white", marginTop: 2 }}
                  ></Typography>
                )}
              </form>
            ) : (
              <div>
                <Typography
                  variant="body1"
                  sx={{ color: "white", marginBottom: 2, textAlign: "center" }}
                >
                  {successMessage || "OTP sent successfully!"}
                </Typography>

                <form onSubmit={handleOtpSubmit}>
                  <div className="text-center">
                    <input
                      placeholder="Enter OTP"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ borderRadius: "20px", padding: "10px" }}
                      required
                    />
                  </div>

                  <div className="text-center  mt-2">
                    <input
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      style={{ borderRadius: "20px", padding: "10px" }}
                      minLength={6}
                      required
                    />
                  </div>

                  <div className="text-center mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        borderRadius: "20px",
                        padding: "10px",
                        width: "30%",
                      }}
                    >
                      Submit OTP
                    </button>
                  </div>
                </form>
                {otpError && (
                  <Typography
                    variant="body1"
                    sx={{ color: "white", marginTop: 2, textAlign: "center" }}
                  >
                    Incorrect OTP. Please try again.
                  </Typography>
                )}
                {successMessage && (
                  <Typography
                    variant="body1"
                    sx={{ color: "white", marginTop: 2 }}
                  ></Typography>
                )}
              </div>
            )}
          </Paper>
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default AdminForgotPassword;
