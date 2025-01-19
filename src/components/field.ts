import Component from '../basic-components/component';
import { div } from '../basic-components/tags';

const FONT_SIZES: { [key: number]: number } = { 10: 2, 15: 1.5, 25: 1 };

class Field extends Component {
  constructor(openedCells?: { [key: string]: number }, flaggedCells?: Set<string>) {
    super('div', 'field');
    this.render(openedCells, flaggedCells);
  }

  render(openedCells?: { [key: string]: number }, flaggedCells?: Set<string>) {
    const size = Number(localStorage.getItem('size')) || 10;

    for (let i = 0; i < size; i++) {
      const row = div('row');
      for (let j = 0; j < size; j++) {
        const cell = div('cell');
        cell.addAttributes({ id: `cell_${i}_${j}` });
        cell.setStyle('font-size', `${FONT_SIZES[size]}rem`);

        if (openedCells && `${i}_${j}` in openedCells) {
          const content = openedCells[`${i}_${j}`];
          cell.addClass('clicked');
          if (content === 9) {
            cell.addClass('bomb');
          } else {
            cell.addClass(`type${content}`);
            if (content !== 0) cell.getNode().innerHTML = content.toString();
          }

          cell.setStyle('pointerEvents', 'none');
        }

        if (flaggedCells?.has(`${i}_${j}`)) {
          cell.addClass('flagged');
        }

        row.appendChildren(cell);
      }
      this.appendChildren(row);
    }

    this.appendChildren(div('message'));
  }
}

export default Field;
