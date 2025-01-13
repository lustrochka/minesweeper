import GameBlock from './game-block';

class View {
  render() {
    document.body.appendChild(new GameBlock().getNode());
  }

  /*setMines(minesList: number[]) {
    let cells = document.querySelectorAll('.cell');
    let images = document.querySelectorAll('.cell-content');

    for (let i = 0; i < cells.length; i++) {
        if (minesList.includes(i)) {         
            let img = document.createElement('canvas');
            img.classList.add('canvas');
            img.classList.add('cell-content');
            img.setAttribute('width', '50');
            img.setAttribute('height', '50');
            cells[i].appendChild(img);
        } else {
            let bombsAmount = countBombs(i, minesList);
            cells[i].setAttribute("data-content", `${bombsAmount}`);
            if (bombsAmount != 0) {
                images[i].innerText = `${bombsAmount}`;
                images[i].classList.add(`type${bombsAmount}`);
            }
        }
    }
    draw()
  }*/
}

export default View;
