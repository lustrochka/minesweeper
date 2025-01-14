import View from './view';
import Model from './model';
import { getDOMElement } from '../utils/getDOMElement';

class Controller {
  #view;
  #model;

  constructor() {
    this.#model = new Model();
    this.#view = new View();
  }

  render() {
    this.#view.render();
    const field = getDOMElement('.field');
    field.addEventListener('click', (e) => {
      if (e.target instanceof HTMLDivElement && e.target?.closest('.cell')) {
        const [, i, j] = e.target.id.split('_');
        const result = this.#model.handleClick(Number(i), Number(j));
        this.#view.showCell(e.target, result.content);
        if (result.lose) {
          this.finishGame('Game over. Try again');
        }
        if (result.win) {
          this.finishGame('Hooray! You found all mines');
        }
      }
    });
  }

  finishGame(message: string) {
    this.#view.showMessage(message);
    this.#view.showField(this.#model.getBombs());
  }
}

export default Controller;
