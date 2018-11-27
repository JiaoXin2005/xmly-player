import React, { Component } from 'react'
import './App.css'

import Player from './package/controllers/Player'

// import Player from './package/core/webaudio'
import Baidu from './package/plugins/baidu'
import Link from './package/plugins/link'

let src = 'http://audio.xmcdn.com/group50/M01/E6/36/wKgKmVv2jbuTR7VwADDPMy5_Qf4701.m4a'

class Button extends Component {

  handlePlay = () => {
    this.props.setSrc(src)
    this.props.play()
  }

  render() {
    console.log('Button props: ', this.props)
    return <button onClick={this.handlePlay}>播放</button>
  }
}

class App extends Component {
  componentDidMount() {
    // this.player = new Player({
    //   plugins: [new Baidu(), new Link()]
    // })
  }


  render() {
    return <div className="App">
      <Player Component={Button} />
      </div>
  }
}

export default App
