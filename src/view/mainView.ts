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

  set inputs(v: HTMLDivElement | null) {
    this.inputs && this.container.removeChild(this.inputs);
    this._inputs = v;
  }

  get weather(): HTMLDivElement | null {
    return this._weather;
  }

  set weather(v: HTMLDivElement | null) {
    this.weather && this.container.removeChild(this.weather);
    this._weather = v;
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

    this.container.appendChild(this.inputs);
  }

  handleViewChange(source: CoordsSource) {
    this.state.viewSource = source;
    this.state.selectedLocation = null;

    if (this.weather) {
      this.weather = null;
    }

    if (this.state.isLoading) {
      this.state.loadingWhileChanged = true;
    }

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

    this.container.appendChild(this.weather);
  }

  handleTempChange(temp: TempOptions) {
    this.state.selectedTemp = temp;

    this.handleLocationChange(this.state.selectedLocation);
  }
}
