import Component from './component';
import { Items } from '../types';

class Input extends Component<HTMLInputElement> {
  constructor(className: string, attributes: Items, onChange?: ((e: Event) => void) | (() => void)) {
    super('input', className);
    this.addAttributes(attributes);
    if (onChange) this.setListener('input', onChange);
  }

  getValue() {
    return this.getNode().value;
  }

  setValue(value: number | string) {
    this.getNode().value = value.toString();
  }
}

export default Input;
