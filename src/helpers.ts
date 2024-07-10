import { InputType } from "./models";

export function getInputElement(type: InputType): HTMLInputElement {
  const input: HTMLInputElement = document.createElement("input");
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

export function appendChildrenToParent<T extends HTMLElement>(
  parentElement: T,
  children: HTMLElement[]
): T {
  const parent = parentElement.cloneNode() as T;
  children.forEach((child) => parent.appendChild(child));
  return parent;
}

export function getLocationWeather({ lat, lon }: { lat: number; lon: number }) {
  console.log("lat", lat);
  console.log("lon", lon);
}

export function isNumber(num: string) {
  return !isNaN(parseFloat(num)) && isFinite(+num);
}
