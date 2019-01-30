import React, { Component } from 'react';

import isType from './logic/boxType';

import colisionOrBorder from './logic/colisionOrBorder';

import { changeSnakePosition, addLength } from './logic/statesFunctions';

import newApple from './logic/newApple';

import {
  NBCASES,
  GRID,
  PLAY,
  END,
  RIGHT,
  LEFT,
  DOWN,
  UP,
  RESETSTATE,
} from './contantes';

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
    this.generateApple();
    this.intervalMove = setInterval(() => {
      this.move();
    }, 100);
  };

  generateApple = () => {
    this.setState({
      applePosition: newApple(this.state.snakeHead, this.state.snakeBody),
    });
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
    const { snakeHead, applePosition, snakeBody } = this.state;
    if (
      applePosition[0] === snakeHead[0] &&
      applePosition[1] === snakeHead[1]
    ) {
      this.generateApple();
      this.setState(addLength);
    }
    if (colisionOrBorder(snakeHead, snakeBody)) {
      return this.loose();
    }
    this.setState(changeSnakePosition);
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

    const grid = GRID.map((line, indexLine) => (
      <Line key={indexLine}>
        {line.map((column, indexColumn) => (
          <Box
            type={isType(
              indexColumn,
              indexLine,
              snakeHead,
              snakeBody,
              applePosition
            )}
            key={indexColumn}
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
          onKeyDown={e => this.getDirection(e)}
        >
          {grid}
          {gameState === END ? endGame : null}
        </GridStyle>
        {gameState === PLAY ? infosGame : null}
      </div>
    );
  }
}
