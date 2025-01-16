import Component from '../basic-components/component';
import { div } from '../basic-components/tags';

class Field extends Component {
  constructor() {
    super('div', 'field');
    this.render();
  }

  render() {
    const size = Number(localStorage.getItem('size')) || 10;
    const fontSizes: { [key: number]: number } = { 10: 2, 15: 1.5, 25: 1 };

    for (let i = 0; i < size; i++) {
      const row = div('row');
      for (let j = 0; j < size; j++) {
        const cell = div('cell');
        cell.addAttributes({ id: `cell_${i}_${j}` });
        cell.setStyle('font-size', `${fontSizes[size]}rem`);

        row.appendChildren(cell);
      }
      this.appendChildren(row);
    }

    this.appendChildren(div('message'));
  }
}

export default Field;
