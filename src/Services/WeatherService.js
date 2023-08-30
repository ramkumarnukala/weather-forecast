import axios from "axios";

const WEATHER_API_URL = "https://api.openweathermap.org/data/3.0/onecall";
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_SECRET;

export async function currentWeather(dataParams) {
  dataParams.appid = WEATHER_API_KEY;

  const request = {
    method: "get",
    url: `${WEATHER_API_URL}`,
    params: dataParams,
  };

  return await axios(request)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log(response.data);
      }
    })
    .catch((error) => console.log(error));
}
