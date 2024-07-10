import { appendChildrenToParent } from "../helpers";
import { CoordsSource, LocationFunc } from "../models";

export function getDataSourceButtons(
  viewSource: CoordsSource,
  handleViewChange: (source: CoordsSource) => void,
  onLocationChange: LocationFunc
) {
  const options: CoordsSource[] = ["location", "coordinates"];

  const htmlOptions = options.map((option) => {
    const container = document.createElement("div");
    container.classList.add("view-button-container");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = option;
    radio.name = "searchType";
    radio.value = option;
    radio.checked = option === viewSource;

    const label = document.createElement("label");
    label.htmlFor = option;
    label.textContent = option.charAt(0).toUpperCase() + option.slice(1);

    radio.addEventListener("change", function () {
      if (this.checked) {
        handleViewChange(option);
        onLocationChange(null);
      }
    });

    return appendChildrenToParent(container, [
      container.appendChild(radio),
      container.appendChild(label),
    ]);
  });

  const buttons = appendChildrenToParent(
    document.createElement("div"),
    htmlOptions
  );
  buttons.classList.add("view-buttons-container");

  return buttons;
}
