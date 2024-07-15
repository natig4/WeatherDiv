import { appendChildrenToParent } from "../../helpers";
import { renderLocationForm } from "./location";
import { CoordsSource, LocationFunc } from "../../models";
import { getDataSourceButtons } from "./viewSelector";
import { AppState } from "../../state/state";

import "../../css/inputs.scss";

export function getInputsView(
  { viewSource, apiKey }: AppState,
  handleViewChange: (source: CoordsSource) => void,
  handleLocationChange: LocationFunc
): HTMLDivElement {
  const coordsSource = document.createElement("div");
  coordsSource.classList.add("coords-source");

  return appendChildrenToParent(coordsSource, [
    renderLocationForm(viewSource, handleLocationChange, apiKey),
    getDataSourceButtons(viewSource, handleViewChange),
  ]);
}
