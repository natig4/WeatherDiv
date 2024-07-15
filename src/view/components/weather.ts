import { appendChildrenToParent, capitalize, getDropdown } from "../../helpers";
import { IDayWeather, SelectedLocation, TempOptions } from "../../models";
import "../../css/weather.scss";
import { getImgByRecommendation, getWeatherForUi } from "../../service";

export function getWeatherView(
  location: SelectedLocation,
  selectedTemp: TempOptions,
  isLoading: boolean,
  onTempChange: (temp: TempOptions) => void
) {
  if (location || isLoading) {
    return renderWeatherInfo(location, selectedTemp, onTempChange);
  }

  const notFound = document.createElement("div");

  notFound.innerHTML = "<h2>Location wasn't found please try again</h2>";

  return notFound;
}

function renderWeatherInfo(
  location: SelectedLocation,
  selectedTemp: TempOptions,
  onTempChange: (temp: TempOptions) => void
): HTMLDivElement {
  return renderWeatherInfoHelper(location, selectedTemp, onTempChange);
}

function renderWeatherInfoHelper(
  location: SelectedLocation,
  selectedTemp: TempOptions,
  onTempChange: (temp: TempOptions) => void
): HTMLDivElement {
  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-container");

  const locationName = document.createElement("h2");
  const uILocation = getWeatherForUi(location!, selectedTemp);
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
      onTempChange(option as TempOptions);
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
