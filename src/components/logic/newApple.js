import { NBCASES } from '../contantes';

const generateNewPosition = () => Math.floor(Math.random() * NBCASES);

const newApple = (snakeHead, snakeBody) => {
  const appleX = generateNewPosition();
  const appleY = generateNewPosition();

  return [appleX, appleY];
};

export default newApple;
