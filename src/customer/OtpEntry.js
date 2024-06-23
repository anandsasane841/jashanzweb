import React, { useState } from "react";
import { Typography, Paper, Container, Button } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

const OtpEntry = ({ onSubmitOTP }) => {
  const [otp, setOTP] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitOTP(otp);
  };

  return (
    <Container maxWidth="xs" className="mt-5">
      <Paper
        sx={{
          backgroundColor: "#0088a9",
          padding: 5,
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
          An OTP has been sent to your mobile device.
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <input
              type="text"
              placeholder="Enter OTP*"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
              style={{ borderRadius: "20px", padding: "10px" }}
            />
            <div className="text-center mt-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                sx={{ borderRadius: 10 }}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default OtpEntry;
