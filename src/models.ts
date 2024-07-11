export const API_URL = 'http://api.weatherapi.com/v1/forecast.json';
export const API_TIMEFRAME = 14;

export type InputType = 'text' | 'search' | 'radio';
export type CoordsSource = 'location' | 'coordinates';

export interface ICity {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

interface ILocation {
  name?: string;
  lat: number;
  lon: number;
}

export type SelectedLocation = ILocation | null;

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

interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
}

interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
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
