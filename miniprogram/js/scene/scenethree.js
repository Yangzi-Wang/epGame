import MyAnimation from '../base/myanim.js'
let r_w = canvas.width / 1334
let r_h = canvas.height / 750

let bgw = canvas.width
let bgh = bgw *750/1333
let bgy = -(bgh-canvas.height)/2

export default class SceneThree {
  constructor(databus) {

    this.databus = databus

    this.btnArea = {
      startX: canvas.width - 650 * r_w + 170 * r_w,
      startY: 106 * r_h + bgy + 80 * r_w,
      width: 140 * r_w,
      height: 110 * r_w
    }

    this.nextArea = {
      startX: canvas.width / 2 - 50,
      startY: canvas.height / 2,
      width: 100,
      height: 50
    }

    this.animations = []
    this.cabinet = new MyAnimation(databus.imgList['cabinet'], 3, 2038, 533)
    this.animations.push(this.cabinet)

  }
  init() {
    this.cabinet.init(canvas.width - 650 * r_w, 106 * r_h + bgy, 650 * r_w, 500 * r_w)

    this.finished = false
    this.pickupHandler = this.pickup.bind(this)
    this.nextHandler = this.nextScene.bind(this)
    this.bindEvent()

  }
  render(ctx) {
    ctx.drawImage(this.databus.imgList['bg3'], 0, bgy, bgw, bgh)
    this.animations.forEach((ani) => {
        ani.render(ctx)
    })
    
    // ctx.fillRect(this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)
    if (this.finished && !this.cabinet.isPlaying)
    ctx.fillRect(this.nextArea.startX, this.nextArea.startY, this.nextArea.width, this.nextArea.height)
  }
  update() {
    this.animations.forEach((ani) => {
      if (this.databus.frame % ani.interval === 0)
        ani.update()
    })
  }

  bindEvent() {
    this.databus._event.on('touchstart', this.pickupHandler)
  }
  pickup(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.btnArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.cabinet.playAnimation(0, false, 30)
      this.databus._event.off('touchstart', this.pickupHandler)
      this.databus._event.on('touchstart', this.nextHandler)
      this.finished = true
      }
  }
  nextScene(e) {
    if(this.cabinet.isPlaying) return

    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.nextArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus.changeScene('sceneFour')
      this.databus._event.off('touchstart', this.nextHandler)
    }
  }
}

