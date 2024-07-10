import {CoordsSource, Location} from '../models';

export class AppState {
  private _isLoading = false;
  private _viewSource: CoordsSource = 'location';
  private _selectedLocation: Location | null = null;

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

  set selectedLocation(location: Location | null) {
    this._selectedLocation = location;
  }

  get selectedLocation(): Location | null {
    return this._selectedLocation;
  }
}
