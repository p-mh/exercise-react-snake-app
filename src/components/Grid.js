import React, { Component } from 'react';

import { GridStyle, Line, Box, Endgame } from './gridStyledComponents';

const NBCASES = 21;
const GRID = Array(NBCASES).fill(Array(NBCASES).fill(0));

const PLAY = 'PLAY';
const END = 'END';

const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const DOWN = 'DOWN';
const UP = 'UP';

const resetState = {
  gameState: PLAY,
  position: [Math.floor(NBCASES / 2), Math.floor(NBCASES / 2)],
  direction: null,
  snakeLength: 0,
  snakeBody: [],
  applePosition: [],
};

const newPosition = (direction, position) => {
  const offsetLine = direction === RIGHT ? 1 : direction === LEFT ? -1 : 0;
  const offsetColumn = direction === DOWN ? 1 : direction === UP ? -1 : 0;

  return [position[0] + offsetLine, position[1] + offsetColumn];
};

const changeSnakePosition = (prevState, props) => {
  const { snakeBody, position, direction, snakeLength } = prevState;
  const [firstElement, ...othersElements] = snakeBody;

  const newSnakeBody =
    snakeLength === 0
      ? []
      : snakeLength > snakeBody.length
      ? [...snakeBody, position]
      : [...othersElements, position];

  return {
    snakeBody: newSnakeBody,
    position: newPosition(direction, position),
  };
};

const addLength = (prevState, props) => ({
  snakeLength: prevState.snakeLength + 1,
});

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = resetState;
    this.focusElement = null;
  }

  componentDidMount() {
    this.resetGame();
  }

  isSnakeHead = (columnIndex, lineIndex) =>
    this.checkIsSamePosition(
      columnIndex,
      this.state.position[0],
      lineIndex,
      this.state.position[1]
    );

  isSnakeBody = (columnIndex, lineIndex) =>
    this.state.snakeBody.find(position =>
      this.checkIsSamePosition(columnIndex, position[0], lineIndex, position[1])
    );

  isApple = (columnIndex, lineIndex) =>
    this.checkIsSamePosition(
      columnIndex,
      this.state.applePosition[0],
      lineIndex,
      this.state.applePosition[1]
    );

  checkIsSamePosition = (
    elementPositionX,
    positionToCheckX,
    elementPositionY,
    positionToCheckY
  ) =>
    elementPositionX === positionToCheckX &&
    elementPositionY === positionToCheckY;

  isType = (columnIndex, lineIndex) => {
    return (
      (this.isSnakeBody(columnIndex, lineIndex) && 'snakebody') ||
      (this.isSnakeHead(columnIndex, lineIndex) && 'snakehead') ||
      (this.isApple(columnIndex, lineIndex) && 'apple') ||
      'box'
    );
  };

  getDirection = e => {
    const directions = {
      ArrowRight: RIGHT,
      ArrowLeft: LEFT,
      ArrowUp: UP,
      ArrowDown: DOWN,
    };
    this.setState({
      direction: directions[e.key],
    });
  };

  move = () => {
    const { position, applePosition } = this.state;
    if (applePosition[0] === position[0] && applePosition[1] === position[1]) {
      this.generateApple();
      this.setState(addLength);
    }
    if (this.checkColision(position)) {
      return this.loose();
    }
    if (this.checkBorder(position)) {
      return this.loose();
    }
    this.setState(changeSnakePosition);
  };

  checkBorder = position => {
    return (
      position[0] < 0 ||
      position[0] > NBCASES - 1 ||
      position[1] < 0 ||
      position[1] > NBCASES - 1
    );
  };

  generateApple = () => {
    this.setState({
      applePosition: [
        Math.floor(Math.random() * NBCASES),
        Math.floor(Math.random() * NBCASES),
      ],
    });
  };

  checkColision = position =>
    this.state.snakeBody.find(
      elementPosition =>
        elementPosition[0] === position[0] && elementPosition[1] === position[1]
    );

  loose = () => {
    clearInterval(this.intervalMove);
    this.setState({
      gameState: END,
    });
  };

  resetGame = () => {
    this.setState(resetState);
    this.focusElement.focus();
    this.generateApple();
    this.intervalMove = setInterval(() => {
      this.move();
    }, 100);
  };

  render() {
    const grid = GRID.map((line, indexLine) => (
      <Line key={indexLine}>
        {line.map(
          (box, indexColumn) => {
            return <Box type={this.isType(indexColumn, indexLine)} />;
          }
          /* <div
            className={`box ${
              this.isSnakeIn(indexColumn, indexLine) ? 'snakehead' : ''
            } ${this.isSnakeBody(indexColumn, indexLine) ? 'snakebody' : ''} ${
              this.isApple(indexColumn, indexLine) ? 'apple' : ''
            }`}
            key={indexColumn}
          /> */
        )}
      </Line>
    ));

    const endGame = (
      <Endgame>
        <p>You loose</p>
        <button onClick={this.resetGame}>Play Again</button>
      </Endgame>
    );

    return (
      <div>
        <GridStyle
          tabIndex="-1"
          ref={element => (this.focusElement = element)}
          onKeyDown={e => this.getDirection(e)}
        >
          {grid}
          {this.state.gameState === 'END' ? endGame : null}
        </GridStyle>
        <p>{this.state.snakeLength}</p>
      </div>
    );
  }
}
