import View from './view';
import Model from './model';
import { getDOMElement } from '../utils/getDOMElement';
import { StateType } from '../types';

class Controller {
  #view;
  #model;

  constructor() {
    this.#model = new Model();
    this.#view = new View();
  }

  render() {
    const state = localStorage.getItem('state');
    if (state) {
      const stateObj: StateType = JSON.parse(state);
      this.#model.getGame(stateObj, this.#view.showTime);
      localStorage.clear();
      this.#view.render(stateObj.opened, new Set(stateObj.flagged));
    } else {
      this.#view.render();
    }
    this.addListeners();

    getDOMElement('.sizes').addEventListener('click', (e) => {
      if (e.target instanceof HTMLButtonElement && e.target.classList.contains('size')) {
        localStorage.setItem('size', e.target.dataset.size || '10');
        this.restartGame();
      }
    });

    getDOMElement('.save-btn').addEventListener('click', this.#model.saveGame.bind(this.#model));
  }

  addListeners() {
    const field = getDOMElement('.field');
    field.addEventListener('click', (e) => {
      if (e.target instanceof HTMLDivElement && e.target?.closest('.cell')) {
        const [, i, j] = e.target.id.split('_');
        const result = this.#model.handleClick(Number(i), Number(j), this.#view.showTime);
        this.#view.showCell(e.target, result.content);
        this.#view.showClicks(result.clicks);
        if (result.lose) {
          this.finishGame('Game over. Try again');
        }
        if (result.win) {
          this.finishGame(`Hooray! You found all mines  in ${result.seconds} seconds and ${result.clicks} moves!`);
        }
      }
    });

    field.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLDivElement && e.target?.closest('.cell')) {
        const [, i, j] = e.target.id.split('_');
        if (e.target.classList.contains('flagged')) {
          this.#view.removeFlag(e.target);
          this.#model.removeFlag(Number(i), Number(j));
        } else {
          this.#view.addFlag(e.target);
          this.#model.addFlag(Number(i), Number(j));
        }
      }
    });

    const minesInput = getDOMElement<HTMLInputElement>('.mines__input');
    minesInput.addEventListener('change', () => {
      localStorage.setItem('bombs', minesInput.value);
      this.restartGame();
    });
  }

  finishGame(message: string) {
    this.#view.showMessage(message);
    this.#view.showField(this.#model.getBombs());
    this.#model.stopTimer();
  }

  restartGame() {
    this.#model.stopTimer();
    this.#model = new Model();
    this.#view.restartGame();
    this.addListeners();
  }
}

export default Controller;
