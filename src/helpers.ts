import {
  API_TIMEFRAME,
  API_URL,
  Forecastday,
  ImageSource,
  ImageSourceKeys,
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

export async function getLocationWeather(
  {
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  },
  apiKey: String
) {
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

export function generateTemperatureUnitDropdown(
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
    onchangeFunc(selectedValue as TempDisplay);
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

export function getWeatherForUi(
  weather: IWeatherAPIResponse,
  selectedTemp: TempDisplay
) {
  const { name, country } = weather.location;

  return {
    name: `${name}, ${country}`,
    temps: calculateAvgTemp(weather.forecast.forecastday, selectedTemp),
  };
}

export function getImgByRecommendation(
  recommendation: ImageSourceKeys
): ImageSource {
  switch (recommendation) {
    case ImageSourceKeys.cloud:
      return ImageSource.cloud;
    case ImageSourceKeys.cold:
      return ImageSource.cold;
    case ImageSourceKeys.hot:
      return ImageSource.hot;
    case ImageSourceKeys.rain:
      return ImageSource.rain;
    case ImageSourceKeys.snow:
      return ImageSource.snow;
  }
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

    const recommendation = getRecommendationByTemp(+temp, selectedTemp);
    return {
      day,
      temp: temp + ` ${selectedTemp === "Celsius" ? "℃" : "℉"}`,
      recommendation,
    };
  });
}

function getRecommendationByTemp(
  temp: number,
  selectedTemp: TempDisplay
): ImageSourceKeys {
  temp = selectedTemp === "Celsius" ? temp : (temp - 32) * (5 / 9);
  if (temp < 0) {
    return ImageSourceKeys.snow;
  }
  if (temp < 10) {
    return ImageSourceKeys.cold;
  }
  if (temp < 17) {
    return ImageSourceKeys.rain;
  }
  if (temp < 23) {
    return ImageSourceKeys.cloud;
  }

  return ImageSourceKeys.hot;
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
