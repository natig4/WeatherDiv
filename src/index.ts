import { getDataSourceButtons } from "./view/components/viewSelector";
import { appendChildrenToParent } from "./helpers";
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
  const container: HTMLElement = (
    divId ? document.getElementById(divId) : document.body
  ) as HTMLElement;

  addInputs &&
    state &&
    renderInputs(
      container,
      state.viewSource,
      handleViewChange,
      handleLocationChange
    );

  renderWeatherView(container, state.selectedLocation);

  function handleViewChange(source: CoordsSource) {
    state.viewSource = source;
    renderWeatherWidget(divId, addInputs, state);
  }

  function handleLocationChange(location: SelectedLocation) {
    state.selectedLocation = location;
    renderWeatherWidget(divId, addInputs, state);
  }
}

function renderWeatherView(
  container: HTMLElement,
  location: SelectedLocation,
  isLoading = false
) {
  console.log("isLoading", isLoading);

  if (location) {
    renderWeatherInfo(container, location);
  } else {
    const weatherContainer = document.querySelector(".weather-info");
    weatherContainer && (container.innerHTML = "");
  }
}

function renderWeatherInfo(container: HTMLElement, location: SelectedLocation) {
  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-info");
  if (location) {
    const locationName = document.createElement("h2");
    locationName.textContent = `Weather for ${
      location.name || `${location.lat}, ${location.lon}`
    }`;
    weatherInfo.appendChild(locationName);

    // add location weather here

    const placeholder = document.createElement("p");
    placeholder.textContent = "Weather data will be displayed here.";
    weatherInfo.appendChild(placeholder);
  }
  // add loader here

  container.appendChild(weatherInfo);
}

function renderInputs(
  container: HTMLElement,
  viewSource: CoordsSource,
  handleViewChange: (source: CoordsSource) => void,
  handleLocationChange: LocationFunc
) {
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
