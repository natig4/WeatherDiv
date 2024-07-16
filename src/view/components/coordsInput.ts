import {
  appendChildrenToParent,
  getInputElement,
  getInputWithLabel,
  isNumber,
} from "../../helpers";

import { LocationFunc } from "../../models";

import "../../css/coords.scss";
import { getLocationWeather } from "../../service";
import { AppState } from "../../state/state";

type InputState = "error" | "success";

class Input {
  private _element: HTMLInputElement;

  constructor(type: "latitude" | "longitude") {
    this._element = getInputHelper(type);
    this.state = "success";
    this._element.addEventListener("focus", () => (this.state = "success"));
  }

  set state(v: InputState) {
    if (v === "success") {
      this._element.classList.remove("error");
    } else {
      this._element.classList.add("error");
    }
  }

  public get element(): HTMLInputElement {
    return this._element;
  }
}

const latInput = new Input("latitude");
const lonInput = new Input("longitude");

export function getLatLonForm(
  onLocationChange: LocationFunc,
  state: AppState
): HTMLFormElement {
  const submit = document.createElement("button");
  submit.classList.add("coords-form-button");
  submit.innerText = "Search";
  submit.type = "submit";
  const latEl: HTMLInputElement = latInput.element;
  const lonEl: HTMLInputElement = lonInput.element;

  const inputs = [latEl, lonEl].map((el) =>
    getInputWithLabel(el, el.getAttribute("id") || "")
  );

  const container = appendChildrenToParent(document.createElement("form"), [
    ...inputs,
    submit,
  ]);
  container.classList.add("coords-form-container");

  container.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const isLatError = !isNumber(latEl.value);
    const isLonError = !isNumber(lonEl.value);

    if (isLatError || isLonError) {
      return handleLatLonError(isLatError, isLonError);
    }

    const lat = +latEl.value;
    const lon = +lonEl.value;
    const location = { lat, lon };

    onLocationChange(null, true);
    const data = await getLocationWeather(location, state.apiKey);

    if (!state.isLoading) {
      return;
    }

    onLocationChange(data);
  });
  return container;
}

function getInputHelper(type: "latitude" | "longitude") {
  const input: HTMLInputElement = getInputElement(
    "text",
    type,
    `Please enter your desired ${type}...`,
    ["coords-input", "lat-lon-input"]
  );

  input.addEventListener("focus", () => {
    input.classList.remove("error");
  });

  return input;
}

function handleLatLonError(isLatError: boolean, isLonError: boolean) {
  if (isLatError) {
    latInput.state = "error";
  }

  if (isLonError) {
    lonInput.state = "error";
  }
}
