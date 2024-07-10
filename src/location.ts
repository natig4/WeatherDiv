import {debounce, getInputElement} from './helpers';

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
  const input: HTMLInputElement = getInputElement('search');
  input.placeholder = 'Enter city or country...';

  console.log('createCitySearchInput');

  const resultsDiv: HTMLDivElement = document.createElement('div');
  resultsDiv.classList.add('search-results');

  const debouncedSearch = debounce(async (query: string) => {
    if (query.length > 2) {
      const locations = (await searchLocation(query)).map(loc => {
        return {lat: loc.lat, lon: loc.lon, name: loc.display_name};
      });

      console.log('cities', locations);

      // resultsDiv.innerHTML = locations.map(loc => `<p>${loc.name}</p>`).join('');
    } else {
      resultsDiv.innerHTML = '';
    }
  }, 300);

  input.addEventListener('input', () => {
    const query = input.value;
    debouncedSearch(query);
  });

  const targetDiv: HTMLElement | null = divId
    ? document.getElementById(divId)
    : document.body;
  if (targetDiv) {
    targetDiv.appendChild(input);
    targetDiv.appendChild(resultsDiv);
  } else {
    console.error(`Element with id ${divId} not found.`);
  }
}
