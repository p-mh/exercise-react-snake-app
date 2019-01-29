import React, { Component } from 'react';
import './App.css';

import Grid from './components/Grid';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Grid />
      </div>
    );
  }
}

export default App;
