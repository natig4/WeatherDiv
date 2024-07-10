import { getLatLonForm } from "./components/coordsInput";
import { getSearchInput } from "./components/search";
import { CoordsSource, LocationFunc } from "./models";

export function renderLocationForm(
  viewSource: CoordsSource,
  onLocationChange: LocationFunc
): HTMLDivElement | HTMLFormElement {
  const currView =
    viewSource === "location"
      ? getSearchInput(onLocationChange)
      : getLatLonForm(onLocationChange);

  return currView;
}
