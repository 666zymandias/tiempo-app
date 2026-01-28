import { useState } from "react";
import { getCurrentWeatherOnCity } from "./api/weatherHandler.ts";
import { momentWeather } from "./types/constants.ts";

import type { WeatherData } from "./types/weather";

function App() {

  const [ city, setCity ] = useState("");
  const [ weather, setWeather ] = useState<WeatherData | null>(null);

  async function fetchWeather(weatherType: number, city: string) {

    if (weatherType === momentWeather.CURRENT_WEATHER) {
      const request = await getCurrentWeatherOnCity(city);

      if (request.status === 200) {
        setWeather(request.data);
      }
    }

  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white gap-4'>
      <h1 className='text-4xl font-bold text-blue-400'>
        Weatherstamp
      </h1>

      <section id="user-input">
        <input 
          type="text"
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Escribe una ciudad..." />
        <button
          onClick={() => fetchWeather(momentWeather.CURRENT_WEATHER, city)}>
          Buscar
        </button>
      </section>

      <section id="city-temperature">
        {weather && (
          <>
            <section>
              <h3 className='text-gray-400'>
                {weather.location.name}
              </h3>
              <h4>
                {weather.location.region}
              </h4>
              <h5>
                {weather.location.country}
              </h5>
            </section>

            <section>
              <img src={`https://${weather.current.condition.icon}`} alt="Icono tiempo actual"/>
              <h3 className='text-gray-400'>
                {weather.current.temp_c + "º"}
              </h3>     
              <h2>
                {weather.current.condition.text}
              </h2>
            </section>
          </>
        )}
      </section>
    </div>
  )
}

export default App
