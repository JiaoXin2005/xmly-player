import React, { Component } from 'react';
import './App.css';
import Player from './package/core/webaudio'

import Baidu from './package/plugins/baidu'
import Link from './package/plugins/link'

class App extends Component {

  componentDidMount() {
    this.player = new Player({
      plugins: [new Baidu(), new Link()]
    })
  }

  render() {
    return <div className="App">
        <button onClick={() => {
            this.player.play()
          }}>
          播放
        </button>
        <button onClick={() => this.player.setVolume(0.2)}>0.2</button>
      </div>
  }
}

export default App;
