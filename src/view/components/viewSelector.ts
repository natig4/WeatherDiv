import { getRadioButtons } from "../../helpers";
import { CoordsSource, LocationFunc } from "../../models";

export function getDataSourceButtons(
  viewSource: CoordsSource,
  handleViewChange: (source: CoordsSource) => void,
  onLocationChange: LocationFunc
) {
  const buttons = getRadioButtons(
    ["location", "coordinates"],
    viewSource,
    (option) => {
      handleViewChange(option as CoordsSource);
      onLocationChange(null);
    }
  );

  buttons.classList.add("view-buttons-container");

  return buttons;
}
