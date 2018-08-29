import React, { Component } from 'react';
import {MainContainer} from './containers';
import { Footer } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
      <MainContainer/>
      <Footer/>
      </div>
    );
  }
}

export default App;
