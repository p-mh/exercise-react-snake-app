import React, { Component } from 'react';

import './grid.css';

const NBCASES = 20;
const GRID = Array(NBCASES).fill(Array(NBCASES).fill(0));

const newPosition = (direction, position) => {
  switch (direction) {
    case 'RIGHT':
      return [position[0] + 1, position[1]];
    case 'LEFT':
      return [position[0] - 1, position[1]];
    case 'DOWN':
      return [position[0], position[1] + 1];
    case 'UP':
      return [position[0], position[1] - 1];
    default:
      return [position[0], position[1]];
  }
};

const changeSnakePosition = (prevState, props) => {
  const { snakeBody, position, direction } = prevState;
  const [firstElement, ...othersElements] = snakeBody;
  return {
    snakeBody: [...othersElements, position],
    position: newPosition(direction, position),
  };
};

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [3, 0],
      direction: null,
      snakeLength: 0,
      snakeBody: [[3, 0]],
      applePosition: [],
    };
    this.focusElement = null;
  }

  componentDidMount() {
    this.focusElement.focus();
    this.generateApple();
    setInterval(() => {
      this.move();
    }, 100);
  }

  isSnakeIn = (column, line) =>
    column === this.state.position[0] && line === this.state.position[1];

  isSnakeBody = (column, line) =>
    this.state.snakeBody.find(
      position => column === position[0] && line === position[1]
    )
      ? true
      : false;

  isApple = (column, line) =>
    column === this.state.applePosition[0] &&
    line === this.state.applePosition[1];

  keyDown = e => {
    if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      this.getDirection(e.key);
    }
  };

  getDirection = val => {
    const newDirection =
      (val === 'ArrowRight' && 'RIGHT') ||
      (val === 'ArrowLeft' && 'LEFT') ||
      (val === 'ArrowUp' && 'UP') ||
      (val === 'ArrowDown' && 'DOWN');
    this.setState({
      direction: newDirection,
    });
  };

  move = () => {
    const { position, applePosition } = this.state;
    if (applePosition[0] === position[0] && applePosition[1] === position[1]) {
      this.generateApple();
    }
    this.setState(changeSnakePosition);
  };

  generateApple = () => {
    this.setState({
      applePosition: [
        Math.floor(Math.random() * NBCASES),
        Math.floor(Math.random() * NBCASES),
      ],
    });
  };

  render() {
    const grid = GRID.map((line, indexLine) => (
      <div className="line" key={indexLine}>
        {line.map((box, indexColumn) => (
          <div
            className={`box ${
              this.isSnakeIn(indexColumn, indexLine) ? 'snakehead' : ''
            } ${this.isSnakeBody(indexColumn, indexLine) ? 'snakebody' : ''} ${
              this.isApple(indexColumn, indexLine) ? 'apple' : ''
            }`}
            key={indexColumn}
          />
        ))}
      </div>
    ));

    return (
      <div
        className="grid"
        tabIndex="-1"
        ref={element => (this.focusElement = element)}
        onKeyDown={e => this.keyDown(e)}
      >
        {grid}
      </div>
    );
  }
}
