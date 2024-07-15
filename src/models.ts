export const API_URL = "http://api.weatherapi.com/v1/forecast.json";
export const API_TIMEFRAME = 14;

export type InputType = "text" | "search" | "radio";
export type CoordsSource = "location" | "coordinates";
export type TempOptions = "Celsius" | "Fahrenheit";

export interface ICity {
  lat: string;
  lon: string;
  display_name: string;
  name: string;
}

export interface ILocation {
  name: string;
  temps: IDayWeather[];
}

export interface IDayWeather {
  day: string;
  temp: string;
  recommendation: ImageSourceKeys;
}

export type SelectedLocation = IWeatherAPIResponse | null;

export type LocationFunc = (
  location: SelectedLocation,
  isLoading?: boolean
) => void;

export interface IWeatherAPIResponse {
  location: Location;
  forecast: Forecast;
}

interface Forecast {
  forecastday: Forecastday[];
}

export interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
}

interface Day {
  avgtemp_c: number;
  avgtemp_f: number;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export const ImageSource = {
  cloud:
    "https://w7.pngwing.com/pngs/560/125/png-transparent-weather-map-weather-forecasting-symbol-weather-cloud-computer-wallpaper-meteorology-thumbnail.png",
  hot: "https://w7.pngwing.com/pngs/999/428/png-transparent-sun-weather-sunny-rays-sunshine-symbol-thumbnail.png",
  rain: "https://w7.pngwing.com/pngs/935/733/png-transparent-cloud-weather-rain-rainfall-rainclouds-raincloud-rains-signs-symbols-forecast-thumbnail.png",
  snow: "https://w7.pngwing.com/pngs/553/202/png-transparent-cloud-weather-snowflake-symbol-snowflake-weather-symbol-blue-cloud-heart-thumbnail.png",
  cold: "https://w7.pngwing.com/pngs/450/25/png-transparent-weather-forecasting-symbol-drizzle-sunny-weather-forecast-blue-cloud-heart-thumbnail.png",
} as const;

export type ImageSource = (typeof ImageSource)[keyof typeof ImageSource];

export const ImageSourceKeys: ValueIsKey<typeof ImageSource> = {
  cloud: "cloud",
  hot: "hot",
  rain: "rain",
  snow: "snow",
  cold: "cold",
} as const;

export type ImageSourceKeys =
  (typeof ImageSourceKeys)[keyof typeof ImageSourceKeys];

export type ValueIsKey<T extends Record<string, string | number>> = {
  [K in keyof T]: K;
};
