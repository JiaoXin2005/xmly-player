import React, { Component } from 'react'
import { PlayerContext } from './context'
import { PlayState } from '../constants'
import WebAudio from '../core/webaudio'

import copyProperties from '../utils/copyProperties'


class PlayerProvider extends Component {
  state = {
    webAudio: null,
    playState: null
  }

  ability = {
    plugins: []
  }

  componentDidMount() {
    this.initWebAudio()
    this.bindEvents()
  }

  initWebAudio() {
    let { ability } = this.props
    this.ability = copyProperties(ability, this.ability)
    this.webAudio = new WebAudio({ ...this.ability })
    this.setState({ webAudio: this.webAudio })
  }

  bindEvents() {
    this.webAudio.on('audio@loadError', () => {})

    this.webAudio.on('audio@playStateChange', ([playState, playInfo]) => {
      this.setState({ playState })
    })

    this.webAudio.on('audio@timeUpdate', ([currentTime, persent]) => {})

    this.webAudio.on('audio@progress', ([percentage]) => {})

    this.webAudio.on('audio@durationChange', ([duration]) => {})

    this.webAudio.on('audio@playbackRateChange')

    this.webAudio.on('audio@volumeChange')

    this.webAudio.on('audio@seekedTime')

    this.webAudio.on('audio@setSrc')
  }

  map$ToFunction() {
    let __proto__ = this.__proto__
    let fn = {}
    for (const key in this) {
      if (key.startsWith('$_')) {
        fn[key] = this[key]
      }
    }
    return fn
  }

  $_setSrc = (url) =>{
    this.webAudio.setSrc(url)
  }

  $_play = () =>  {
    this.webAudio.play()
  }

  $_pause = () => {
    this.webAudio.pause()
  }

  $_setPlaybackRate = (rate) => {
    this.webAudio.setPlaybackRate(rate)
  }

  $_setVolume = (volume) => {
    this.webAudio.setVolume(volume)
  }

  $_seek = (time) => {
    this.webAudio.seek(time)
  }

  render() {
    let fn = this.map$ToFunction()
    let ctx = {
      ...fn,
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
