import Observer from './observer'
import { PlayState } from '../constants'

let defaultOptions = {
  plugins: [],
  playbackRate: 1
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
    this._playState = null
    this._playInfo = [] // 当前播放状态轨迹

    this._playbackRate = this._options.playbackRate

    // this.audioContext = new AudioContext()
    // this.source = this.audioContext.createMediaElementSource(this.audio)
    // this.gainNode = this.audioContext.createGain()
    // this.analyser = this.audioContext.createAnalyser() // 全局的音频分析器

    // this.source.connect(this.gainNode)
    // this.gainNode.connect(this.audioContext.destination)

    this.initPlugins()

    this.ininAudioSetting()

    this.bindEvents()
  }

  bindEvents() {
    let { audio } = this

    audio.addEventListener('error', (e) => {
      let src = this.audio.src
      this.emit('audio.loadError', [src, this, e])
      this.setPlayState(PlayState.ERROR)
    })

    audio.addEventListener('playing', () => {
      this.setPlayState(PlayState.PLAYING)
    })

    audio.addEventListener('pause', () => {
      this.setPlayState(PlayState.PAUSED)
    })

    audio.addEventListener('ended', () => {
      this.setPlayState(PlayState.STOPPED)
    })

    /* called when audio is playing */
    audio.addEventListener('timeupdate', () => {
      let currentTime = audio.currentTime
      if (this._playState === PlayState.PLAYING) {
        let persent = currentTime / audio.duration
        this.emit('audio.timeUpdate', [currentTime, persent])
      }
    })

    /* called when audio is downloading */
    audio.addEventListener('progress', () => {
      const percentage = audio.buffered.length ? audio.buffered.end(audio.buffered.length -1 ) / this.duration : 0
      this.emit('audio.progress', [percentage])
    })


    audio.addEventListener('durationchange', () => {
      if (this.duration !== 1) {
        this.emit('audio.durationChange', [this.duration])
      }
    })


  }

  initPlugins() {
    this._options.plugins.forEach(plugin => {
      plugin.apply({ webAudio: this })
    })
  }

  ininAudioSetting() {
    let { playbackRate } = this._options
    this.setPlaybackRate(playbackRate)
  }

  get duration() {
    return isNaN(this.audio.duration) ? 0 : this.audio.duration
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
    if (!this._playSrc) {
      throw new Error('audio url is not exit!')
    }

    this.audio.play()
    this.setPlayState(PlayState.PLAYING)
  }

  pause() {
    this.audio.pause()
    this.setPlayState(PlayState.PAUSED)
  }

  setPlayState(state) {
    if (this._playState !== state) {
      this._playState = state
      const info = {
        t: Date.now(),
        s: this._playState,
        p: this.audio.currentTime,
        s: this._playSrc
      }
      this._playInfo.push(info)
      this.emit('audio.playStateChange', [this._playState, this._playInfo])
      if (!this._playState || this._playState === PlayState.ERROR) {
        this._playInfo = []
      }
    }
  }

  setPlaybackRate(rate) {
    rate = Number(rate)
    if (isNaN(rate) || rate < 0.25 || rate > 5) {
      throw Error(`rate: ${rate}. audio playbackRate should in 0.25 to 5!'`)
    }
    this._playbackRate = rate
    this.audio.playbackRate = rate
    this.emit('audio.changePlaybackRate')
  }

  // setVolume(v) {
  //   // this.gainNode.gain.value = v
  //   this.disconnect()
  //   let [panner, gain1, gain2, convolver] = [
  //     this.audioContext.createPanner(),
  //     this.audioContext.createGain(),
  //     this.audioContext.createGain(),
  //     this.audioContext.createConvolver()
  //   ]
  //   panner.setOrientation(0, 0, 0, 0, 1, 0)
  //   let [index, radius] = [0, 20]
  //   let effectTimer = setInterval(() => {
  //     panner.setPosition(Math.sin(index) * radius, 0, Math.cos(index) * radius)
  //     index += 1 / 100
  //   }, 16)
  //   this.source.connect(panner)
  //   gain1.gain.value = 5
  //   panner.connect(gain1)
  //   gain1.connect(this.audioContext.destination)
  // }
}

export default WebAudio
