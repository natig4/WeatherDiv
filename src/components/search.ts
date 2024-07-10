import {
  appendChildrenToParent,
  assingStylesToElement,
  debounce,
  getBorderRadius,
  getInputElement,
  getLocationWeather,
  resetElementStyles,
} from '../helpers';

async function searchLocation(query: string): Promise<ICity[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export function createCitySearchInput(divId: string): void {
  const input: HTMLInputElement = resetElementStyles(getInputElement('search'));
  assingStylesToElement(input, {
    borderRadius: getBorderRadius(),
    padding: '4px',
    outline: 'none',
    border: '1px solid #007bff',
  });
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
    if (query.length > 2) {
      const locations = await searchLocation(query);
      const locationsHtml = locations.length
        ? getLocationsHtml(locations, styledResultElement)
        : getResultsNotFoundP(styledResultElement);

      resultsDiv.innerHTML = locationsHtml;
      resultsDiv.addEventListener('click', ev => {
        const res = handleResultClick(ev);
        if (res) {
          input.value = res.name;
          resultsDiv.innerHTML = '';
          getLocationWeather({lat: res.lat, lon: res.lon});
        }
      });
    } else {
      resultsDiv.innerHTML = getResultsNotFoundP(
        styledResultElement,
        'Please search for more than 2 characters'
      );
    }
  }, 300);

  input.addEventListener('input', () => {
    const query = input.value;
    debouncedSearch(query);
  });

  const targetDiv: HTMLElement | null = divId
    ? document.getElementById(divId)
    : document.body;

  targetDiv && targetDiv.appendChild(searchContainer);
}

function getSearchContainerElement() {
  const searchContainer = resetElementStyles(document.createElement('div'));

  assingStylesToElement(searchContainer, {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    borderRadius: getBorderRadius(),
    padding: '4px',
    maxWidth: '300px',
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
