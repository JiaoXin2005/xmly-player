export default class Link {
  constructor() {

  }

  apply({ webAudio }) {
    console.log(this, webAudio)

    webAudio.on('play', next => {
      console.log(' Link ====  play')
      webAudio._jiaoxin_ = 'jiaoxin'
      next()
    })
  }
}