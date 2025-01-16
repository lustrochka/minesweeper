import Component from '../basic-components/component';
import { div } from '../basic-components/tags';
import Button from '../basic-components/button';
import Label from '../basic-components/label';
import Input from '../basic-components/input';
import Field from './field';

class GameBlock extends Component {
  constructor() {
    super('div', 'game-block');
    this.render();
  }

  render() {
    const littleSize = new Button('size', 'Easy', { 'data-size': '10' });
    const averageSize = new Button('size', 'Medium', { 'data-size': '15' });
    const bigSize = new Button('size', 'Hard', { 'data-size': '25' });

    const sizes = div('sizes', littleSize, averageSize, bigSize);

    const bombsAmount = Number(localStorage.getItem('bombs')) || 10;
    const minesLabel = new Label('mines__label', 'Mines:', { for: 'mines__input' });
    const minesInput = new Input('mines__input', {
      id: 'mines__input',
      type: 'number',
      min: '10',
      max: '99',
      value: `${bombsAmount}`,
    });

    const mines = div('mines', minesLabel, minesInput);

    const newGameBtn = new Button('new-game', 'New Game', {});

    this.appendChildren(sizes, mines, newGameBtn, new Field());
  }
}

export default GameBlock;
