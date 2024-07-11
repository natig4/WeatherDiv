import { CoordsSource, SelectedLocation, TempDisplay } from "./models";
import { AppState } from "./state/state";
import { renderWeatherView } from "./view/components/weather";
import { renderInputs } from "./view/components/inputs";

import "./css/index.scss";
import "./css/loader.scss";

export function init(apiKey: string, divId = "weather-widget-container") {
  if (!apiKey) {
    console.error("WeatherWidget: API key is required");
    return;
  }
  const state = new AppState(apiKey);
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
    handleLocationChange,
    state.apiKey
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

init("e757f819eb834f1b92795849241107");
