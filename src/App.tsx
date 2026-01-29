import React, { useState } from "react";
import { getCurrentWeatherOnCity, getTimeZoneOnCity } from "./api/weatherHandler.ts";
import { Requests } from "./types/constants.ts";

import type { WeatherData } from "./types/weather";
import type { TimeZone } from "./types/timezone";

function App() {

  const [ timeZone, setTimeZone ] = useState<TimeZone | null>(null)
  const [ city, setCity ] = useState("");
  const [ weather, setWeather ] = useState<WeatherData | null>(null);

  const handleSearch = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      await fetchWeather(Requests.CURRENT_WEATHER, city);
    }
  }

  async function fetchWeather(weatherType: number, city: string) {

    setTimeZone(null);
    setWeather(null);

    const weatherReqs = [];
    const timeZoneReq = getTimeZoneOnCity(city);
    weatherReqs.push(timeZoneReq);

    if (weatherType === Requests.CURRENT_WEATHER) {
      const currentWeatherReq = getCurrentWeatherOnCity(city);
      weatherReqs.push(currentWeatherReq);
    }

    const WeatherResps = await Promise.all(weatherReqs);

    WeatherResps.forEach(element => {
      if (element.status === 200 && element.response_type === Requests.TIME_ZONE) {
        setTimeZone(element.data as TimeZone);
      }
      else if (element.status === 200 && element.response_type === Requests.CURRENT_WEATHER) {
        setWeather(element.data as WeatherData);
      }
    });

  }

  return (
    <main className='min-h-screen flex flex-col justify-start items-center bg-gray-900 text-white gap-15 pt-10'>
      
      <header>
        <h1 className='text-5xl font-bold text-blue-500 bg-blue-200 px-96 py-4'>
          Weatherstamp
        </h1>
      </header>

      <form
        id="user-input" 
        className=""
        onSubmit={handleSearch}>

        <label
          htmlFor="city-search"
          className="text-xs">
            Buscar ciudad
        </label>
        <br />

        <input 
          id="city-search"
          className="bg-gray-800 p-2 w-100"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Escribe una ciudad..." />

        <button
          type="submit"
          className="bg-blue-500 p-2 px-4 font-bold rounded-r-2xl hover:cursor-pointer hover:bg-blue-600">
          Buscar
        </button>

      </form>

      {weather && (
        <article 
          id="city-info" 
          className="flex justify-center items-center w-150 gap-10">
          
          <div>

            <h2 className='text-gray-250 font-bold'>
              {weather.location.name}
            </h2>
            <p>
              {weather.location.region}, {weather.location.country}
            </p>

            {timeZone && (
              <p>
                Son las {timeZone.time_day} del {timeZone.date}
              </p>
            )}
            
          </div>

          <div>
            <span className='text-gray-250 font-bold'>
              {weather.current.temp_c + "º"}
            </span>     
            <p className="">
              {weather.current.condition.text}
            </p>
          </div>

          <img src={`https://${weather.current.condition.icon}`} alt="Icono tiempo actual"/>         

        </article>
      )}
      
    </main>
  )
}

export default App
