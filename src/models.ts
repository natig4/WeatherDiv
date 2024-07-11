export type InputType = "text" | "search" | "radio";
export type CoordsSource = "location" | "coordinates";

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
