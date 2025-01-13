import Component from '../basic-components/component';
import { div } from '../basic-components/tags';
import Button from '../basic-components/button';
import Label from '../basic-components/label';
import Input from '../basic-components/input';

class GameBlock extends Component {
  constructor() {
    super('div', 'game-block');
  }

  render() {
    const littleSize = new Button('size', 'Easy', {});
    const averageSize = new Button('size', 'Medium', {});
    const bigSize = new Button('size', 'Hard', {});

    const sizes = div('sizes', littleSize, averageSize, bigSize);

    const minesLabel = new Label('mines__label', 'Mines:', { for: 'mines__input' });
    const minesInput = new Input('mines__input', { id: 'mines__input', type: 'number', min: '10', max: '99' });

    const mines = div('mines', minesLabel, minesInput);

    const newGameBtn = new Button('new-game', 'New Game', {});

    this.appendChildren(sizes, mines, newGameBtn);
  }
}

export default GameBlock;
