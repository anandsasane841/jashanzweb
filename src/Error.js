import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import {
  Home as HomeIcon,
  MoodBad as MoodBadIcon,
  Build as BuildIcon,
  Block as BlockIcon,
  CloudOff as CloudOffIcon,
  BeachAccess as BeachAccessIcon,
  Gavel as GavelIcon,
} from "@mui/icons-material";
import { LockOpen as LockOpenIcon } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { SearchOff as SearchOffIcon } from "@mui/icons-material";

const Error = () => {
  const { error } = useParams();

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative", // Needed for the animation
    overflow: "hidden", // Prevents the animation from overflowing
  };

  const errorMessages = {
    401: [
      "Sorry, this area is for authorized personnel only. No sneak peeks allowed! 🚫",
    ],
    404: [
      "Like a needle in a haystack, but without the needle. Keep searching!",
    ],
    500: ["It's not you, it's us. We're in therapy."],
    418: ["I'm a teapot. Brew time exceeded. Try a different blend."],
    403: ["Access denied! Did you forget the secret handshake?"],
    502: [
      "The gateway is feeling moody. Sing it a song, maybe it'll cooperate.",
    ],
    503: ["Our service is sunbathing on a beach. Check back later."],
    451: ["Unavailable due to legal reasons. Did you bring your lawyer?"],
  };

  const getRandomMessage = (errorCode) => {
    const statusCode = parseInt(errorCode.match(/\d{3}$/)[0], 10);
    const messages = errorMessages[statusCode] || [];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex] || "An error occurred.";
  };

  const getErrorIcon = (errorCode) => {
    switch (parseInt(errorCode.match(/\d{3}$/)[0], 10)) {
      case 401:
        return <LockOpenIcon fontSize="large" />;
      case 404:
        return <SearchOffIcon fontSize="large" />;
      case 500:
        return <BuildIcon fontSize="large" />;
      case 418:
        return <BlockIcon fontSize="large" />;
      case 403:
        return <LockIcon fontSize="large" />;
      case 502:
        return <CloudOffIcon fontSize="large" />;
      case 503:
        return <BeachAccessIcon fontSize="large" />;
      case 451:
        return <GavelIcon fontSize="large" />;
      default:
        return <MoodBadIcon fontSize="large" />;
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={containerStyle}>
      <CssBaseline />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <div style={{ position: "absolute", top: 0, left: 0, animation: "ball1 6s linear infinite", backgroundColor: "white", height: "30px", width: "30px", borderRadius: "50%", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", top: "50%", left: "30%", transform: "translate(-50%, -50%)", animation: "ball2 5s linear infinite", backgroundColor: "lightgreen", height: "30px", width: "30px", borderRadius: "50%", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", top: 0, right: "20%", animation: "ball3 4s linear infinite", backgroundColor: "#0daefb", height: "30px", width: "30px", borderRadius: "50%", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", animation: "ball4 3s linear infinite", backgroundColor: "orange", height: "30px", width: "30px", borderRadius: "50%", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)" }} />
      </div>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            style={{
              color: "black",
              backgroundColor: "white",
              borderRadius: "25px",
              padding: "10px 20px",
            }}
          >
            Go to Home
          </Button>
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          {getErrorIcon(error)}
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            {getRandomMessage(error)}
          </Typography>
        </Grid>
      </Grid>
      <style>
        {`
          @keyframes ball1 {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100%, 100%); }
          }
          @keyframes ball2 {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-100%, 0); }
          }
          @keyframes ball3 {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-100%, -100%); }
          }
          @keyframes ball4 {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100%, -100%); }
          }
        `}
      </style>
    </Container>
  );
};

export default Error;
