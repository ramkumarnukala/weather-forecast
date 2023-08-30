import { useContext } from "react";
import "./App.css";
import { ThemeContext } from "./Context/ThemeContext";
import Header from "./Components/Header";
import LocationSearch from "./Components/LocationSearch";
import WeatherForecast from "./Components/WeatherForecast";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Header />
      <LocationSearch />
      <WeatherForecast />
    </div>
  );
}

export default App;
