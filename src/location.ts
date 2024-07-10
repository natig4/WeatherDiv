import {getLatLonForm} from './components/coordsInput';
import {getSearchInput} from './components/search';
import {appendChildrenToParent} from './helpers';
import {CoordsSource, LocationFunc} from './models';

export function renderLocationForm(
  viewSource: CoordsSource,
  onLocationChange: LocationFunc
): HTMLDivElement {
  const currView =
    viewSource === 'location'
      ? getSearchInput(onLocationChange)
      : getLatLonForm(onLocationChange);

  return appendChildrenToParent(document.createElement('div'), [currView]);
}
