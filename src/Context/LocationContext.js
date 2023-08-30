import React, { createContext, useEffect, useState } from "react";
import { fetchCityName } from "../Services/LocationService";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition((coordinates) => {
        const body = {
          latlng: `${coordinates.coords.latitude},${coordinates.coords.longitude}`,
        };

        Promise.all([fetchCityName(body)])
          .then((response) => {
            coordinates.coords.city =
              response[0].address_components[0].long_name;
            setLocation(coordinates.coords);
          })
          .catch((error) => console.log(error));

        setLocation(coordinates.coords);
      });
    }
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
