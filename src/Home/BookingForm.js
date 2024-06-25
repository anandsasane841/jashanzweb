import React, { useState, useEffect } from "react";
import JashanService from "../service/JashanService";
import { useNavigate } from "react-router-dom";
import PaymentGateway from "./PaymentGateway";
import { toast } from "react-toastify";
import {
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material"; // Import icons
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

const BookingForm = ({
  selectedServices,
  event,
  totalPrice,
  gst,
  onModalClose,
}) => {
  const navigate = useNavigate();
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [bookingData, setBookingData] = useState({
    adminId: null,
    adminFirmName: "",
    adminContactNumber: "",
    pricingDetailsId: null,
    eventId: null,
    customerId: "",
    customerEmail: "",
    customerContactNumber: "",
    eventName: "",
    pricingDetails: "",
    additionalServices: "",
    bookingDate: "",
    bookingTime: "",
    paymentStatus: "",
    bookingAmount: 0,
    bookingCharge: 0,
    paymentId: "",
  });
  const [selectedServicesState, setSelectedServices] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!customerData.id) {
      JashanService.get_current_user(token)
        .then((response) => {
          setCustomerData(response.data);
        })
        .catch((error) => {
          navigate(`/error/${error.message}`);
        });
    }
  }, [customerData, navigate]);

  useEffect(() => {
    if (bookingConfirmed) {
      const audio = new Audio("/booked.mp3");
      audio.play();
    }
  }, [bookingConfirmed]);

  useEffect(() => {
    if (event && customerData.id) {
      setBookingData({
        adminId: event.admin.id,
        adminFirmName: event.admin.firmName,
        adminContactNumber: event.admin.mobileNumber,
        pricingDetailsId: event.pricingDetails.id,
        eventId: event.id,
        customerId: customerData.id,
        customerEmail: customerData.email,
        customerContactNumber: customerData.mobileNumber,
        eventName: event.eventType,
        pricingDetails: event.pricingDetails.basePrice,
        additionalServices: selectedServicesState.join(", "),
        bookingDate: bookingData.bookingDate,
        bookingTime: bookingData.bookingTime,
        paymentStatus: "Paid",
        bookingAmount: totalPrice + gst,
        bookingCharge: getAmountForEventType(event.eventType),
        paymentId: bookingData.paymentId,
      });
    }
  }, [
    event,
    customerData,
    totalPrice,
    bookingData.bookingDate,
    bookingData.bookingTime,
    selectedServicesState,
  ]);

  const getAmountForEventType = (eventType) => {
    const eventTypeAmounts = {
      Birthday: 99,
      "Marriage Ceremony": 499,
      "Disc Jockey": 399,
      "Occasion Organizers": 499,
      "Get Together or Party": 499,
    };

    return eventTypeAmounts[eventType] || 0;
  };

  const handleConfirmBooking = (event) => {
    event.preventDefault();
    if (paymentStatus !== "success") {
      return;
    }
    const token = localStorage.getItem("token");
    JashanService.customer_booking(bookingData, token)
      .then((res) => {
        toast.success("A new booking has been created.");
      })
      .catch((error) => {
        toast.error("An error occurred during the creation process.");
      });

    console.log(bookingData);
    setBookingConfirmed(true);
  };

  const toggleServiceSelection = (service) => {
    if (selectedServicesState.includes(service)) {
      setSelectedServices(selectedServicesState.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServicesState, service]);
    }
  };

  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const handlePaymentStatus = (status) => {
    setPaymentStatus(status);
    setBookingData({ ...bookingData, paymentStatus: status });
  };

  const generateTimeSlots = () => {
    const timeSlots = [];

    for (let h = 1; h <= 12; h++) {
      const hourIn12HourFormat = h > 9 ? h : "0" + h;
      const amSlot = `${hourIn12HourFormat}:00 AM`;
      const pmSlot = `${hourIn12HourFormat}:00 PM`;

      timeSlots.push(amSlot, pmSlot);
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();
  
  return (
    <form onSubmit={handleConfirmBooking}>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        {bookingConfirmed ? (
          <>
            <Typography variant="h4">Booking Confirmed!</Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
              onClick={onModalClose}
            >
              Close
            </Button>
          </>
        ) : (
          <>
            <div style={{ backgroundColor: "#f0f0f0", padding: 20, borderRadius: 10 }}>
              <Typography variant="h4" gutterBottom>
                <EventIcon sx={{ fontSize: 40, marginRight: 1 }} />
                {event.eventType}
              </Typography>
              <Typography variant="body1" paragraph>
                <PersonIcon sx={{ fontSize: 25, marginRight: 1 }} />
                {customerData.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <PhoneIcon sx={{ fontSize: 25, marginRight: 1 }} />
                {customerData.mobileNumber}
              </Typography>
            </div>

            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={12} md={6}>
                <>
                  <Alert severity="info" style={{ marginTop: "16px" }}>
                    Please choose a service from the options provided.
                  </Alert>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {event.pricingDetails.additionalServices.map(
                      (service, index) => (
                        <li key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedServicesState.includes(
                                  service.serviceName
                                )}
                                onChange={() =>
                                  toggleServiceSelection(service.serviceName)
                                }
                              />
                            }
                            label={`${service.serviceName} - ₹${service.price}`}
                          />
                        </li>
                      )
                    )}
                  </ul>
                  <div
                    style={{
                      backgroundColor: "#FFFFF0",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Total Price: ₹{totalPrice}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      GST (18%): ₹{gst}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Grand Total Price: ₹{totalPrice + gst}
                    </Typography>
                  </div>
                </>
              </Grid>
              <Grid item xs={12} md={6}>
                <>
                  <Typography variant="h5" style={{ fontSize: 20 }}>
                    Date and Time Selection
                  </Typography>
                  <TextField
                    type="date"
                    variant="outlined"
                    value={bookingData.bookingDate}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        bookingDate: e.target.value,
                      })
                    }
                    required
                    fullWidth
                    style={{ marginBottom: 10, marginTop: 10 }}
                  />
                  <Select
                    id="bookingTime"
                    value={bookingData.bookingTime}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        bookingTime: e.target.value,
                      })
                    }
                    required
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 20 }}
                  >
                    <MenuItem value="">Select a time</MenuItem>
                    {timeSlots.map((timeSlot, index) => (
                      <MenuItem key={index} value={timeSlot}>
                        {timeSlot}
                      </MenuItem>
                    ))}
                  
                  </Select>
                  {paymentStatus !== "Pending" && (
                    <Typography
                      variant="body1"
                      color={paymentStatus === "success" ? "primary" : "error"}
                    >
                      {paymentStatus === "success"
                        ? "Payment Success"
                        : "Payment Failed"}
                    </Typography>
                  )}
                </>
              </Grid>
            </Grid>

            <div style={{ marginTop: 20 }}>
              <PaymentGateway
                className="form-control"
                paymentStatus={paymentStatus}
                handlePaymentStatus={handlePaymentStatus}
                eventType={event.eventType}
                onPaymentIdGenerated={(paymentId) => {
                  setBookingData((prevData) => ({
                    ...prevData,
                    paymentId: paymentId,
                  }));
                }}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircle />}
                  style={{ backgroundColor: "#28a745", fontSize: 16, marginRight: 10 }}
                >
                  Confirm Booking
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onModalClose}
                  startIcon={<Cancel />}
                  style={{ backgroundColor: "#6c757d", fontSize: 16 }}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </Paper>
    </form>
  );
};

export default BookingForm;
