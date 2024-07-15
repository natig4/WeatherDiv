import { View } from "./view/mainView";
import { AppState } from "./state/state";

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

  const state = new AppState(apiKey);
  new View(container, state).renderWeatherWidget();
}
