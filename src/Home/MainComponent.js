import React, { useState, useEffect } from "react";
import JashanService from "../service/JashanService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import Footer from "../Footer";
import Header from "../Header";
import "./MainComponent.css";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ReactTyped } from "react-typed";
import CustomLoader from "../CustomLoader";
import PersonIcon from "@mui/icons-material/Person";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Paper,
  Button,
  Grid,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  AppBar,
} from "@mui/material";

const MainComponent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = true;
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await JashanService.get_Events(token);
      setEvents(response.data);
    } catch (error) {
      navigate(`/`);
    }
  };

  const filterEventsByState = (selectedState) => {
    const filteredEvents = events.filter(
      (event) => event.address.state === selectedState
    );
    setEvents(filteredEvents);
  };

  const filterEventsByCity = (selectedCity) => {
    const filteredEvents = events.filter(
      (event) => event.address.city === selectedCity
    );
    setEvents(filteredEvents);
  };

  const getEventsByFilter = async (filter) => {
    const token = localStorage.getItem("token");

    setLoading(true);

    try {
      if (filter === "state" && selectedState) {
        filterEventsByState(selectedState);
      } else if (filter === "city" && selectedCity) {
        filterEventsByCity(selectedCity);
      } else {
        const response = await JashanService.get_EventBySecialization(
          token,
          filter
        );
        setEvents(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewEventClick = (eventId) => {
    navigate(`/bookevent/${eventId}`);
  };

  const handleReset = () => {
    setSelectedState("");
    setSelectedCity("");
    fetchEvents();
  };

  const sentences = ["Celebrate with Perfection"];

  useEffect(() => {
    fetchEvents();
  }, []);
  const [selectedSort, setSelectedSort] = useState("type");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortEvents = () => {
    const sortedEvents = [...events];

    if (selectedSort === "type") {
      sortedEvents.sort((a, b) => a.eventType.localeCompare(b.eventType));
    } else if (selectedSort === "price") {
      sortedEvents.sort(
        (a, b) => a.pricingDetails.basePrice - b.pricingDetails.basePrice
      );
    } else if (selectedSort === "place") {
      sortedEvents.sort((a, b) =>
        `${a.address.city}, ${a.address.country}`.localeCompare(
          `${b.address.city}, ${b.address.country}`
        )
      );

      if (sortOrder === "desc") {
        sortedEvents.reverse();
      }
    }

    setEvents(sortedEvents);
  };

  useEffect(() => {
    sortEvents();
  }, [selectedSort, sortOrder]);

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <AppBar position="static" color="default">
        <Header isLoggedIn={isLoggedIn} />
      </AppBar>
    
      <Container maxWidth="lg" className="mt-5">
        <div className="container">
          <h5 className="text-center fs-2" style={{ color: "#2ecc71" }}>
            <ReactTyped
              strings={sentences}
              typeSpeed={70}
              backSpeed={50}
              loop
              style={{
                textShadow: "0 2px 5px rgba(0, 0, 0, 0.4)", // Adding shadow
                WebkitTextStroke: "1px #3498db", // Adding stroke effect with color #3498db
                padding: "5px",
              }}
            />
          </h5>

          <div className="row mt-5">
            <div className="mb-5">
              <Container>
                <FilterComponent
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  getEventsByFilter={getEventsByFilter}
                />
              </Container>
            </div>
            <div>
              <Container>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      fullWidth
                      label="Sort by"
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value="type">Type</MenuItem>
                      <MenuItem value="price">Price</MenuItem>
                      <MenuItem value="place">Place</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      select
                      fullWidth
                      label="Sort Order"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value="asc">Ascending</MenuItem>
                      <MenuItem value="desc">Descending</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="state-select">
                        Filter by State
                      </InputLabel>
                      <Select
                        label="Filter by State"
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          filterEventsByState(e.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {Array.from(
                          new Set(events.map((event) => event.address.state))
                        ).map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="city-select">
                        Filter by City
                      </InputLabel>
                      <Select
                        label="Filter by City"
                        value={selectedCity}
                        onChange={(e) => {
                          setSelectedCity(e.target.value);
                          filterEventsByCity(e.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {Array.from(
                          new Set(events.map((event) => event.address.city))
                        ).map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <div className="text-right">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      textTransform: "none",
                      boxShadow: "none",
                      width: "5%",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </Container>
            </div>
            <Paper>
              <Grid
                container
                spacing={3}
                mt={3}
                justifyContent="center"
                alignItems="center"
              >
                {events.map((event) => (
                  <Grid item xs={10} sm={5} md={4} lg={3} key={event.id}>
                    <Card
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
                        transition: "transform 0.3s ease-in-out",
                        backgroundColor: "#f2f4f5",
                        margin: "10px",
                        maxWidth: "300px",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        style={{
                          height: 0,
                          paddingTop: "56.25%",
                          borderRadius: "20px",
                        }}
                        image={
                          event.images.length > 1 ? event.images[1].imgUrl : ""
                        }
                        title="Event Image"
                      />
                      <CardContent style={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1.2rem",
                            marginBottom: "8px",
                          }}
                        >
                          <PersonIcon
                            style={{ marginRight: "8px", fontSize: "1.4rem" }}
                          />
                          {event.admin.firmName}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          style={{
                            fontSize: "1.2rem",
                            marginBottom: "8px",
                            paddingLeft: "6px",
                          }}
                        >
                          &#8377; {event.pricingDetails.basePrice}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1rem",
                          }}
                        >
                          <LocationOnIcon
                            style={{ marginRight: "8px", fontSize: "1.4rem" }}
                          />
                          {`${event.address.city}, ${event.address.state}`
                            .length > 20
                            ? `${event.address.city}, ${event.address.state}`.substring(
                                0,
                                20
                              ) + "..."
                            : `${event.address.city}, ${event.address.state}`}
                        </Typography>
                      </CardContent>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewEventClick(event.id)}
                        fullWidth
                        style={{
                          borderRadius: "0 0 20px 20px",
                          borderTop: "1px solid #0daefb",
                        }}
                      >
                        View
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </div>
        </div>
      </Container>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainComponent;
