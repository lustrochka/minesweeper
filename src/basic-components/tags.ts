import Component from './component';

export const div = (className: string, ...children: Component[]) => new Component('div', className, ...children);