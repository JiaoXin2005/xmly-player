import Observer from './observer'

let src = 'http://audio.xmcdn.com/group50/M01/E6/36/wKgKmVv2jbuTR7VwADDPMy5_Qf4701.m4a'

let defaultOptions = {
  plugins: []
}

class WebAudio extends Observer {
  constructor(options) {
    super()
    this._options = Object.assign({}, defaultOptions, options)
    console.log(options, '123')
    this._plugins = {}

    this.audio = new Audio()

    this.audio.src = src
    this.audio.crossOrigin = 'anonymous'

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

  disconnect() {
    this.gainNode.disconnect(0)
  }

  play() {
    // const buffer = await getBuffer(src)
    // buffer && playAudio(buffer)
    this.applyPluginsAsyncSeries('play', () => {console.log(231231)})
    // this.audio.play()

    console.log(this, 'fireEvent')
  }

  setSource() {}

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