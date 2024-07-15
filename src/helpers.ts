import { InputType } from "./models";

export function getInputElement(
  type: InputType,
  name: string,
  placeholder: string,
  className: string[]
): HTMLInputElement {
  const input: HTMLInputElement = document.createElement("input");
  input.type = type;
  input.id = name;
  input.classList.add(...className);
  input.placeholder = placeholder;
  return input;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getInputWithLabel(
  input: HTMLInputElement,
  name: string
): HTMLDivElement {
  const label = document.createElement("label");
  label.htmlFor = name;
  label.textContent = capitalize(name);
  const inputContainer = appendChildrenToParent(document.createElement("div"), [
    label,
    input,
  ]);
  inputContainer.classList.add("coords-input-container");
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
  children.forEach((child) => parent.appendChild(child));
  return parent;
}

export function isNumber(num: string) {
  return !isNaN(parseFloat(num)) && isFinite(+num);
}

export function getLoader(): HTMLDivElement {
  const loaderWrapper = document.createElement("div");
  loaderWrapper.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
  return loaderWrapper;
}

export async function fetchData(url: string): Promise<unknown> {
  try {
    const response = await fetch(url);

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export function getDropdown(
  options: string[],
  selectedOption: string,
  onchangeFunc: (option: string) => void
) {
  const selectElement = document.createElement("select");

  options.forEach((optionText) => {
    const optionElement = document.createElement("option");
    optionElement.value = optionText;
    optionElement.textContent = optionText;
    selectElement.appendChild(optionElement);
  });

  selectElement.value = selectedOption;

  selectElement.addEventListener("change", function () {
    const selectedValue = this.value;
    onchangeFunc(selectedValue);
  });

  return selectElement;
}

export function getRadioButtons(
  options: string[],
  defaultOption: string,
  onchangeFunc: (option: string) => void
) {
  const htmlOptions = options.map((option) => {
    const container = document.createElement("div");
    container.classList.add("view-button-container");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = option;
    radio.name = "searchType";
    radio.value = option;
    radio.checked = option === defaultOption;

    const label = document.createElement("label");
    label.htmlFor = option;
    label.textContent = option.charAt(0).toUpperCase() + option.slice(1);

    radio.addEventListener("change", function () {
      this.checked && onchangeFunc(option);
    });

    return appendChildrenToParent(container, [
      container.appendChild(radio),
      container.appendChild(label),
    ]);
  });
  return appendChildrenToParent(document.createElement("div"), htmlOptions);
}

export function getDayOfWeek(dateStr: string) {
  const date = new Date(dateStr);
  const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  return dateFormatter.format(date);
}

export function getFormattedNum(num: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(num);
}
