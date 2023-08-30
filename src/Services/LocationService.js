import axios from "axios";

const GEO_LOCATION_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const GEO_LOCATION_GOOGLE_URL =
  "https://maps.googleapis.com/maps/api/geocode/json";
const WEATHER_API_KEY = process.env.REACT_APP_LOCATION_SECRET;

const GEO_API_HEADER = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  "content-type": "application/json",
};

export async function fetchCities(dataParams) {
  const request = {
    method: "get",
    url: GEO_LOCATION_URL,
    params: dataParams,
    headers: GEO_API_HEADER,
  };

  return await axios(request)
    .then((response) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.log(response.data);
      }
    })
    .catch((error) => console.log(error));
}

export async function fetchCityName(dataParams) {
  dataParams.key = WEATHER_API_KEY;

  const request = {
    method: "post",
    url: GEO_LOCATION_GOOGLE_URL,
    params: dataParams,
  };

  return await axios(request)
    .then((response) => {
      if (response.status === 200) {
        return response.data.results.filter(
          (location) =>
            JSON.stringify(location.types) ===
            JSON.stringify(["administrative_area_level_4", "political"])
        )[0];
      } else {
        console.log(response.data);
      }
    })
    .catch((error) => console.log(error));
}
