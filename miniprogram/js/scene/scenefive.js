
export default class SceneFive {
  constructor(databus) {

    this.databus = databus

  }
  init() {
    this.animations = []
    // this.bindEvent()
  }
  render(ctx) {
    ctx.drawImage(this.databus.imgList['bg5'],
      0, 0, canvas.width, canvas.height)
  }
  update() {

  }
  bindEvent() {
    
  }
}

