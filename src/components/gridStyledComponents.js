import styled from 'styled-components';

export const GridStyle = styled.div`
  position: relative;
  max-width: 700px;
  margin: auto;
`;

export const Line = styled.div`
  display: flex;

  justify-content: center;
`;

const type = {
  box: '#333',
  snakehead: 'red',
  snakebody: 'rgb(126, 0, 0)',
  apple: 'green',
};

export const Box = styled.div`
  width: 4%;
  padding-bottom: 4%;
  background-color: ${props => type[props.type]};
  border: #000 1px solid;
`;

// export const Apple = styled(Box)`
//   background-color: green;
// `;

// export const Snakebody = styled(Box)`
//   background-color: rgb(126, 0, 0);
// `;

// export const Snakehead = styled(Box)`
//   background-color: red;
// `;

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
