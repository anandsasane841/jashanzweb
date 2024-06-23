import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import JashanService from "../service/JashanService";
import "./ViewComponent.css";
import ImageComponent from "./ImageComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import BookingForm from "./BookingForm";
import Footer from "../Footer";
import CustomLoader from "../CustomLoader";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import {
  Category,
  LocationOn,
  Star,
  MonetizationOn,
} from "@mui/icons-material"; // Import necessary icons

import {
  AppBar,
  Alert,
  AlertTitle,
  Typography,
  Button,
  Container,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

const ViewComponent = () => {
  const navigate = useNavigate();
  const { eventid } = useParams();
  const [event, setEvent] = useState({});
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gst, setGST] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = true;
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);

  const playOrPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    JashanService.get_EventById(eventid, token)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        navigate(`/error/${error.message}`);
        setLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [eventid]);

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    if (!selectedServices.includes(selectedService)) {
      setSelectedServices([...selectedServices, selectedService]);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = parseInt(event.pricingDetails?.basePrice) || 0;
    const selectedServicesTotal = selectedServices.reduce((total, service) => {
      const servicePrice =
        parseFloat(
          event.pricingDetails?.additionalServices.find(
            (s) => s.serviceName === service
          )?.price
        ) || 0;
      return total + servicePrice;
    }, 0);
    const totalPrice = basePrice + selectedServicesTotal;
    setTotalPrice(totalPrice);

    // Calculate GST at 18%
    const gstAmount = (totalPrice * 18) / 100;
    setGST(gstAmount);
  };

  const [bookingData, setBookingData] = useState(null);

  const handleBook = () => {
    const data = {
      selectedServices,
      event,
      totalPrice,
      gst,
    };

    setBookingData(data);
    console.log(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{backgroundColor:"#FFFFFF"}}>
     <AppBar position="static" color="default">
        <Header isLoggedIn={isLoggedIn} />
      </AppBar>

      <Container maxWidth="lg" className="mt-5">
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className="view-component-container">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <div className="card-body border rounded p-3 bg-light">
                <Container>
                  <div className="video-container text-center mt-3 position-relative">
                    {" "}
                    {/* Added position-relative */}
                    <video
                      id="original-video"
                      ref={videoRef}
                      onClick={playOrPause}
                      className="original-video"
                    >
                      <source src={event.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="play-pause-button">
                      {isPlaying ? (
                        <PauseIcon
                          onClick={playOrPause}
                          style={{ fontSize: 25 }}
                        />
                      ) : (
                        <PlayArrowIcon
                          onClick={playOrPause}
                          style={{ fontSize: 25 }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="video-container mt-3">
                    <ImageComponent event={event} />
                  </div>
                </Container>

                <Container
                  className="event-info text-center mt-3"
                  sx={{
                    background: "#f0f0f0", // New professional background color
                    padding: "20px",
                    borderRadius: "10px",
                    color: "#333",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <Grid>
                      <Typography
                        variant="body1"
                        sx={{ color: "#333", fontWeight: "bold" }}
                      >
                        <Category /> <span>{event.eventType}</span>
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#333" }}>
                        ₹ Base Price{" "}
                        <span>{event.pricingDetails?.basePrice || "N/A"}</span>
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#333" }}>
                        <LocationOn />{" "}
                        <span>
                          {event.address?.landmark || "N/A"} {"  "}{" "}
                          {event.address?.city || "N/A"} {" , "}{" "}
                          {event.address?.state || "N/A"}{" "}
                          {event.address?.pinCode || "N/A"}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    {selectedServices.length > 0 && (
                      <Grid item xs={12}>
                        <div className="selected-services">
                          <ul
                            style={{
                              listStyleType: "disc",
                              paddingLeft: "20px",
                            }}
                          >
                            {selectedServices.map((service, index) => (
                              <ul key={index}>
                                <Star /> {service} - ₹
                                {event.pricingDetails?.additionalServices.find(
                                  (s) => s.serviceName === service
                                )?.price || "N/A"}
                              </ul>
                            ))}
                          </ul>
                        </div>
                      </Grid>
                    )}

                    {totalPrice > 0 && (
                      <Grid item xs={12}>
                        <div>
                          <Typography variant="body1" sx={{ color: "#333" }}>
                            Total Price: <span>₹{totalPrice}</span>
                          </Typography>
                          <Typography variant="body1" sx={{ color: "#333" }}>
                            GST (18%): <span>₹{gst}</span>
                          </Typography>
                          <Typography variant="body1" sx={{ color: "#333" }}>
                            Grand Total: <span>₹{totalPrice + gst}</span>
                          </Typography>
                        </div>
                      </Grid>
                    )}
                  </Grid>

                  <Grid container spacing={2} className={`additional-service`}>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        component="label"
                        htmlFor="additionalService"
                        sx={{
                          color: "#333",
                          mt: "10px",
                          display: "block",
                          fontWeight: "bold",
                        }}
                      >
                        Choose Additional Services:
                      </Typography>
                      <Select
                        id="additionalService"
                        name="additionalService"
                        value=""
                        onChange={handleServiceChange}
                        sx={{ width: "100%", color: "#333", mt: "10px" }}
                      >
                        <MenuItem value="">Select additional services</MenuItem>
                        {event.pricingDetails?.additionalServices?.map(
                          (service) => (
                            <MenuItem
                              key={service.id}
                              value={service.serviceName}
                            >
                              {service.serviceName} - ₹{service.price || "N/A"}
                            </MenuItem>
                          )
                        ) || []}
                      </Select>
                    </Grid>
                    <Grid item xs={12} className="text-right">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#0daefb" }}
                        onClick={calculateTotalPrice}
                      >
                        Calculate
                      </Button>
                    </Grid>
                  </Grid>
                </Container>

                <Container>
                  {event.eventType === "Disc Jockey" && (
                    <Alert severity="warning" sx={{ mt: "16px" }}>
                      <AlertTitle>Attention</AlertTitle> In India, the
                      engagement of DJ services necessitates obtaining official
                      permission from a designated police officer.In industrial
                      areas, the permissible limit is 75 dB for daytime and 70
                      dB at night. In commercial areas, it is 65 dB and 55 dB,
                      while in residential areas it is 55 dB and 45 dB during
                      daytime and night respectively. Therefore, day time noise
                      standard prescribed for residential areas in India is 55
                      dB.
                    </Alert>
                  )}
                </Container>

                <div className="container text-center">
                  <Button
                    variant="contained"
                    onClick={handleBook}
                    sx={{ mt: "16px", backgroundColor: "#0daefb" }}
                  >
                    Book
                  </Button>
                  {isModalOpen && (
                    <div className="modal-dialog">
                      <div className="modal-overlay">
                        <div className="modal-content">
                          <span className="modal-close" onClick={closeModal}>
                            &times;
                          </span>
                          <BookingForm
                            selectedServices={selectedServices}
                            event={event}
                            totalPrice={totalPrice}
                            gst={gst}
                            onModalClose={closeModal}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>

      <div>
        <Footer />
        </div>
    </div>
  );
};

export default ViewComponent;
