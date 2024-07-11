import { CoordsSource, SelectedLocation, TempDisplay } from "./models";
import { AppState } from "./state/state";
import { renderWeatherView } from "./view/components/weather";
import { renderInputs } from "./view/components/inputs";

import "./css/index.scss";
import "./css/loader.scss";

export function init(divId = "weather-widget-container") {
  const state = new AppState();
  const container = (
    divId ? document.getElementById(divId) : document.body
  ) as HTMLElement;

  renderWeatherWidget(container, state);
}

function renderWeatherWidget(container: HTMLElement, state: AppState) {
  renderInputs(
    container,
    state.viewSource,
    handleViewChange,
    handleLocationChange
  );

  function handleViewChange(source: CoordsSource) {
    container.innerHTML = "";
    state.viewSource = source;
    renderWeatherWidget(container, state);
  }

  function handleLocationChange(location: SelectedLocation, isLoading = false) {
    state.selectedLocation = location;
    renderWeatherView(
      container,
      state.selectedLocation,
      state.selectedTemp,
      isLoading,
      handleTempChange
    );
  }

  function handleTempChange(temp: TempDisplay) {
    state.selectedTemp = temp;
    handleLocationChange(state.selectedLocation);
  }
}

init();
