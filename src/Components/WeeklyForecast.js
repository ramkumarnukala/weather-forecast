import React from "react";
import styled from "styled-components";
import WeatherIcon from "./WeatherIcon";
import { weatherIcon } from "../Utilities/IconUtils";
import {
  StyledTypographyHeader,
  StyledTypographyText,
} from "./WeatherForecast";

function WeeklyForecast(props) {
  const weather = props.weather,
    units = props.units;

  return (
    <div className="weekly-forecast">
      <StyledTypographyHeader variant="h5">
        Weekly Forecast
      </StyledTypographyHeader>
      {weather.map((day, index) => {
        if (index === 1) {
          return "";
        }
        return (
          <StyledWeeklyCard variant="outlined">
            <div>
              <StyledTypographyHeader>
                {day.dt.toString().transformDay()}
              </StyledTypographyHeader>
              <StyledTypographyText>
                {day.dt.toString().transformDateFormat()}
              </StyledTypographyText>
            </div>
            <div>
              <StyledTypographyHeader>
                {day.temp.morn.toFixed(1)} {String.fromCharCode(176)}
                {units ? "F" : "C"}
              </StyledTypographyHeader>
              <StyledTypographyText>
                {day.weather[0].description.replace(
                  day.weather[0].description[0],
                  day.weather[0].description[0].toUpperCase()
                )}
              </StyledTypographyText>
            </div>
            <div>
              <WeatherIcon src={weatherIcon(`${day.weather[0].icon}.png`)} />
            </div>
          </StyledWeeklyCard>
        );
      })}
    </div>
  );
}

export default WeeklyForecast;

const StyledWeeklyCard = styled.div`
  display: flex;
  width: 400px;
  height: 60px;
  padding: 0px 50px 0px 50px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgb(143, 137, 137);

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
