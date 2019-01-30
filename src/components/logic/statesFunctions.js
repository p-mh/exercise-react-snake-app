import { RIGHT, LEFT, DOWN, UP } from '../contantes';

import getNewApplePosition from './apple';

import checkIsSamePosition from './checkIsSamePosition';

const newPosition = (direction, position) => {
  const offsetLine = direction === RIGHT ? 1 : direction === LEFT ? -1 : 0;
  const offsetColumn = direction === DOWN ? 1 : direction === UP ? -1 : 0;

  return [position[0] + offsetLine, position[1] + offsetColumn];
};

export const changeSnakePosition = (prevState, props) => {
  const { snakeBody, snakeHead, direction, snakeLength } = prevState;
  const [firstElement, ...othersElements] = snakeBody;

  const newSnakeBody =
    snakeLength === 0
      ? []
      : snakeLength > snakeBody.length
      ? [...snakeBody, snakeHead]
      : [...othersElements, snakeHead];

  return {
    snakeBody: newSnakeBody,
    snakeHead: newPosition(direction, snakeHead),
  };
};

export const addLength = (prevState, props) => {
  if (checkIsSamePosition(prevState.applePosition, prevState.snakeHead)) {
    return {
      snakeLength: prevState.snakeLength + 1,
    };
  }
  return {
    snakeLength: prevState.snakeLength,
  };
};

export const newApplePosition = (prevState, props) => {
  if (checkIsSamePosition(prevState.applePosition, prevState.snakeHead)) {
    return {
      applePosition: getNewApplePosition(
        prevState.snakeHead,
        prevState.snakeBody
      ),
    };
  }
  return {
    applePosition: prevState.applePosition,
  };
};

const directions = {
  ArrowRight: RIGHT,
  ArrowLeft: LEFT,
  ArrowUp: UP,
  ArrowDown: DOWN,
};

export const nextDirection = key => (prevState, props) => ({
  direction: directions[key] || prevState.direction,
});
