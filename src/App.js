import React, { Component } from 'react'
import './App.css'

import Player from './package/controllers/Player'

let src = 'http://audio.xmcdn.com/group50/M01/E6/36/wKgKmVv2jbuTR7VwADDPMy5_Qf4701.m4a'

class Button extends Component {

  handlePlay = () => {
    this.props.$_setSrc(src)
    this.props.$_play()
  }

  render() {
    console.log('Button props: ', this.props)
    return <button onClick={this.handlePlay}>播放</button>
  }
}

class App extends Component {
  componentDidMount() {
  }


  render() {
    return <div className="App">
      <Player Component={Button} />
      </div>
  }
}

export default App
