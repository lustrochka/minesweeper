import Component from './component';

export const div = (className: string, ...children: Component[]) => new Component('div', className, ...children);

export const textDiv = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('div', className, ...children);
  element.changeText(text);
  return element;
};

export const span = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('span', className, ...children);
  element.changeText(text);
  return element;
};

export const ol = (className: string, ...children: Component[]) => new Component('ol', className, ...children);

export const li = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('li', className, ...children);
  element.changeText(text);
  return element;
};
