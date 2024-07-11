import {
  API_TIMEFRAME,
  API_URL,
  Forecastday,
  InputType,
  IWeatherAPIResponse,
  TempDisplay,
} from "./models";

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

export function getInputWithLabel(
  input: HTMLInputElement,
  name: string
): HTMLDivElement {
  const label = document.createElement("label");
  label.htmlFor = name;
  label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
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
    const data = (await fetchData(url)) as IWeatherAPIResponse;
    return data;
  } catch (error) {
    return null;
  }
}

export function isNumber(num: string) {
  return !isNaN(parseFloat(num)) && isFinite(+num);
}

export function getLoader(): HTMLDivElement {
  const loaderWrapper = document.createElement("div");
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
    console.error("Error:", error);
    throw error;
  }
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
      if (this.checked) {
        onchangeFunc(option);
      }
    });

    return appendChildrenToParent(container, [
      container.appendChild(radio),
      container.appendChild(label),
    ]);
  });
  return appendChildrenToParent(document.createElement("div"), htmlOptions);
}

export function getWeatherForUi(
  weather: IWeatherAPIResponse,
  selectedTemp: TempDisplay
) {
  const { name } = weather.location;

  return {
    name,
    temps: calculateAvgTemp(weather.forecast.forecastday, selectedTemp),
  };
}

function calculateAvgTemp(days: Forecastday[], selectedTemp: TempDisplay) {
  const adjustedDays = days.reduce(
    (weekDays, day) => {
      const temp =
        selectedTemp === "Celsius" ? day.day.avgtemp_c : day.day.avgtemp_f;
      const currDay = { temp, day: getDayOfWeek(day.date) };
      const arrPosition = weekDays.find(({ day }) => day === currDay.day);
      if (arrPosition) {
        arrPosition.temp.push(currDay.temp);
      } else {
        weekDays.push({ day: currDay.day, temp: [currDay.temp] });
      }

      return weekDays;
    },
    [] as {
      temp: number[];
      day: string;
    }[]
  );

  return adjustedDays.map(({ day, temp: temps }) => {
    const tempSum = temps.reduce((min, temp) => {
      return min + temp;
    }, 0);

    const temp = getFormattedNum(tempSum / temps.length);

    const recommendation = getRecommendationByTemp(+temp);
    return {
      day,
      temp: temp + ` ${selectedTemp === "Celsius" ? "℃" : "℉"}`,
      recommendation,
    };
  });
}

function getRecommendationByTemp(temp: number) {
  console.log("temp", temp);

  return "sunny";
}

function getDayOfWeek(dateStr: string) {
  const date = new Date(dateStr);
  const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  return dateFormatter.format(date);
}

function getFormattedNum(num: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(num);
}
