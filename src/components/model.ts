class Model {
  #clicks;
  #seconds;
  #bombsAmount;
  #bombsList;
  #bombsMatrix: number[][];
  #openedCells: number[][];
  #flaggedCells: number[];
  #timer: ReturnType<typeof setInterval> | null;

  constructor() {
    this.#clicks = 0;
    this.#seconds = 0;
    this.#bombsAmount = Number(localStorage.getItem('bombs')) || 10;
    this.#bombsList = new Set<number>();
    this.#bombsMatrix = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.#openedCells = [];
    this.#flaggedCells = [];
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
      const mineIndex = Math.floor(Math.random() * (10 * 10));
      if (mineIndex != index) this.#bombsList.add(mineIndex);
    }
  }

  createMatrix(index: number) {
    this.createMines(index);
    let idx = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
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
  }

  increaseCellCount(i: number, j: number) {
    if (i >= 0 && i < 10 && j >= 0 && j < this.#bombsMatrix[i].length && this.#bombsMatrix[i][j] < 9)
      this.#bombsMatrix[i][j]++;
  }

  handleClick(i: number, j: number, fn: (data: number) => void) {
    const result = { content: '', lose: false, win: false, clicks: ++this.#clicks, seconds: this.#seconds };
    if (this.#clicks == 1) {
      this.createMatrix(i * 10 + j);
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

      this.#openedCells.push([i, j]);
      if (this.#openedCells.length === 10 * 10 - this.#bombsAmount) {
        result.win = true;
      }
    }

    return result;
  }

  getBombs() {
    return this.#bombsList;
  }
}

export default Model;
