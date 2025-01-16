import { getDOMElement, getDOMElements } from '../utils/getDOMElement';
import LeftBlock from './leftBlock';
import GameBlock from './game-block';
import { div } from '../basic-components/tags';

class View {
  render() {
    document.body.appendChild(div('wrapper', new LeftBlock(), new GameBlock()).getNode());
  }

  showCell(cell: HTMLDivElement, content: string) {
    cell.classList.add('clicked');
    cell.classList.add(content !== 'bomb' ? `type${content}` : 'bomb');
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
}

export default View;
