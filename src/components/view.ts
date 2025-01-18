import { getDOMElement, getDOMElements } from '../utils/getDOMElement';
import LeftBlock from './leftBlock';
import GameBlock from './game-block';
import { div } from '../basic-components/tags';
import Field from './field';

import BLAST from '../assets/sounds/033.mp3';
import OPEN from '../assets/sounds/WindowsStartup.wav';
import SIGN from '../assets/sounds/WindowsRestore.wav';
import UNSIGN from '../assets/sounds/recycle.wav';

class View {
  #soundState;
  #audio;

  constructor() {
    this.#soundState = localStorage.getItem('sound') || 'off';
    this.#audio = new Audio();
  }

  render() {
    document.body.appendChild(
      div(
        'wrapper',
        new LeftBlock((e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.#soundState = e.target.value;
            localStorage.setItem('sound', e.target.value);
          }
        }),
        new GameBlock()
      ).getNode()
    );
  }

  showCell(cell: HTMLDivElement, content: string) {
    cell.classList.add('clicked');
    if (content === 'bomb') {
      cell.classList.add('bomb');
      this.playAudio(BLAST);
    } else {
      cell.classList.add(`type${content}`);
      this.playAudio(OPEN);
    }
    cell.classList.remove('flagged');
    if (content !== 'bomb') cell.innerHTML = content;
  }

  showMessage(text: string) {
    const message = getDOMElement('.message');
    message.classList.add('visible');
    message.textContent = text;
  }

  showClicks(clicks: number) {
    getDOMElement('.clicks').textContent = `Clicks: ${clicks}`;
  }

  showTime(seconds: number) {
    getDOMElement('.timer').textContent = `Time: ${seconds}`;
  }

  showField(bombs: Set<number>) {
    const cells = getDOMElements<HTMLDivElement>('.cell');
    bombs.forEach((index) => {
      const targetCell = cells[index];
      if (!targetCell.classList.contains('clicked')) {
        targetCell.classList.add('clicked');
        targetCell.classList.remove('flagged');
        targetCell.classList.add('bomb');
      }
    });
  }

  restartGame() {
    getDOMElement('.field').replaceWith(new Field().getNode());
    this.showTime(0);
    this.showClicks(0);
  }

  addFlag(target: HTMLDivElement) {
    target.classList.add('flagged');
    this.playAudio(SIGN);
  }

  removeFlag(target: HTMLDivElement) {
    target.classList.remove('flagged');
    this.playAudio(UNSIGN);
  }

  playAudio(src: string) {
    if (this.#soundState === 'on') {
      this.#audio.src = src;
      this.#audio.play();
    }
  }
}

export default View;
