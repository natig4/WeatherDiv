import {INPUT_BORDER_COLOR, InputType} from './models';

export function getInputElement(type: InputType): HTMLInputElement {
  const input: HTMLInputElement = document.createElement('input');
  input.type = type;
  return input;
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

export function getBorderRadius() {
  return '4px';
}

export function getInputStyle() {
  return {
    borderRadius: getBorderRadius(),
    padding: '4px',
    outline: 'none',
    border: `1px solid ${INPUT_BORDER_COLOR}`,
  };
}

export function resetElementStyles<T extends HTMLElement>(element: T): T {
  Object.assign(element.style, {
    margin: 0,
    padding: 0,
    'box-sizing': 'border-box',
  });

  return element;
}

export function appendChildrenToParent<T extends HTMLElement>(
  parentElement: T,
  children: HTMLElement[]
): T {
  const parent = parentElement.cloneNode() as T;
  children.forEach(child => parent.appendChild(child));
  return parent;
}

export function assingStylesToElement<T extends HTMLElement>(
  element: T,
  style: {[key: string]: string}
): T {
  Object.assign(element.style, style);
  return element;
}

export function getLocationWeather({lat, lon}: {lat: number; lon: number}) {
  console.log('lat', lat);
  console.log('lon', lon);
}

export function isNumber(num: string) {
  return !isNaN(parseFloat(num)) && isFinite(+num);
}
