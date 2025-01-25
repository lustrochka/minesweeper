import { StateType } from '../types';

class Model {
  #clicks;
  #seconds;
  #bombsAmount;
  #bombsList;
  #size;
  #bombsMatrix: number[][];
  #openedCells: { [key: string]: number };
  #flaggedCells: Set<string>;
  #timer: ReturnType<typeof setInterval> | null;

  constructor() {
    this.#clicks = 0;
    this.#seconds = 0;
    this.#bombsAmount = Number(localStorage.getItem('bombs')) || 10;
    this.#bombsList = new Set<number>();
    this.#size = Number(localStorage.getItem('size')) || 10;
    this.#bombsMatrix = Array.from({ length: this.#size }, () => Array(this.#size).fill(0));
    this.#openedCells = {};
    this.#flaggedCells = new Set();
    this.#timer = null;
  }

  startTimer(fn: (data: number) => void) {
    this.#timer = setInterval(() => {
      this.#seconds++;
      fn(this.#seconds);
    }, 1000);
  }

  stopTimer() {
    if (this.#timer) clearInterval(this.#timer);
  }

  createMines(index: number) {
    while (this.#bombsList.size < this.#bombsAmount) {
      const mineIndex = Math.floor(Math.random() * (this.#size * this.#size));
      if (mineIndex != index) this.#bombsList.add(mineIndex);
    }
  }

  createMatrix(index: number) {
    this.createMines(index);
    let idx = 0;
    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        if (this.#bombsList.has(idx)) {
          this.#bombsMatrix[i][j] = 9;
          this.increaseCellCount(i - 1, j - 1);
          this.increaseCellCount(i - 1, j);
          this.increaseCellCount(i - 1, j + 1);
          this.increaseCellCount(i, j - 1);
          this.increaseCellCount(i, j + 1);
          this.increaseCellCount(i + 1, j - 1);
          this.increaseCellCount(i + 1, j);
          this.increaseCellCount(i + 1, j + 1);
        }

        idx++;
      }
    }
    console.log(this.#bombsMatrix);
  }

  checkCell(i: number, j: number) {
    return i >= 0 && i < this.#size && j >= 0 && j < this.#bombsMatrix[i].length && this.#bombsMatrix[i][j] < 9;
  }

  increaseCellCount(i: number, j: number) {
    if (this.checkCell(i, j)) this.#bombsMatrix[i][j]++;
  }

  handleClick(i: number, j: number, fn: (data: number) => void) {
    const result = { content: '', lose: false, win: false, clicks: ++this.#clicks, seconds: this.#seconds };
    if (this.#clicks == 1) {
      this.createMatrix(i * this.#size + j);
      this.startTimer(fn);
    }

    const cellContent = this.#bombsMatrix[i][j];
    if (cellContent === 9) {
      result.content = 'bomb';
      result.lose = true;
    } else {
      if (cellContent != 0) {
        result.content = cellContent.toString();
      }

      this.#openedCells[`${i}_${j}`] = cellContent;
      if (Object.keys(this.#openedCells).length === this.#size * this.#size - this.#bombsAmount) {
        result.win = true;
      }
    }

    return result;
  }

  getNeighbours(i: number, j: number, visited: Set<string> = new Set()) {
    const neighbours: number[][] = [];
    const addCell = (x: number, y: number) => {
      const key = `${x},${y}`;
      if (this.checkCell(x, y) && !visited.has(key)) {
        visited.add(key);
        neighbours.push([x, y, this.#bombsMatrix[x][y]]);
        if (!this.#bombsMatrix[x][y]) neighbours.push(...this.getNeighbours(x, y, visited));
      }
    };

    addCell(i - 1, j - 1);
    addCell(i - 1, j);
    addCell(i - 1, j + 1);
    addCell(i, j - 1);
    addCell(i, j + 1);
    addCell(i + 1, j - 1);
    addCell(i + 1, j);
    addCell(i + 1, j + 1);

    return neighbours;
  }

  getBombs() {
    return this.#bombsList;
  }

  addFlag(i: number, j: number) {
    this.#flaggedCells.add(`${i}_${j}`);
  }

  removeFlag(i: number, j: number) {
    this.#flaggedCells.delete(`${i}_${j}`);
  }

  saveGame() {
    localStorage.setItem('clicks', `${this.#clicks}`);
    localStorage.setItem('size', `${this.#size}`);
    localStorage.setItem('bombs', `${this.#bombsAmount}`);

    const state = {
      seconds: this.#seconds,
      opened: this.#openedCells,
      flagged: [...this.#flaggedCells],
      matrix: this.#bombsMatrix,
    };
    localStorage.setItem('state', `${JSON.stringify(state)}`);
  }

  getGame(state: StateType, fn: (data: number) => void) {
    this.#seconds = state.seconds;
    this.#openedCells = state.opened;
    this.#flaggedCells = new Set(state.flagged);
    this.#bombsMatrix = state.matrix;

    if (this.#seconds) this.startTimer(fn);
  }
}

export default Model;
