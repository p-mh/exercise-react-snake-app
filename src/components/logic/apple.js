import { NBCASES } from '../contantes';

import checkIsSamePosition from './checkIsSamePosition';

const newPosition = () => [
  Math.floor(Math.random() * NBCASES),
  Math.floor(Math.random() * NBCASES),
];

const isSnake = (positionToCheck, snake) =>
  snake.find(position => checkIsSamePosition(positionToCheck, position));

const getNewApplePosition = (snakeHead, snakeBody) => {
  const applePosition = newPosition();

  if (!isSnake(applePosition, [...snakeBody, snakeHead])) {
    return applePosition;
  }

  return getNewApplePosition(snakeHead, snakeBody);
};

export default getNewApplePosition;
