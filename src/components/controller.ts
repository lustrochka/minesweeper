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
    /*const field = getDOMElement('field');
    field.addEventListener('click', (e) => {
      if (e.target instanceof Element && e.target?.closest('cell')) {
      }
    });*/
    this.#model.createMatrix(0);
  }
}

export default Controller;
