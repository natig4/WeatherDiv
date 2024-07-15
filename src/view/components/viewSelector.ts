import { getRadioButtons } from "../../helpers";
import { CoordsSource } from "../../models";

export function getDataSourceButtons(
  viewSource: CoordsSource,
  handleViewChange: (source: CoordsSource) => void
) {
  const buttons = getRadioButtons(
    ["location", "coordinates"],
    viewSource,
    (option) => {
      handleViewChange(option as CoordsSource);
    }
  );

  buttons.classList.add("view-buttons-container");

  return buttons;
}
