import {
  appendChildrenToParent,
  getLoader,
  getRadioButtons,
  getWeatherForUi,
} from "../../helpers";
import { IDayWeather, SelectedLocation, TempDisplay } from "../../models";
import "../../css/weather.scss";

export function renderWeatherView(
  container: HTMLElement,
  location: SelectedLocation,
  selectedTemp: TempDisplay,
  isLoading: boolean,
  onTempChange: (temp: TempDisplay) => void
) {
  if (location || isLoading) {
    return renderWeatherInfo(container, location, selectedTemp, onTempChange);
  }
  const weatherContainer = document.querySelector(".weather-info");
  weatherContainer && (container.innerHTML = "");
}

function renderWeatherInfo(
  container: HTMLElement,
  location: SelectedLocation,
  selectedTemp: TempDisplay,
  onTempChange: (temp: TempDisplay) => void
) {
  const weatherInfo =
    document.querySelector(".weather-info") || document.createElement("div");

  weatherInfo.innerHTML = "";
  weatherInfo.classList.add("weather-info");

  weatherInfo.appendChild(
    renderWeatherInfoHelper(location, selectedTemp, onTempChange)
  );

  container.appendChild(weatherInfo);
}

function renderWeatherInfoHelper(
  location: SelectedLocation,
  selectedTemp: TempDisplay,
  onTempChange: (temp: TempDisplay) => void
): HTMLDivElement {
  if (!location) {
    return getLoader();
  }

  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-container");

  const locationName = document.createElement("h2");
  const uILocation = getWeatherForUi(location, selectedTemp);
  locationName.textContent = `Weather for ${uILocation.name}`;

  const days = uILocation.temps.map((weather) => renderDayHelper(weather));
  const daysContainer = appendChildrenToParent(
    document.createElement("div"),
    days
  );
  daysContainer.classList.add("days-container");

  const options = ["Celsius", "Fahrenheit"];

  const buttons = getRadioButtons(options, selectedTemp, (option) => {
    onTempChange(option as TempDisplay);
  });

  buttons.classList.add("temp-buttons-container");

  return appendChildrenToParent(weatherInfo, [
    locationName,
    buttons,
    daysContainer,
  ]);
}

function renderDayHelper(weather: IDayWeather) {
  const dayContainer = document.createElement("div");
  dayContainer.classList.add("day-container");

  const dayName = document.createElement("h4");
  dayName.innerText = weather.day;
  dayName.classList.add("header");

  const img = document.createElement("img");
  img.src = "";

  const recommendation = document.createElement("p");
  recommendation.innerText = weather.recommendation;

  const temp = document.createElement("h4");
  temp.classList.add("footer");
  temp.textContent = `${weather.temp}`;

  return appendChildrenToParent(dayContainer, [
    dayName,
    img,
    recommendation,
    temp,
  ]);
}
