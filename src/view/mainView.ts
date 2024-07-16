import { getLoader } from "../helpers";
import { CoordsSource, SelectedLocation, TempOptions } from "../models";
import { AppState } from "../state/state";
import { getInputsView } from "./components/inputs";
import { getWeatherView } from "./components/weather";

export class View {
  private loader = getLoader();
  container: HTMLElement;
  _inputs: HTMLDivElement | null = null;
  _weather: HTMLDivElement | null = null;
  state: AppState;

  get inputs(): HTMLDivElement | null {
    return this._inputs;
  }

  set inputs(inputsEl: HTMLDivElement | null) {
    this.replaceElement(this.inputs, inputsEl);

    this._inputs = inputsEl;
  }

  get weather(): HTMLDivElement | null {
    return this._weather;
  }

  set weather(weatherEl: HTMLDivElement | null) {
    this.replaceElement(this.weather, weatherEl);

    this._weather = weatherEl;
  }

  constructor(container: HTMLElement, apiKey: string) {
    this.container = container;
    this.state = new AppState(apiKey);

    const heading = document.createElement("h1");
    heading.innerText = "Please select a location";
    heading.classList.add("app-header");

    this.container.appendChild(heading);
  }

  renderWeatherWidget() {
    this.inputs = getInputsView(
      this.state,
      (source: CoordsSource) => this.handleViewChange(source),
      (location: SelectedLocation, isLoading = false) =>
        this.handleLocationChange(location, isLoading)
    );
  }

  handleViewChange(source: CoordsSource) {
    this.state.viewSource = source;
    this.resetWeatherView();

    this.renderWeatherWidget();
  }

  handleLocationChange(location: SelectedLocation, isLoading = false) {
    this.state.selectedLocation = location;
    this.state.isLoading = isLoading;

    const { selectedLocation, selectedTemp } = this.state;

    this.weather = isLoading
      ? this.loader
      : getWeatherView(
          selectedLocation,
          selectedTemp,
          isLoading,
          (temp: TempOptions) => this.handleTempChange(temp)
        );
  }

  handleTempChange(temp: TempOptions) {
    this.state.selectedTemp = temp;

    this.handleLocationChange(this.state.selectedLocation);
  }

  private resetWeatherView() {
    this.state.selectedLocation = null;
    this.state.isLoading = false;

    if (this.weather) {
      this.weather = null;
    }
  }

  private replaceElement(
    currEl: HTMLDivElement | null,
    newEl: HTMLDivElement | null
  ) {
    currEl && this.container.removeChild(currEl);
    newEl && this.container.appendChild(newEl);
  }
}
