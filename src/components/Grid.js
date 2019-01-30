import React, { Component } from 'react';

import isType from './logic/boxType';

import colisionOrBorder from './logic/colisionOrBorder';

import {
  changeSnakePosition,
  addLength,
  newApplePosition,
  nextDirection,
} from './logic/statesFunctions';

import { GRID, SPEED, PLAY, END, RESETSTATE } from './contantes';

import {
  GridStyle,
  Line,
  Box,
  Endgame,
  PlayAgainButton,
} from './gridStyledComponents';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = RESETSTATE;
    this.focusElement = null;
  }

  componentDidMount() {
    this.resetGame();
  }

  resetGame = () => {
    this.setState(RESETSTATE);
    this.focusElement.focus();
    this.setState(newApplePosition);
    clearInterval(this.intervalMove);
    this.intervalMove = setInterval(() => {
      this.move();
    }, SPEED);
  };

  updateDirection = e => {
    this.setState(nextDirection(e.key));
  };

  move = () => {
    const { snakeHead, snakeBody } = this.state;
    if (colisionOrBorder(snakeHead, snakeBody)) {
      return this.loose();
    }
    this.setState(changeSnakePosition);
    this.setState(addLength);
    this.setState(newApplePosition);
  };

  loose = () => {
    clearInterval(this.intervalMove);
    this.setState({
      gameState: END,
    });
  };

  render() {
    const {
      snakeLength,
      gameState,
      snakeHead,
      snakeBody,
      applePosition,
    } = this.state;

    const grid = GRID.map((line, lineIndex) => (
      <Line key={lineIndex}>
        {line.map((col, colIndex) => (
          <Box
            type={isType(
              colIndex,
              lineIndex,
              snakeHead,
              snakeBody,
              applePosition
            )}
            key={colIndex}
          />
        ))}
      </Line>
    ));

    const endGame = (
      <Endgame>
        <p>You loose :(</p>
        <p>You ate {snakeLength} apples</p>
        <PlayAgainButton onClick={this.resetGame}>Play Again</PlayAgainButton>
      </Endgame>
    );

    const infosGame = <p>Apples : {snakeLength}</p>;

    return (
      <div>
        <GridStyle
          tabIndex="-1"
          ref={element => (this.focusElement = element)}
          onKeyDown={e => this.updateDirection(e)}
        >
          {grid}
          {gameState === END ? endGame : null}
        </GridStyle>
        {gameState === PLAY ? infosGame : null}
      </div>
    );
  }
}
