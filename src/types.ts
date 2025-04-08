export type Items = {
  [key: string]: string;
};

export type StateType = {
  seconds: number;
  opened: { [key: string]: number };
  flagged: string[];
  matrix: number[][];
};
