import Component from '../basic-components/component';
import { div } from '../basic-components/tags';

class Field extends Component {
  constructor() {
    super('div', 'field');
    this.render();
  }

  render() {
    for (let i = 0; i < 10; i++) {
      const row = div('row');
      for (let j = 0; j < 10; j++) {
        const cell = div('cell');
        cell.addAttributes({ id: `cell_${i}_${j}` });

        row.appendChildren(cell);
      }
      this.appendChildren(row);
    }

    this.appendChildren(div('message'));
  }
}

export default Field;
