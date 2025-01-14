export function getDOMElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`${selector} is null`);
  }
  return element;
}

export function getDOMElements<T extends HTMLElement>(selector: string): NodeListOf<T> {
  const elements = document.querySelectorAll<T>(selector);
  if (!elements.length) {
    throw new Error(`No elements found for selector: ${selector}`);
  }
  return elements;
}
