import {
  appendChildrenToParent,
  assingStylesToElement,
  debounce,
  getBorderRadius,
  getInputElement,
  getInputStyle,
  getLocationWeather,
  resetElementStyles,
} from '../helpers';
import {ICity, LocationFunc} from '../models';

async function searchLocation(query: string): Promise<ICity[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export function getSearchInput(onLocationChange: LocationFunc): HTMLDivElement {
  const input: HTMLInputElement = resetElementStyles(getInputElement('search'));
  assingStylesToElement(input, getInputStyle());
  input.placeholder = 'Enter city or country...';

  const resultsDiv: HTMLDivElement = document.createElement('div');
  const searchContainer = appendChildrenToParent(getSearchContainerElement(), [
    input,
    assingStylesToElement(resultsDiv, {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      marginTop: '2px',
    }),
  ]);

  const styledResultElement = getStyledSearchResultElement();

  const debouncedSearch = debounce(async (query: string) => {
    handleSearch(query, styledResultElement, resultsDiv);
  }, 300);

  resultsDiv.addEventListener('click', ev => {
    const res = handleResultClick(ev);
    if (res) {
      input.value = res.name;
      resultsDiv.innerHTML = '';
      const location = {lat: res.lat, lon: res.lon, name: res.name};
      getLocationWeather(location);
      onLocationChange(location);
    }
  });

  input.addEventListener('input', () => {
    const query = input.value;
    debouncedSearch(query);
  });
  return searchContainer;
}

async function handleSearch(
  query: string,
  result: HTMLParagraphElement,
  resultsContainer: HTMLDivElement
) {
  if (query.length > 2) {
    const locations = await searchLocation(query);
    const locationsHtml = locations.length
      ? getLocationsHtml(locations, result)
      : getResultsNotFoundP(result);

    resultsContainer.innerHTML = locationsHtml;
  } else {
    resultsContainer.innerHTML = getResultsNotFoundP(
      result,
      'Please search for more than 2 characters'
    );
  }
}

function getSearchContainerElement() {
  const searchContainer = resetElementStyles(document.createElement('div'));

  assingStylesToElement(searchContainer, {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    borderRadius: getBorderRadius(),
    width: '300px',
  });

  return searchContainer;
}

function getLocationsHtml(locations: ICity[], p: HTMLParagraphElement): string {
  return locations
    .map(({lat, lon, display_name, name}) => {
      p.cloneNode();
      p.dataset.lat = lat;
      p.dataset.lon = lon;
      p.dataset.name = name;
      p.innerText = display_name;
      p.style.cursor = 'pointer';

      return p.outerHTML;
    })

    .join('');
}

function getStyledSearchResultElement() {
  const p = resetElementStyles(document.createElement('p'));
  assingStylesToElement(p, {
    borderRadius: getBorderRadius(),
    padding: '4px',
    border: '1px solid gray',
  });
  return p;
}

function getResultsNotFoundP(
  p: HTMLParagraphElement,
  text: string = `Couldn't find location, search for another one`
): string {
  const noResults = p.cloneNode() as HTMLParagraphElement;
  noResults.innerText = text;
  return noResults.outerHTML;
}

function handleResultClick(
  ev: MouseEvent
): {lat: number; lon: number; name: string} | undefined {
  const target = ev.target as HTMLElement;

  if (target.tagName.toLowerCase() === 'p') {
    ev.stopPropagation();
    const {lat, lon, name} = target.dataset;

    if (lat && lon) {
      return {lat: +lat, lon: +lon, name: name as string};
    }
  }
}
