export const API_URL = "http://api.weatherapi.com/v1/forecast.json";
export const API_TIMEFRAME = 14;

export type InputType = "text" | "search" | "radio";
export type CoordsSource = "location" | "coordinates";
export type TempDisplay = "Celsius" | "Fahrenheit";

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
  recommendation: string;
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
