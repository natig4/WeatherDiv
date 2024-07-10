import {CoordsSource} from '../models';

export class AppState {
  private _isLoading = false;
  private _viewSource: CoordsSource = 'location';

  set viewSource(viewSource: CoordsSource) {
    this._viewSource = viewSource;
  }

  set loading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get viewSource(): CoordsSource {
    return this._viewSource;
  }
}
