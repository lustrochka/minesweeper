class Model {
  #clicks;
  #bombs;
  #bombsMatrix: number[][];
  #openedCells: number[];
  #flaggedCells: number[];

  constructor() {
    this.#clicks = 0;
    this.#bombs = 10;
    this.#bombsMatrix = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.#openedCells = [];
    this.#flaggedCells = [];
  }

  createMines(index: number) {
    const minesList = new Set<number>();
    while (minesList.size < this.#bombs) {
      const mineIndex = Math.floor(Math.random() * (10 * 10));
      if (mineIndex != index) minesList.add(mineIndex);
    }

    return minesList;
  }

  createMatrix(index: number) {
    const minesList = this.createMines(index);
    let idx = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (minesList.has(idx)) {
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

  increaseCellCount(i: number, j: number) {
    if (i >= 0 && i < 10 && j >= 0 && j < this.#bombsMatrix[i].length && this.#bombsMatrix[i][j] < 9)
      this.#bombsMatrix[i][j]++;
  }
}

export default Model;
