import { View } from "./view/mainView";

import "./css/index.scss";
import "./css/loader.scss";

export function init(apiKey: string, divId = "weather-widget-container") {
  if (!apiKey) {
    console.error("WeatherWidget: API key is required");
    return;
  }
  const container = (
    divId ? document.getElementById(divId) || document.body : document.body
  ) as HTMLElement;

  new View(container, apiKey).renderWeatherWidget();
}
