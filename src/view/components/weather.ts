import {
  appendChildrenToParent,
  capitalize,
  getDropdown,
  getLoader,
} from "../../helpers";
import { IDayWeather, SelectedLocation, TempDisplay } from "../../models";
import "../../css/weather.scss";
import { getImgByRecommendation, getWeatherForUi } from "../../service";

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

  if (weatherContainer) {
    weatherContainer.innerHTML =
      "<h2>Location wasn't found please try again</h2>";
  }
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
  locationName.textContent = `Weather predication in ${uILocation.name}`;

  const days = uILocation.temps.map((weather) => renderDayHelper(weather));
  const daysContainer = appendChildrenToParent(
    document.createElement("div"),
    days
  );
  daysContainer.classList.add("days-container");

  const dropdown = getDropdown(
    ["Celsius", "Fahrenheit"],
    selectedTemp,
    (option) => {
      onTempChange(option as TempDisplay);
    }
  );

  dropdown.classList.add("temp-select-container");

  return appendChildrenToParent(weatherInfo, [
    locationName,
    dropdown,
    daysContainer,
  ]);
}

function renderDayHelper(weather: IDayWeather) {
  const dayContainer = document.createElement("div");
  dayContainer.classList.add("day-container");

  const dayName = document.createElement("h4");
  dayName.innerText = weather.day;
  dayName.classList.add("header");

  const recommendation = document.createElement("p");
  recommendation.innerText = capitalize(weather.recommendation);

  const img = document.createElement("img");
  img.src = getImgByRecommendation(weather.recommendation);

  const imgContainer = appendChildrenToParent(document.createElement("div"), [
    img,
    recommendation,
  ]);
  imgContainer.classList.add("img-container");

  const temp = document.createElement("h4");
  temp.classList.add("footer");
  temp.textContent = `${weather.temp}`;

  return appendChildrenToParent(dayContainer, [dayName, imgContainer, temp]);
}
