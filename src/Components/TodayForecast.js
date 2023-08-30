import React from "react";
import WeatherIcon from "./WeatherIcon";
import { weatherIcon } from "../Utilities/IconUtils";
import { MONTHS } from "../Utilities/DataConstants";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterIcon from "@mui/icons-material/Water";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { date } from "../Utilities/DatetimeUtils";
import styled from "styled-components";
import HourForecast from "./HourForecast";
import {
  StyledTypographyHeader,
  StyledTypographyText,
} from "./WeatherForecast";

function TodayForecast(props) {
  const locationcxt = props.locationcxt,
    weather = props.weather,
    units = props.units;
  return (
    <div className="today-forecast">
      <StyledTypographyHeader variant="h6">
        Current Weather
      </StyledTypographyHeader>
      <StyledWeatherCard variant="outlined">
        <div>
          <StyledTypographyHeader variant="h6">
            {locationcxt?.location ? locationcxt.location.city : "NA"}
          </StyledTypographyHeader>
          <StyledTypographyText>
            Today {date.getDate()} {MONTHS[date.getMonth()]}
          </StyledTypographyText>
        </div>
        <div>
          <StyledTypographyHeader variant="h6">{`${weather.current.temp.toFixed(
            1
          )} ${String.fromCharCode(176)}${
            units ? "F" : "C"
          }`}</StyledTypographyHeader>
          <StyledTypographyText>
            {weather.current.weather[0].description.replace(
              weather.current.weather[0].description[0],
              weather.current.weather[0].description[0].toUpperCase()
            )}
          </StyledTypographyText>
        </div>
        <WeatherIcon
          src={weatherIcon(`${weather.current.weather[0].icon}.png`)}
        />
      </StyledWeatherCard>
      <StyledTypographyHeader variant="h6">
        Air Condition
      </StyledTypographyHeader>
      <StyledWeatherCard variant="outlined">
        <div>
          <div>
            <ThermostatIcon />
            <StyledTypographyHeader>Real Feel</StyledTypographyHeader>
          </div>
          <StyledTypographyText>
            {weather.current.feels_like} {String.fromCharCode(176)}
            {units ? "F" : "C"}
          </StyledTypographyText>
        </div>
        <div>
          <div>
            <AirIcon />
            <StyledTypographyHeader>Wind</StyledTypographyHeader>
          </div>
          <StyledTypographyText>
            {weather.current.wind_speed} {units ? "mi/h" : "m/s"}
          </StyledTypographyText>
        </div>
        <div>
          <div>
            <WaterIcon />
            <StyledTypographyHeader>Humidity</StyledTypographyHeader>
          </div>
          <StyledTypographyText>
            {weather.current.humidity} %
          </StyledTypographyText>
        </div>
        <div>
          <div>
            <WbSunnyIcon />
            <StyledTypographyHeader>UV Index</StyledTypographyHeader>
          </div>
          <StyledTypographyText>{weather.current.uvi}</StyledTypographyText>
        </div>
      </StyledWeatherCard>
      <StyledTypographyHeader variant="h6">
        Hourly Forecast
      </StyledTypographyHeader>
      <HourForecast weather={weather.hourly} units={units} />
    </div>
  );
}

export default TodayForecast;

const StyledWeatherCard = styled.div`
  display: flex;
  width: 600px;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgb(143, 137, 137);

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      flex-direction: row;
      gap: 5px;
    }
  }
`;
