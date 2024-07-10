import {getLatLonForm} from './components/coordsInput';
import {getSearchInput} from './components/search';
import {appendChildrenToParent} from './helpers';

export function addLocationForm(divId: string): void {
  const search = getSearchInput();
  const latLonForm = getLatLonForm();
  const inputsContainer = appendChildrenToParent(
    document.createElement('div'),
    [search, latLonForm]
  );

  const targetDiv: HTMLElement | null = divId
    ? document.getElementById(divId)
    : document.body;

  targetDiv && targetDiv.appendChild(inputsContainer);
}
