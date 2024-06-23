import React from "react";
import { AppBar, Box } from "@mui/material";
import Header from "../Header";
const Contactus = () => {
  return (
    <Box>
      <AppBar position="static" color="default">
        <Header />
      </AppBar>

      <div>
      <h2>Contact Us</h2>
      <p>
        Company Name: Zealous Virtuoso Pvt Ltd
      </p>
      <p>
        Email: <a href="mailto:support@zealousvirtuoso.in">support@zealousvirtuoso.in</a>
      </p>
      <p>Location:Building Name: Parvati Sadan , Block Sector: Nr Khopkar Chal, Road : Mohan Nagar, Dhanakawadi, Dist : Pune 411043 , India</p>
      <p>Contact Number: <a href="tel:+919860239837">9860239837</a></p>
    </div>
    </Box>
  );
};

export default Contactus;
