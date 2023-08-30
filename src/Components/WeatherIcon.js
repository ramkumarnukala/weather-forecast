import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

const WeatherIcon = (props) => {
  return <StyledBox component="img" alt="weather" src={props.src} />;
};

export default WeatherIcon;

const StyledBox = styled(Box)`
  width: 50px;
  height: auto;
  display: flex;
  alignitems: center;
  justifycontent: center;
  alignself: center;
  margin: 0px;
  padding: 0px;
`;
