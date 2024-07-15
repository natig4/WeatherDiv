import { CoordsSource, SelectedLocation, TempOptions } from "../models";

export class AppState {
  private _isLoading = false;
  private _loadingWhileChanged = false;
  private _viewSource: CoordsSource = "location";
  private _selectedLocation: SelectedLocation = null;
  private _selectedTemp: TempOptions = "Celsius";
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

  set loadingWhileChanged(isChanged: boolean) {
    if (!isChanged) {
      this.isLoading = false;
    }
    this._loadingWhileChanged = isChanged;
  }

  get loadingWhileChanged(): boolean {
    return this._loadingWhileChanged;
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

  set selectedTemp(selectedTemp: TempOptions) {
    this._selectedTemp = selectedTemp;
  }

  get selectedTemp(): TempOptions {
    return this._selectedTemp;
  }
}
