import { getDataSourceButtons } from "./view/components/viewSelector";
import { appendChildrenToParent, getContainerDiv, getLoader } from "./helpers";
import { renderLocationForm } from "./location";
import { CoordsSource, LocationFunc, SelectedLocation } from "./models";
import { AppState } from "./state/state";

import "./css/index.scss";
import "./css/loader.scss";

export function init(divId = "weather-widget-container", addInputs = false) {
  const state = new AppState();

  renderWeatherWidget(divId, addInputs, state);
}

function renderWeatherWidget(
  divId = "weather-widget-container",
  addInputs = false,
  state: AppState
) {
  addInputs &&
    state &&
    renderInputs(
      divId,
      state.viewSource,
      handleViewChange,
      handleLocationChange
    );

  function handleViewChange(source: CoordsSource) {
    state.viewSource = source;
    renderWeatherWidget(divId, addInputs, state);
  }

  function handleLocationChange(location: SelectedLocation, isLoading = false) {
    state.selectedLocation = location;
    renderWeatherView(divId, state.selectedLocation, isLoading);
  }
}

function renderWeatherView(
  divId: string,
  location: SelectedLocation,
  isLoading: boolean
) {
  const container: HTMLElement = (
    divId ? document.getElementById(divId) : document.body
  ) as HTMLElement;
  console.log("isLoading", isLoading);
  if (location || isLoading) {
    return renderWeatherInfo(container, location);
  }
  const weatherContainer = document.querySelector(".weather-info");
  weatherContainer && (container.innerHTML = "");
}

function renderWeatherInfo(container: HTMLElement, location: SelectedLocation) {
  const weatherInfo =
    document.querySelector(".weather-info") || document.createElement("div");

  weatherInfo.innerHTML = "";
  weatherInfo.classList.add("weather-info");

  weatherInfo.appendChild(renderWeatherInfoHelper(location));

  container.appendChild(weatherInfo);
}

function renderWeatherInfoHelper(location: SelectedLocation): HTMLDivElement {
  if (!location) {
    return getLoader();
  }

  const weatherInfo = document.createElement("div");
  const locationName = document.createElement("h2");
  locationName.textContent = `Weather for ${
    location.name || `${location.lat}, ${location.lon}`
  }`;

  weatherInfo.appendChild(locationName);

  // add location weather here

  const placeholder = document.createElement("p");
  placeholder.textContent = "Weather data will be displayed here.";
  weatherInfo.appendChild(placeholder);
  return weatherInfo;
}

function renderInputs(
  divId: string,
  viewSource: CoordsSource,
  handleViewChange: (source: CoordsSource) => void,
  handleLocationChange: LocationFunc
) {
  const container = getContainerDiv(divId);
  container.innerHTML = "";

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

init(undefined, true);
