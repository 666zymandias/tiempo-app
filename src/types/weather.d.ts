export interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
    }
    current: {
        is_day: number;
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        }
    }
}