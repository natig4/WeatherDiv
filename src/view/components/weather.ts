import { appendChildrenToParent, getLoader } from "../../helpers";
import { IDayWeather, SelectedLocation } from "../../models";
import "../../css/weather.scss";

export function renderWeatherView(
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
