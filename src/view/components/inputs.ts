import { appendChildrenToParent } from "../../helpers";
import { renderLocationForm } from "../../location";
import { CoordsSource, LocationFunc } from "../../models";
import { getDataSourceButtons } from "./viewSelector";

import "../../css/inputs.scss";

export function renderInputs(
  container: HTMLElement,
  viewSource: CoordsSource,
  handleViewChange: (source: CoordsSource) => void,
  handleLocationChange: LocationFunc
) {
  const coordsSource = document.createElement("div");
  coordsSource.classList.add("coords-source");

  const heading = document.createElement("h1");
  heading.innerText = "Please select location";
  heading.classList.add("app-header");

  container.appendChild(heading);
  container.appendChild(
    appendChildrenToParent(coordsSource, [
      renderLocationForm(viewSource, handleLocationChange),
      getDataSourceButtons(viewSource, handleViewChange, handleLocationChange),
    ])
  );
}
