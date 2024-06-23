import React, { useState } from "react";
import Slider from "react-slick";
import { Typography, Paper } from "@mui/material";
import { Person, Style } from "@mui/icons-material"; // Import Material-UI icons

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FilterComponent.css";

const options = [
  {
    value: "Birthday",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/Birthday.png"
        alt="birthday-cake"
      />
    ),
  },
  {
    value: "Marriage Ceremony",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/Marriage.png"
        alt="marriage"
      />
    ),
  },
  {
    value: "Get Together or Party",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/get-together.png"
        alt="get-together"
      />
    ),
  },
  {
    value: "Occasion Organizers",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/event-management-team.png"
        alt="event-management-team"
      />
    ),
  },
  {
    value: "Disc Jockey",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/Dj.png"
        alt="dj"
      />
    ),
  },

  {
    value: "Performers",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/dancers.png"
        alt="Performers"
      />
    ),
  },
  {
    value: "Hosts",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/anchor.png"
        alt="Hosts"
      />
    ),
  },
  {
    value: "Decorators",
    icon: (
      <img
        width="100"
        height="100"
        src="https://jashanzprimaryfiles.s3.ap-south-1.amazonaws.com/decorators.png"
        alt="Decorators"
      />
    ),
  },
];

const FilterComponent = ({
  selectedFilter,
  setSelectedFilter,
  getEventsByFilter,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slider",
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500, // Set autoplay speed in milliseconds (e.g., 3 seconds)
    afterChange: (current) => {
      handleSpecializationChange(options[current].value, current);
    },
  };

  const handleSpecializationChange = (value, index) => {
    setSelectedFilter(value);
    getEventsByFilter(value);
    setSelectedIndex(index);
  };

  return (
    <Slider {...settings}>
      {options.map((option, index) => (
        <div key={option.value}>
          <div
            elevation={3}
            className={`option ${index === selectedIndex ? "selected" : ""}`}
            onClick={() => handleSpecializationChange(option.value, index)}
          >
            <div>{option.icon}</div>
            <h3
              style={{
                color: "#FFFFFF",
                textShadow: "0 2px 5px rgba(0, 0, 0, 0.7)", // Adding shadow
                padding: "5px",
              }}
            >
              {option.value}
            </h3>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default FilterComponent;