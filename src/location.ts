import {getLatLonForm} from './components/coordsInput';
import {getSearchInput} from './components/search';
import {appendChildrenToParent} from './helpers';
import {CoordsSource} from './models';

export function renderLocationForm(viewSource: CoordsSource): HTMLDivElement {
  const currView =
    viewSource === 'location' ? getSearchInput() : getLatLonForm();

  return appendChildrenToParent(document.createElement('div'), [currView]);
}
