// const apiKey = process.env.API_KEY;
// const apiUrl = process.env.API_URL;

import {getDataSourceButtons} from './components/viewSelector';
import {appendChildrenToParent, assingStylesToElement} from './helpers';
import {renderLocationForm} from './location';
import {CoordsSource} from './models';
import {AppState} from './state/state';

function addHeader(divId: string, state: AppState) {
  const targetDiv: HTMLElement | null = divId
    ? document.getElementById(divId)
    : document.body;

  if (targetDiv) {
    renderView(targetDiv, state.viewSource, handleViewChange);
  }

  function handleViewChange(source: CoordsSource) {
    if (targetDiv) {
      targetDiv.innerHTML = '';
      renderView(targetDiv, source, handleViewChange);
    }
  }
}

function init(divId = 'weather-widget-container') {
  const state = new AppState();

  addHeader(divId, state);
}

function renderView(
  container: HTMLElement,
  source: CoordsSource,
  handleViewChange: (source: CoordsSource) => void
) {
  const coordsSource = document.createElement('div');
  assingStylesToElement(coordsSource, {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  });

  const heading = document.createElement('h1');
  heading.innerText = 'Please select location';
  assingStylesToElement(heading, {
    'text-align': 'center',
  });

  container.appendChild(heading);
  container.appendChild(
    appendChildrenToParent(coordsSource, [
      renderLocationForm(source),
      getDataSourceButtons(source, handleViewChange),
    ])
  );
}

init();
