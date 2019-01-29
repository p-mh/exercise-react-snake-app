import React, { Component } from 'react';

import './grid.css';

const NBCASES = 20;
const GRID = Array(NBCASES).fill(Array(NBCASES).fill(0));

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [3, 0],
      direction: null,
      snakeLength: 0,
      snakeBody: [[2, 0]],
    };
    this.focusElement = null;
  }

  componentDidMount() {
    this.focusElement.focus();
    setInterval(() => {
      this.move();
    }, 150);
  }

  isSnakeIn = (column, line) => {
    return column === this.state.position[0] && line === this.state.position[1];
  };

  isSnakeBody = (column, line) => {
    return this.state.snakeBody.find(
      position => column === position[0] && line === position[1]
    )
      ? true
      : false;
  };

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

  newPosition = () => {
    const { direction, position, snakeBody } = this.state;
    const [firstElement, ...othersElements] = snakeBody;
    this.setState({
      snakeBody: [...othersElements, position],
    });
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

  move = () => {
    this.setState({
      position: this.newPosition(),
    });
  };

  render() {
    const grid = GRID.map((line, indexLine) => (
      <div className="line" key={indexLine}>
        {line.map((box, indexColumn) => (
          <div
            className={`box ${
              this.isSnakeIn(indexColumn, indexLine) ? 'snakehead' : ''
            } ${this.isSnakeBody(indexColumn, indexLine) ? 'snakebody' : ''}`}
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
