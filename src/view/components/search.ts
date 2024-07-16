import {
  appendChildrenToParent,
  debounce,
  fetchData,
  getInputElement,
  getInputWithLabel,
} from "../../helpers";
import { ICity, LocationFunc } from "../../models";
import { getLocationWeather } from "../../service";
import { AppState } from "../../state/state";

export function getSearchInput(
  onLocationChange: LocationFunc,
  state: AppState
): HTMLDivElement {
  const inputName = "search";
  const input: HTMLInputElement = getInputElement(
    inputName,
    inputName,
    "Enter city or country...",
    ["coords-input", "search-input"]
  );

  const inputContainer = getInputWithLabel(input, inputName);
  inputContainer.classList.add("coords-input-container");

  const resultsDiv: HTMLDivElement = document.createElement("div");
  resultsDiv.classList.add("locations-results-container", "hidden");

  const searchContainer = appendChildrenToParent(
    document.createElement("div"),
    [inputContainer, resultsDiv]
  );
  searchContainer.classList.add("search-container");

  const debouncedSearch = debounce(async (query: string) => {
    resultsDiv.classList.remove("hidden");
    handleSearch(query, resultsDiv);
  }, 300);

  resultsDiv.addEventListener("click", async (ev) => {
    const res = handleResultClick(ev);

    if (res) {
      input.value = res.name;
      resultsDiv.innerHTML = "";
      const location = {
        lat: +res.lat.toFixed(2),
        lon: +res.lon.toFixed(2),
        name: res.name,
      };
      hideResults(resultsDiv);
      onLocationChange(null, true);
      const data = await getLocationWeather(location, state.apiKey);

      if (!state.isLoading) {
        return;
      }

      onLocationChange(data);
    }
  });

  input.addEventListener("input", () => {
    const query = input.value;
    debouncedSearch(query);
  });
  return searchContainer;
}

async function searchLocation(query: string): Promise<ICity[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  try {
    return (await fetchData(url)) as ICity[];
  } catch (error) {
    return [];
  }
}

function hideResults(resultsDiv: HTMLDivElement) {
  resultsDiv.classList.add("hidden");
}

async function handleSearch(query: string, resultsContainer: HTMLDivElement) {
  const resultEl = document.createElement("p");
  resultEl.classList.add("result-container");

  if (query.length > 2) {
    const locations = await searchLocation(query);
    const locationsHtml = locations.length
      ? getLocationsHtml(locations, resultEl)
      : getResultsNotFoundP(resultEl);

    resultsContainer.innerHTML = locationsHtml;
  } else {
    resultsContainer.innerHTML = getResultsNotFoundP(
      resultEl,
      "Please search for more than 2 characters"
    );
  }
}

function getLocationsHtml(locations: ICity[], p: HTMLParagraphElement): string {
  return locations
    .map(({ lat, lon, display_name, name }) => {
      p.cloneNode();
      p.dataset.lat = lat;
      p.dataset.lon = lon;
      p.dataset.name = name;
      p.innerText = display_name;

      return p.outerHTML;
    })

    .join("");
}

function getResultsNotFoundP(
  p: HTMLParagraphElement,
  text: string = `Couldn't find location, search for another one`
): string {
  const noResults = p.cloneNode() as HTMLParagraphElement;
  noResults.innerText = text;
  noResults.classList.add("not-found");
  return noResults.outerHTML;
}

function handleResultClick(
  ev: MouseEvent
): { lat: number; lon: number; name: string } | undefined {
  const target = ev.target as HTMLElement;

  if (target.tagName.toLowerCase() === "p") {
    ev.stopPropagation();
    const { lat, lon, name } = target.dataset;

    if (lat && lon) {
      return { lat: +lat, lon: +lon, name: name as string };
    }
  }
}
