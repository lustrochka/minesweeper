import Component from '../basic-components/component';
import { div, span } from '../basic-components/tags';

class Field extends Component {
  constructor() {
    super('div', 'field');
  }

  render() {
    for (let i = 0; i < 10 * 10; i++) {
      const cellContent = span('cell-content', '');

      const cell = div('cell', cellContent);
      cell.addAttributes({ id: `cell${i}` });

      this.appendChildren(cell);
    }

    const loseMsg = div('lose message');
    loseMsg.changeText('Game over. Try again');

    this.appendChildren(loseMsg, div('win message'));
  }
}

export default Field;
