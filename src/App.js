import React, { Component } from 'react';
import './App.css';
import Posts from './Posts.js';

class App extends Component {

  render() {
    const hnImg = <img src="y18.gif" alt="hacker news"></img>;
    return (
      <div className="page">
        <header className="hn-header">
          {hnImg}
          <span className="hn-title">Hacker News</span>
        </header>
        <div className="App">
          <Posts />
        </div>
      </div>
    );
  }
}

export default App;
