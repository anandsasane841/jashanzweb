import React, { useState } from "react";
import swal from "sweetalert";
import { toast } from 'react-toastify';
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
const ForgotPassword = () => {
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
      const response = await JashanService.userForgotPassword(mobileNumber);
      if (response.status === 200) {
        setOtpSent(true);
        setShowOtpInput(true);
        setOtpError(false);
        toast.success("OTP sent successfully!");
      } else {
        setOtpError(true);
        setSuccessMessage("");
      }
    } catch (error) {
      setOtpError(true);
      setSuccessMessage("");
      toast.error("Please Enter Valid Number");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JashanService.userVerifyOtpForForgotPassword(
        mobileNumber,
        otp
      );
      console.log(response.data);
      if (response.status === 200) {
        // Otp verified successfully, now update the password
        await JashanService.userUpdatePassword(mobileNumber, newPassword);
       toast.success("Password updated successfully!");
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError(true);
      setSuccessMessage("");
    }
  };

  return (
    <>
     <AppBar position="static" color="default">
        <Header />
      </AppBar>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card mt-5">
              <div className="card-body">
                <h1 className="card-title mb-4 text-center">Forgot Password</h1>
                {!showOtpInput ? (
                  <form onSubmit={handleMobileSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        value={mobileNumber}
                        onChange={(e) =>
                          setMobileNumber(
                            e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                          )
                        }
                        placeholder="Enter Mobile Number"
                        required
                      />
                    </div>
                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4"
                      >
                        Get OTP
                      </button>
                    </div>
                    {otpError && (
                      <p className="text-danger mt-2 text-center">
                        Error sending OTP. Please try again.
                      </p>
                    )}
                  </form>
                ) : (
                  <form onSubmit={handleOtpSubmit}>
                    <p className="text-success mb-3 text-center">
                      {successMessage || "OTP sent successfully!"}
                    </p>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control rounded-pill"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        minLength={6}
                        required
                      />
                    </div>
                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4"
                      >
                        Submit OTP
                      </button>
                    </div>
                    {otpError && (
                      <p className="text-danger text-center">
                        Incorrect OTP. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
