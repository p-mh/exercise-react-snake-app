import { NBCASES } from '../contantes';

const checkBorder = position => {
  return (
    position[0] < 0 ||
    position[0] > NBCASES - 1 ||
    position[1] < 0 ||
    position[1] > NBCASES - 1
  );
};

const checkColision = (position, snakeBody) =>
  snakeBody.find(
    elementPosition =>
      elementPosition[0] === position[0] && elementPosition[1] === position[1]
  );

const colisionOrBorder = (position, snakeBody) => {
  return checkColision(position, snakeBody) || checkBorder(position);
};

export default colisionOrBorder;
