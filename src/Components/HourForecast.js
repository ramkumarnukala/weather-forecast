import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { date } from "../Utilities/DatetimeUtils";

Chart.register(...registerables);

function HourForecast(props) {
  const weather = props.weather,
    units = props.units;
  const [data, setData] = useState(undefined);

  function getGradient(ctx, chartArea) {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (gradient === null || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );

      gradient.addColorStop(0, "#3fa4e4");
      gradient.addColorStop(units ? 0.5 : 0.3, "#c8b368");
      gradient.addColorStop(1, "#e55c76");
    }

    return gradient;
  }

  const hourlyDescription = (forecast) => {
    return weather[forecast[0].dataIndex].weather[0].description;
  };

  const updateDataIcon = {
    id: "weather_forecast",
    afterDatasetDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      ctx.save();

      weather.forEach((hour, index) => {
        if (
          hour.dt.toString().transformDateTime().toDateString() ===
          date.toDateString()
        ) {
          const image = new Image();
          image.src = require(`../Assets/icons/${hour.weather[0].icon}.png`);

          ctx.drawImage(
            image,
            scales.x.getPixelForValue(index) - 10,
            chartArea.top,
            20,
            20
          );
        }
      });

      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        suggestedMax: units ? 120 : 60,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      id: "weather_forecast",
      title: {
        display: true,
        text: "Hourly Temperature Forecast",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          footer: hourlyDescription,
        },
      },
    },
  };

  useEffect(() => {
    const labels = [];
    const tempData = [];

    weather.forEach((hour) => {
      if (
        hour.dt.toString().transformDateTime().toDateString() ===
        date.toDateString()
      ) {
        labels.push(hour.dt.toString().transformTime());
        tempData.push(hour.temp);
      }
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Temperature",
          maxBarThickness: 6,
          borderRadius: 5,
          data: tempData,
          backgroundColor: function (context) {
            const chart = context.chart;

            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return;
            }

            return getGradient(ctx, chartArea);
          },
        },
      ],
    };

    setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather]);

  return (
    <HourlyWeatherContainer>
      {data ? (
        <Bar data={data} options={options} plugins={[updateDataIcon]} />
      ) : (
        ""
      )}
    </HourlyWeatherContainer>
  );
}

export default HourForecast;

const HourlyWeatherContainer = styled.div`
  display: flex;
  width: 600px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgb(143, 137, 137);
`;
