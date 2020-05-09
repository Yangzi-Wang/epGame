import MyAnimation from '../base/myanim.js'
let r_w = canvas.width / 1334
let r_h = canvas.height / 750

let bgw = canvas.width
let bgh = bgw *750/1333
let bgy = -(bgh-canvas.height)/2

let pr = window.devicePixelRatio

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
      startX: canvas.width / 2 - 259/2 * r_h,
      startY: canvas.height / 2,
      width: 259*r_h,
      height: 114*r_h
    }

    this.animations = []
    this.cabinet = new MyAnimation(databus.imgList['cabinet'], 3, 2038, 533)
    this.animations.push(this.cabinet)

    this.rabbit = new MyAnimation(databus.imgList['rabbit'], 5, 1370, 415)

  }
  init() {
    this.cabinet.init(canvas.width - 650 * r_w, 106 * r_h + bgy, 650 * r_w, 500 * r_w)
    this.rabbit.init(80 * r_w, 260 * r_h, 273 * 1.5 * r_h, 415 * 1.5 * r_h)
    this.rabbit.playAnimation(0, true, 30)

    this.finished = false
    this.audio2played = false
    this.pickupHandler = this.pickup.bind(this)
    this.nextHandler = this.nextScene.bind(this)

    // this.resize = false

    this.playAudio = true
    this.databus.audioList['3_1'].play()
    this.databus.audioList['3_1'].onEnded((res) => { 
      this.bindEvent()
      this.playAudio = false
       })
  }
  render(ctx) {
    // if(!this.resize){
      // canvas.width = canvas.width * window.devicePixelRatio
      // canvas.height = canvas.height * window.devicePixelRatio
      // ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      // this.resize = true
    // }
    ctx.drawImage(this.databus.imgList['bg3'], 0, bgy, bgw, bgh)
    this.animations.forEach((ani) => {
        ani.render(ctx)
    })
    
    !this.finished&&ctx.drawImage(this.databus.imgList['btn01'], 
    292,523,190,129,
    this.btnArea.startX - 190*r_h, this.btnArea.startY, 190*0.8*r_h, 129*0.8*r_h)

    // ctx.fillRect(this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)
    if (this.finished && !this.cabinet.isPlaying){
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = 0.3
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1

      ctx.drawImage(this.databus.imgList['btn01'],
        11, 523, 259, 114,
        this.nextArea.startX, this.nextArea.startY, this.nextArea.width, this.nextArea.height)

      if (!this.audio2played){
        this.audio2played = true
        this.playAudio = true
        this.databus.audioList['3_2'].play()
        this.databus.audioList['3_2'].onEnded((res) => { 
          this.databus._event.on('touchstart', this.nextHandler)
          this.playAudio = false
         })
      }
    }
    if (this.playAudio) {
      this.rabbit.render(ctx)
    }
  }
  update() {
    this.animations.forEach((ani) => {
      if (this.databus.frame % ani.interval === 0)
        ani.update()
    })
    if (this.databus.frame % this.rabbit.interval === 0)
      this.rabbit.update()
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

