import {appendChildrenToParent, assingStylesToElement} from '../helpers';
import {CoordsSource} from '../models';

export function getDataSourceButtons(
  viewSource: CoordsSource,
  handleViewChange: (source: CoordsSource) => void
) {
  const options: CoordsSource[] = ['location', 'coordinates'];

  const htmlOptions = options.map(option => {
    const container = document.createElement('div');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = option;
    radio.name = 'searchType';
    radio.value = option;
    radio.checked = option === viewSource;

    const label = document.createElement('label');
    label.htmlFor = option;
    label.textContent = option.charAt(0).toUpperCase() + option.slice(1);

    radio.addEventListener('change', function () {
      if (this.checked) {
        handleViewChange(option);
      }
    });

    return appendChildrenToParent(container, [
      container.appendChild(radio),
      container.appendChild(label),
    ]);
  });

  const buttons = appendChildrenToParent(
    document.createElement('div'),
    htmlOptions
  );
  assingStylesToElement(buttons, {
    display: 'flex',
    gap: '4px',
  });

  return buttons;
}
