import { getLatLonForm } from "./coordsInput";
import { getSearchInput } from "./search";
import { CoordsSource, LocationFunc } from "../../models";

export function renderLocationForm(
  viewSource: CoordsSource,
  onLocationChange: LocationFunc,
  apiKey: string
): HTMLDivElement | HTMLFormElement {
  const currView =
    viewSource === "location"
      ? getSearchInput(onLocationChange, apiKey)
      : getLatLonForm(onLocationChange, apiKey);

  return currView;
}
