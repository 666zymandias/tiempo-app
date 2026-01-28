import type { WeatherData } from "../types/weather";
import { getBaseEndpointWeatherURL } from "./utils/weatherAPIUtils";
import { endpoints } from "../types/constants";

export async function getCurrentWeatherOnCity(city: string) {
    const url = getBaseEndpointWeatherURL(endpoints.CURRENT_WEATHER);
    url.searchParams.append("q", city);

    try {
        const response = await fetch(url);

        if (response.ok) {
            const responseData = await response.json();
            return {status: 200, data: responseData as WeatherData};
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