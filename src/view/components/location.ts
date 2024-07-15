import { getLatLonForm } from "./coordsInput";
import { getSearchInput } from "./search";
import { LocationFunc } from "../../models";
import { AppState } from "../../state/state";

export function renderLocationForm(
  onLocationChange: LocationFunc,
  state: AppState
): HTMLDivElement | HTMLFormElement {
  const currView =
    state.viewSource === "location"
      ? getSearchInput(onLocationChange, state)
      : getLatLonForm(onLocationChange, state);

  return currView;
}
