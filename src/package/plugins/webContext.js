export default class WebContext {

  constructor() {
  }

  apply({ webAudio }) {

    webAudio.enhance('_AC', () => {
      let _AC = new WebContext()
      return _AC
    })
  }

}