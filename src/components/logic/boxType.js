const checkIsSamePosition = (
  elementPositionX,
  positionToCheckX,
  elementPositionY,
  positionToCheckY
) =>
  elementPositionX === positionToCheckX &&
  elementPositionY === positionToCheckY;

const isSnakeHead = (colIndex, lineIndex, snakeHeadPosition) => {
  return checkIsSamePosition(
    colIndex,
    snakeHeadPosition[0],
    lineIndex,
    snakeHeadPosition[1]
  );
};

const isSnakeBody = (colIndex, lineIndex, snakeBodyPositions) =>
  snakeBodyPositions.find(position =>
    checkIsSamePosition(colIndex, position[0], lineIndex, position[1])
  );

const isApple = (colIndex, lineIndex, applePosition) => {
  return checkIsSamePosition(
    colIndex,
    applePosition[0],
    lineIndex,
    applePosition[1]
  );
};

const isType = (
  columnIndex,
  lineIndex,
  snakeHeadPosition,
  snakeBodyPositions,
  applePosition
) => {
  return (
    (isSnakeHead(columnIndex, lineIndex, snakeHeadPosition) && 'snakehead') ||
    (isSnakeBody(columnIndex, lineIndex, snakeBodyPositions) && 'snakebody') ||
    (isApple(columnIndex, lineIndex, applePosition) && 'apple') ||
    'classicBox'
  );
};

export default isType;
