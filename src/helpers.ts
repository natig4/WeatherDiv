import {API_TIMEFRAME, API_URL, InputType, IWeatherAPIResponse} from './models';

export function getInputElement(
  type: InputType,
  name: string,
  placeholder: string,
  className: string[]
): HTMLInputElement {
  const input: HTMLInputElement = document.createElement('input');
  input.type = type;
  input.id = name;
  input.classList.add(...className);
  input.placeholder = placeholder;
  return input;
}

export function getInputWithLabel(
  input: HTMLInputElement,
  name: string
): HTMLDivElement {
  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  const inputContainer = appendChildrenToParent(document.createElement('div'), [
    label,
    input,
  ]);
  inputContainer.classList.add('coords-input-container');
  return inputContainer;
}

export function debounce<T extends (...args: never[]) => Promise<void>>(
  func: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

export function appendChildrenToParent<T extends HTMLElement>(
  parentElement: T,
  children: HTMLElement[]
): T {
  const parent = parentElement.cloneNode() as T;
  children.forEach(child => parent.appendChild(child));
  return parent;
}

export async function getLocationWeather({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const apiKey = process.env.API_KEY;
  const url = `${API_URL}?q=${lat},${lon}&days=${API_TIMEFRAME}&key=${apiKey}`;

  try {
    return (await fetchData(url)) as IWeatherAPIResponse;
  } catch (error) {
    return null;
  }
}

export function isNumber(num: string) {
  return !isNaN(parseFloat(num)) && isFinite(+num);
}

export function getLoader(): HTMLDivElement {
  const loaderWrapper = document.createElement('div');
  loaderWrapper.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
  return loaderWrapper;
}

export function getContainerDiv(divId: string) {
  const container: HTMLElement = (
    divId ? document.getElementById(divId) : document.body
  ) as HTMLElement;
  return container;
}

export async function fetchData(url: string): Promise<unknown> {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
