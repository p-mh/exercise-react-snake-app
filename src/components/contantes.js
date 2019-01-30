export const NBCASES = 21;
export const GRID = Array(NBCASES).fill(Array(NBCASES).fill(0));

export const PLAY = 'PLAY';
export const END = 'END';

export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';
export const DOWN = 'DOWN';
export const UP = 'UP';

export const RESETSTATE = {
  gameState: PLAY,
  snakeHead: [Math.floor(NBCASES / 2), Math.floor(NBCASES / 2)],
  direction: null,
  snakeLength: 0,
  snakeBody: [],
  applePosition: [],
};
