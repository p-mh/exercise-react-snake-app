import { NBCASES } from '../contantes';

const newPosition = () => [
  Math.floor(Math.random() * NBCASES),
  Math.floor(Math.random() * NBCASES),
];

const isFreePosition = (positionToCheck, positionToCompare) =>
  positionToCheck[0] !== positionToCompare[0] ||
  positionToCheck[1] !== positionToCompare[1];

const isSnakeBody = (positionToCheck, snakeBody) => {
  const isSnake = snakeBody.find(
    position => !isFreePosition(positionToCheck, position)
  );
  return isSnake;
};

const isSnakeHead = (positionToCheck, snakeHead) => {
  const isHead = !isFreePosition(positionToCheck, snakeHead);
  return isHead;
};

const getNewApplePosition = (snakeHead, snakeBody) => {
  const applePosition = newPosition();

  if (
    !isSnakeBody(applePosition, snakeBody) &&
    !isSnakeHead(applePosition, snakeHead)
  ) {
    return applePosition;
  }

  return getNewApplePosition(snakeHead, snakeBody);
};

export default getNewApplePosition;
