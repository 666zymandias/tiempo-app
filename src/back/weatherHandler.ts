const URL_BASE: string = "http://api.weatherapi.com/v1";
const CURRENT_WEATHER_ENDPOINT: string = "/current.json";
const API_KEY = import.meta.env.VITE_WTR_API_KEY;

export async function getCurrentWeatherOnCity(userCity: string) {

    const reqCity = encodeURIComponent(userCity);

    try {
        const url = URL_BASE + CURRENT_WEATHER_ENDPOINT + "?key=" + API_KEY + "&q=" + reqCity;
        const response = await fetch(url);

        if (response.ok) {
            const weatherData = await response.json();
            return {status: 200, data: weatherData};
        } 
        else {
            return {status: response.status, data: null};
        } 
    }
    catch (error) {
        console.error(error);
        return {status: 500, data: null};
    }
    
}