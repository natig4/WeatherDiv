import { CoordsSource, SelectedLocation, TempDisplay } from "../models";

export class AppState {
  private _isLoading = false;
  private _viewSource: CoordsSource = "location";
  private _selectedLocation: SelectedLocation = null;
  private _selectedTemp: TempDisplay = "Celsius";
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set viewSource(viewSource: CoordsSource) {
    this._viewSource = viewSource;
  }

  get viewSource(): CoordsSource {
    return this._viewSource;
  }

  set selectedLocation(location: SelectedLocation) {
    this._selectedLocation = location;
  }

  get selectedLocation(): SelectedLocation {
    return this._selectedLocation;
  }

  set selectedTemp(selectedTemp: TempDisplay) {
    this._selectedTemp = selectedTemp;
  }

  get selectedTemp(): TempDisplay {
    return this._selectedTemp;
  }
}
