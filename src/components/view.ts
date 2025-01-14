import GameBlock from './game-block';
import { getDOMElement, getDOMElements } from '../utils/getDOMElement';

class View {
  render() {
    document.body.appendChild(new GameBlock().getNode());
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
