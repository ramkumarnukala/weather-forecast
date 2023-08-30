import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../Context/LocationContext";
import { Container, Stack, Switch, Typography } from "@mui/material";
import styled from "styled-components";
import { currentWeather } from "../Services/WeatherService";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";

function WeatherForecast() {
  const locationcxt = useContext(LocationContext);

  const [weather, setWeather] = useState(undefined);
  const [units, setUnits] = useState(false);

  useEffect(() => {
    if (locationcxt?.location) {
      const body = {
        lat: locationcxt.location.latitude,
        lon: locationcxt.location.longitude,
        units: units ? "imperial" : "metric",
        exclude: "minutely",
      };

      Promise.all([currentWeather(body)])
        .then((responses) => {
          setWeather(responses[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [locationcxt, units]);

  return (
    <StyledContainer fixed>
      {weather !== undefined ? (
        <>
          <div className="metrics-container">
            <Stack direction="row" spacing={1} alignItems="center">
              <StyledTypographyHeader sx={{ fontWeight: "600" }}>
                Metrics:
              </StyledTypographyHeader>
              <StyledTypographyHeader>&deg;C</StyledTypographyHeader>
              <Switch
                onChange={(event, newUnits) => {
                  setUnits(newUnits);
                }}
                name="Fahrenheit"
                inputProps={{ "aria-label": "controlled" }}
                size="small"
              />
              <StyledTypographyHeader>&deg;F</StyledTypographyHeader>
            </Stack>
          </div>
          <div className="weather-wrapper">
            <TodayForecast
              locationcxt={locationcxt}
              weather={weather}
              units={units}
            />
            <WeeklyForecast weather={weather.daily} units={units} />
          </div>
        </>
      ) : (
        "No Location Found, Please select a Location...!"
      )}
    </StyledContainer>
  );
}

export default WeatherForecast;

const StyledContainer = styled(Container)`
  &.css-1ss2ei0-MuiContainer-root,
  &.MuiContainer-root {
    height: 75%;
    min-width: 85%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0px 0px 3px rgb(143, 137, 137);
    align-items: end;
  }

  .metrics-container {
    margin-bottom: 5px;
  }

  .weather-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .today-forecast {
    width: auto;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }

  .weekly-forecast {
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 7px;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export const StyledTypographyHeader = styled(Typography)`
  font-weight: 600 !important;
`;

export const StyledTypographyText = styled(Typography)`
  font-weight: 500 !important;
  font-size: 14px !important;
`;
