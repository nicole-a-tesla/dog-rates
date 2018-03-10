import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DogRateContainer from './components/dog-rate-container'
import ErrorMessage from './components/error-message'

class App extends Component {
  render() {
    return (
      <div className="App">
        <DogRateContainer />
        <ErrorMessage message={ 'error' } />
      </div>
    );
  }
}

export default App;
