import checkIsSamePosition from './checkIsSamePosition';

const isSnakeHead = (positionToCheck, snakeHeadPosition) => {
  return checkIsSamePosition(positionToCheck, snakeHeadPosition);
};

const isSnakeBody = (positionToCheck, snakeBodyPositions) =>
  snakeBodyPositions.find(bodyPosition =>
    checkIsSamePosition(positionToCheck, bodyPosition)
  );

const isApple = (positionToCheck, applePosition) => {
  return checkIsSamePosition(positionToCheck, applePosition);
};

const isType = (
  colIndex,
  lineIndex,
  snakeHeadPosition,
  snakeBodyPositions,
  applePosition
) => {
  return (
    (isSnakeHead([colIndex, lineIndex], snakeHeadPosition) && 'snakehead') ||
    (isSnakeBody([colIndex, lineIndex], snakeBodyPositions) && 'snakebody') ||
    (isApple([colIndex, lineIndex], applePosition) && 'apple') ||
    'classicCase'
  );
};

export default isType;
