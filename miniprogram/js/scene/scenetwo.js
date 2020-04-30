import MyAnimation from '../base/myanim.js'

let r_w = canvas.width / 2208
let r_h = canvas.height / 1242

export default class SceneTwo {
  constructor(databus){
    this.databus = databus
    this.animations = []

    this.lineArea = {
      startX: 200 * r_w,
      startY: 400 * r_w,
      width: 490 * r_w,
      height: 175  * r_w
    }
  }

  init(){

    this.bgx = 0
    this.bgy = 0
    this.bgw = 2208
    this.bgh = 2208 * canvas.height / canvas.width

  }

  render(ctx) {
    ctx.drawImage(this.databus.imgList['sky'], this.bgx, this.bgy, this.bgw, this.bgh, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(this.databus.imgList['ground'], this.bgx, this.bgy, this.bgw, this.bgh, 0, 0, canvas.width, canvas.height)

    ctx.drawImage(this.databus.imgList['line'],this.lineArea.startX,this.lineArea.startY,this.lineArea.width,this.lineArea.height)
    

  }

  update() {
    this.animations.forEach((ani) => {
      if (this.databus.frame % ani.interval === 0)
        ani.update()
    })
  }

  bindEvent() {

  }
}