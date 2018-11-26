export default class Baidu {
  constructor() {
  }

  apply({ webAudio}) {
    console.log(this, webAudio)
    webAudio.on('play', (next) => {
      setTimeout(() => {
        console.log(' Baidu ====  play')
        next()
      }, 2000);
    })
  }

}