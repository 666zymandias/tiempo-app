import type { WeatherData } from "../types/weather";
import { getBaseEndpointWeatherURL } from "./weatherAPIUtils";
import { Endpoints, Requests } from "../types/constants";

export async function getCurrentWeatherOnCity(city: string) {
    const url = getBaseEndpointWeatherURL(Endpoints.CURRENT_WEATHER);
    url.searchParams.append("q", city);

    try {
        const response = await fetch(url);

        if (response.ok) {
            const responseData = await response.json();
            return {
                status: 200,
                response_type: Requests.CURRENT_WEATHER,
                data: responseData as WeatherData
            };
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

export async function getTimeZoneOnCity(city: string) {
    const url = getBaseEndpointWeatherURL(Endpoints.TIME_ZONE);
    url.searchParams.append("q", city);

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            const dateArray = data.location.localtime.split(' ');
            return {
                status: 200,
                response_type: Requests.TIME_ZONE,
                data: {
                    date: dateArray[0],
                    time_day: dateArray[1]
                }
            };
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