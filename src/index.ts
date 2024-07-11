import { CoordsSource, SelectedLocation } from "./models";
import { AppState } from "./state/state";

import { renderWeatherView } from "./view/components/weather";
import { renderInputs } from "./view/components/inputs";

import "./css/index.scss";
import "./css/loader.scss";

export function init(divId = "weather-widget-container") {
  const state = new AppState();

  renderWeatherWidget(divId, state);
}

export function renderWeatherWidget(
  divId = "weather-widget-container",

  state: AppState
) {
  state &&
    renderInputs(
      divId,
      state.viewSource,
      handleViewChange,
      handleLocationChange
    );

  function handleViewChange(source: CoordsSource) {
    state.viewSource = source;
    renderWeatherWidget(divId, state);
  }

  function handleLocationChange(location: SelectedLocation, isLoading = false) {
    state.selectedLocation = location;
    renderWeatherView(divId, state.selectedLocation, isLoading);
  }
}

init();
