import Component from '../basic-components/component';
import { div } from '../basic-components/tags';
import Button from '../basic-components/button';
import Label from '../basic-components/label';
import Input from '../basic-components/input';

class GameBlock extends Component {
  constructor() {
    super('div', 'game-block');
    this.render();
  }

  render() {
    const sizes = div(
      'sizes',
      new Button('size', 'Easy', { 'data-size': '10' }),
      new Button('size', 'Medium', { 'data-size': '15' }),
      new Button('size', 'Hard', { 'data-size': '25' })
    );

    const bombsAmount = Number(localStorage.getItem('bombs')) || 10;
    const minesLabel = new Label('mines__label', 'Mines:', { for: 'mines__input' });
    const minesInput = new Input(
      'mines__input',
      {
        id: 'mines__input',
        type: 'number',
        min: '10',
        max: '99',
        value: `${bombsAmount}`,
      },
      () => {
        if (Number(minesInput.getValue()) > 99) minesInput.setValue(99);
        if (Number(minesInput.getValue()) < 0) minesInput.setValue(0);
      }
    );

    this.appendChildren(sizes, div('mines', minesLabel, minesInput), new Button('new-game', 'New Game', {}));
  }
}

export default GameBlock;
