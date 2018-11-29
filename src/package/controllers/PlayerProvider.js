import React, { Component } from 'react'
import { PlayerContext } from './context'
import WebAudio from '../core/webaudio'

import copyProperties from '../utils/copyProperties'


class PlayerProvider extends Component {
  state = {
    webAudio: null
  }

  ability = {
    plugins:[]
  }

  componentDidMount() {
    this.initWebAudio()
  }

  initWebAudio() {
    let { ability } = this.props
    this.ability = copyProperties(ability, this.ability)
    this.webAudio = new WebAudio({...this.ability})
    this.setState({ webAudio: this.webAudio })
  }

  setSrc(url) {
    this.webAudio.setSrc(url)
  }

  play() {
    this.webAudio.play()
  }

  render() {
    let { play, setSrc } = this
    let ctx = {
      play,
      setSrc,
      ...this.state
    }

    return (
      <PlayerContext.Provider value={ctx}>
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}

export default PlayerProvider
