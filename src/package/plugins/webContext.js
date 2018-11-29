export default class WebContext {

  constructor() {
  }

  apply({ webAudio }) {
    webAudio._AC = new AudioContext()
    // console.log(webAudio)
  }

}