import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();

  const inputRef = useRef();
  const buttonRef = useRef();

  async function searchCity() {
    console.log(inputRef.current.value);
    const city = inputRef.current.value;

    const myApi = `3544fc041e2a88f8e16b21ca1ea0365c`;

    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApi}&lang=pt_br&units=metric`;
    const urlApi5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myApi}&lang=pt_br&units=metric`;

    const apiDataWeather = await axios.get(urlApi);
    const apiData5Days = await axios.get(urlApi5Days);

    setWeather(apiDataWeather.data);
    setWeather5Days(apiData5Days.data);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previne o comportamento padrão do Enter
      buttonRef.current.click(); // Simula o clique do botão
    }
  };

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input
        ref={inputRef}
        placeholder="Digite o nome da cidade"
        type="text"
        onKeyDown={handleKeyDown}
      />
      <button onClick={searchCity} ref={buttonRef}>
        Buscar
      </button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;
