import { RIGHT, LEFT, DOWN, UP } from '../contantes';

export const changeSnakePosition = (prevState, props) => {
  const newPosition = (direction, position) => {
    const offsetLine = direction === RIGHT ? 1 : direction === LEFT ? -1 : 0;
    const offsetColumn = direction === DOWN ? 1 : direction === UP ? -1 : 0;

    return [position[0] + offsetLine, position[1] + offsetColumn];
  };

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

export const addLength = (prevState, props) => ({
  snakeLength: prevState.snakeLength + 1,
});
