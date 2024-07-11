import { getLatLonForm } from "./view/components/coordsInput";
import { getSearchInput } from "./view/components/search";
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
