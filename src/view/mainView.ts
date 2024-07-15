import { CoordsSource, SelectedLocation, TempDisplay } from "../models";
import { AppState } from "../state/state";
import { renderInputs } from "./components/inputs";
import { renderWeatherView } from "./components/weather";

export class View {
  container: HTMLElement;
  state: AppState;

  constructor(container: HTMLElement, state: AppState) {
    this.container = container;
    this.state = state;
  }

  renderWeatherWidget() {
    renderInputs(
      this.container,
      this.state,
      (source: CoordsSource) => this.handleViewChange(source),
      (location: SelectedLocation, isLoading = false) =>
        this.handleLocationChange(location, isLoading)
    );
  }

  handleViewChange(source: CoordsSource) {
    this.container.innerHTML = "";
    this.state.viewSource = source;
    this.renderWeatherWidget();
  }

  handleLocationChange(location: SelectedLocation, isLoading = false) {
    this.state.selectedLocation = location;
    renderWeatherView(
      this.container,
      this.state.selectedLocation,
      this.state.selectedTemp,
      isLoading,
      (temp: TempDisplay) => this.handleTempChange(temp)
    );
  }

  handleTempChange(temp: TempDisplay) {
    this.state.selectedTemp = temp;
    this.handleLocationChange(this.state.selectedLocation);
  }
}
