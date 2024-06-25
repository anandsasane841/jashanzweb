import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

const AdminOTPEntry = ({ onSubmitOTP }) => {
  const [otp, setOTP] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitOTP(otp);
  };

  return (
    <div className="container mt-5">
        <div className="card-body">
          <h5>
            An OTP has been sent to your mobile device.
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
              <input
                type="text"
                className="form-control rounded-pill px-4"
                placeholder="Enter OTP*"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <Button type="submit" variant="primary" className="btn-block" style={{ borderRadius: "20px" }}>
                Submit <Send className="ml-2" />
              </Button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default AdminOTPEntry;
