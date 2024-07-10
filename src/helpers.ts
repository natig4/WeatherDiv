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

export function resetElementStyles<T extends HTMLElement>(element: T): T {
  Object.assign(element.style, {
    margin: 0,
    padding: 0,
    'box-sizing': 'border-box',
  });

  return element;
}

export function appendChildrenToParent(
  parentElement: HTMLElement,
  children: HTMLElement[]
): HTMLElement {
  const parent = parentElement.cloneNode() as HTMLElement;
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
