import {
  appendChildrenToParent,
  assingStylesToElement,
  getInputElement,
  getInputStyle,
  getLocationWeather,
  isNumber,
  resetElementStyles,
} from '../helpers';
import {INPUT_BORDER_COLOR} from '../models';

type InputState = 'error' | 'success';

class Input {
  private _element: HTMLInputElement;

  constructor(type: 'latitude' | 'longitude') {
    this._element = getInputHelper(type);
    this.state = 'success';
    this._element.addEventListener('focus', () => (this.state = 'success'));
  }

  set state(v: InputState) {
    this._element.style.borderColor =
      v === 'success' ? INPUT_BORDER_COLOR : 'red';
  }

  public get element(): HTMLInputElement {
    return this._element;
  }
}

const latInput = new Input('latitude');
const lonInput = new Input('longitude');

export function getLatLonForm(): HTMLFormElement {
  const submit = document.createElement('button');
  submit.innerText = 'Search';
  submit.type = 'submit';
  const latEl: HTMLInputElement = latInput.element;
  const lonEl: HTMLInputElement = lonInput.element;

  const container = appendChildrenToParent(document.createElement('form'), [
    latEl,
    lonEl,
    submit,
  ]);

  assingStylesToElement(container, {
    display: 'flex',
    gap: '4px',
  });

  container.addEventListener('submit', ev => {
    ev.preventDefault();
    const isLatError = !isNumber(latEl.value);
    const isLonError = !isNumber(lonEl.value);

    if (isLatError || isLonError) {
      return handleLatLonError(isLatError, isLonError);
    }

    const lat = +latEl.value;
    const lon = +lonEl.value;

    getLocationWeather({lat, lon});
  });
  return container;
}

function getInputHelper(type: 'latitude' | 'longitude') {
  const input: HTMLInputElement = resetElementStyles(getInputElement('text'));
  input.name = type;

  assingStylesToElement(input, {...getInputStyle(), minWidth: '250px'});
  input.placeholder = `Please enter your desired ${type}...`;
  input.addEventListener('focus', () => {
    input.style.borderColor = INPUT_BORDER_COLOR;
  });
  return input;
}

function handleLatLonError(isLatError: boolean, isLonError: boolean) {
  if (isLatError) {
    latInput.state = 'error';
  }

  if (isLonError) {
    lonInput.state = 'error';
  }
}
