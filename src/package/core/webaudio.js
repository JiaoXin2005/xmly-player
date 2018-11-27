import Observer from './observer'
import {PlayState} from '../constants'

let defaultOptions = {
  plugins: []
}

class WebAudio extends Observer {
  constructor(options) {
    super()
    let audio = new Audio()
    audio.loop = false
    audio.preload = 'none'
    audio.autoplay = false
    audio.crossOrigin = 'anonymous'

    this._options = Object.assign({}, defaultOptions, options)
    // console.log(options, '123')
    this._plugins = {}

    this.audio = audio
    this._playSrc = null
    this.playState = PlayState.STOPPED


    // this.audioContext = new AudioContext()
    // this.source = this.audioContext.createMediaElementSource(this.audio)
    // this.gainNode = this.audioContext.createGain()
    // this.analyser = this.audioContext.createAnalyser() // 全局的音频分析器

    // this.source.connect(this.gainNode)
    // this.gainNode.connect(this.audioContext.destination)

    this.initPlugins()
  }

  initPlugins() {
    this._options.plugins.forEach(plugin => {
      plugin.apply({webAudio: this})
    })
  }

  setSrc(src) {
    try {
      this._playSrc = src
      this.audio.src = this._playSrc
      return this
    } catch (error) {
      console.log('webaudio setSrc error :', error)
    }
  }

  disconnect() {
    this.gainNode.disconnect(0)
  }

  play() {
    this.audio.play()
    // console.log(this, 'fireEvent')
  }

  pause() {
    this.audio.pause()
  }

  resume() {
    this.audio.play()
  }

  setVolume(v) {
    // this.gainNode.gain.value = v
    this.disconnect()
    let [panner, gain1, gain2, convolver] = [
      this.audioContext.createPanner(),
      this.audioContext.createGain(),
      this.audioContext.createGain(),
      this.audioContext.createConvolver()
    ]
    panner.setOrientation(0, 0, 0, 0, 1, 0)
    let [index, radius] = [0, 20]
    let effectTimer = setInterval(() => {
      panner.setPosition(Math.sin(index) * radius, 0, Math.cos(index) * radius)
      index += 1 / 100
    }, 16)
    this.source.connect(panner)
    gain1.gain.value = 5
    panner.connect(gain1)
    gain1.connect(this.audioContext.destination)

  }
}

export default WebAudio