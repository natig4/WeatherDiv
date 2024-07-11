import { getDataSourceButtons } from "./components/viewSelector";
import { appendChildrenToParent } from "./helpers";
import { renderLocationForm } from "./location";
import { CoordsSource, Location } from "./models";
import { AppState } from "./state/state";

import "./css/index.scss";
import "./css/loader.scss";

export function init(divId = "weather-widget-container", addInputs = false) {
  const state = new AppState();
  addHeader(divId, state, addInputs);
}

function addHeader(divId: string, state: AppState, addInputs: boolean) {
  const targetDiv: HTMLElement | null = divId
    ? document.getElementById(divId)
    : document.body;

  targetDiv && renderWeatherWidget(targetDiv, state, addInputs);
}

function renderInputs(
  container: HTMLElement,
  state: AppState,
  handleViewChange: (source: CoordsSource) => void,
  handleLocationChange: (location: Location | null) => void
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
      renderLocationForm(state.viewSource, handleLocationChange),
      getDataSourceButtons(
        state.viewSource,
        handleViewChange,
        handleLocationChange
      ),
    ])
  );
}

function renderWeatherWidget(
  container: HTMLElement,
  state: AppState,
  addInputs: boolean
) {
  addInputs &&
    renderInputs(container, state, handleViewChange, handleLocationChange);

  if (state.selectedLocation) {
    renderWeatherInfo(container, state.selectedLocation);
  } else {
    const weatherContainer = document.querySelector(".weather-info");

    weatherContainer && container.removeChild(weatherContainer);
  }

  function handleViewChange(source: CoordsSource) {
    state.viewSource = source;
    renderWeatherWidget(container, state, addInputs);
  }

  function handleLocationChange(location: Location | null) {
    state.selectedLocation = location;
    renderWeatherWidget(container, state, addInputs);
  }
}

function renderWeatherInfo(container: HTMLElement, location: Location) {
  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-info");

  const locationName = document.createElement("h2");
  locationName.textContent = `Weather for ${
    location.name || `${location.lat}, ${location.lon}`
  }`;
  weatherInfo.appendChild(locationName);

  const placeholder = document.createElement("p");
  placeholder.textContent = "Weather data will be displayed here.";
  weatherInfo.appendChild(placeholder);

  container.appendChild(weatherInfo);
}

init(undefined, true);
