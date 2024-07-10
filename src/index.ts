import {getDataSourceButtons} from './components/viewSelector';
import {appendChildrenToParent, assingStylesToElement} from './helpers';
import {renderLocationForm} from './location';
import {CoordsSource, Location} from './models';
import {AppState} from './state/state';

function init(divId = 'weather-widget-container') {
  const state = new AppState();
  addHeader(divId, state);
}

function addHeader(divId: string, state: AppState) {
  const targetDiv: HTMLElement | null = divId
    ? document.getElementById(divId)
    : document.body;

  if (targetDiv) {
    renderHeaderView(targetDiv, state);
  }
}

function renderHeaderView(container: HTMLElement, state: AppState) {
  container.innerHTML = '';

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
      renderLocationForm(state.viewSource, handleLocationChange),
      getDataSourceButtons(
        state.viewSource,
        handleViewChange,
        handleLocationChange
      ),
    ])
  );

  if (state.selectedLocation) {
    renderWeatherInfo(container, state.selectedLocation);
  } else {
    const weatherContainer = document.querySelector('.weather-info');

    weatherContainer && container.removeChild(weatherContainer);
  }

  function handleViewChange(source: CoordsSource) {
    state.viewSource = source;
    renderHeaderView(container, state);
  }

  function handleLocationChange(location: Location | null) {
    state.selectedLocation = location;
    renderHeaderView(container, state);
  }
}

function renderWeatherInfo(container: HTMLElement, location: Location) {
  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');
  assingStylesToElement(weatherInfo, {
    marginTop: '20px',
    textAlign: 'center',
  });

  const locationName = document.createElement('h2');
  locationName.textContent = `Weather for ${
    location.name || `${location.lat}, ${location.lon}`
  }`;
  weatherInfo.appendChild(locationName);

  const placeholder = document.createElement('p');
  placeholder.textContent = 'Weather data will be displayed here.';
  weatherInfo.appendChild(placeholder);

  container.appendChild(weatherInfo);
}

init();
