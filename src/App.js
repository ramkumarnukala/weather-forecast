import { useContext } from 'react';
import './App.css';
import { ThemeContext } from './Context/ThemeContext';
import Header from './Components/Header';
import LocationSearch from './Components/LocationSearch';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Header />
      <LocationSearch />
    </div>
  );
}

export default App;
