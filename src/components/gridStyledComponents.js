import styled from 'styled-components';

export const GridStyle = styled.div`
  position: relative;
  max-width: 700px;
  margin: 30px auto 30px auto;
  background-color: #000;
  border: #000 10px solid;
  border-radius: 5px;
`;

export const Line = styled.div`
  display: flex;

  justify-content: center;
`;

const type = {
  classicBox: '#333',
  snakehead: 'red',
  snakebody: 'rgb(126, 0, 0)',
  apple: 'green',
};

export const Box = styled.div`
  flex: 1 1 4.4%;
  padding-bottom: 4.4%;
  background-color: ${props => type[props.type]};
  border: #000 1px solid;
`;

export const Endgame = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #00000061;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayAgainButton = styled.button`
  border: none;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 2px;
  margin: 40px 0;
`;
