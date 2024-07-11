import { getDataSourceButtons } from "./view/components/viewSelector";
import { appendChildrenToParent, getContainerDiv, getLoader } from "./helpers";
import { renderLocationForm } from "./location";
import {
  CoordsSource,
  IDayWeather,
  LocationFunc,
  SelectedLocation,
} from "./models";
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
  locationName.textContent = `Weather for ${location.name}`;
  console.log("location", location.temps);

  const days = location.temps.map((weather) => renderDayHelper(weather));
  const daysContainer = appendChildrenToParent(
    document.createElement("div"),
    days
  );
  daysContainer.classList.add("days-container");

  weatherInfo.insertAdjacentElement("afterbegin", daysContainer);
  weatherInfo.insertAdjacentElement("afterbegin", locationName);

  console.log(weatherInfo.children);

  return weatherInfo;
}

function renderDayHelper(weather: IDayWeather) {
  const dayContainer = document.createElement("div");
  dayContainer.classList.add("day-container");
  const dayName = document.createElement("h4");
  dayName.innerText = weather.day;
  const img = document.createElement("img");
  img.src = "";
  const recommendation = document.createElement("p");
  recommendation.innerText = weather.recommendation;
  const temp = document.createElement("h4");
  temp.innerText = weather.temp;

  return appendChildrenToParent(dayContainer, [
    dayName,
    img,
    recommendation,
    temp,
  ]);
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
