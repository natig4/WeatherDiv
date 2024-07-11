import { getDataSourceButtons } from "./view/components/viewSelector";
import { appendChildrenToParent, getContainerDiv } from "./helpers";
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

  function handleLocationChange(location: SelectedLocation) {
    state.selectedLocation = location;
    renderWeatherView(divId, state.selectedLocation);
  }
}

function renderWeatherView(
  divId: string,
  location: SelectedLocation,
  isLoading = false
) {
  const container: HTMLElement = (
    divId ? document.getElementById(divId) : document.body
  ) as HTMLElement;
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
