import { URL_BASE, LANG } from "../../types/constants"
const API_KEY = import.meta.env.VITE_WTR_API_KEY;

export function getBaseEndpointWeatherURL(endpoint: string): URL {
    const url = new URL(endpoint, URL_BASE);

    url.searchParams.append("key", API_KEY);
    url.searchParams.append("lang", LANG);

    return url;
}