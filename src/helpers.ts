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
