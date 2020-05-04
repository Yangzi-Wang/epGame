import MyAnimation from '../base/myanim.js'

let r_w = canvas.width / 1334
let r_h = canvas.height / 750

let ani_w = 550 * r_w
let ani_h = 457 * r_h
let ani_x = 620 * r_w
let ani_y = canvas.height - ani_h

export default class SceneFive {
  constructor(databus) {

    this.databus = databus

    this.step1 = new MyAnimation(databus.imgList['step1'], 5, 2000, 331)
    this.step2 = new MyAnimation(databus.imgList['step2'], 5, 2000, 303)
    this.step4 = new MyAnimation(databus.imgList['step4'], 4, 1024, 395)
    this.step5 = new MyAnimation(databus.imgList['step5'], 4, 1924, 395)
    this.step6 = new MyAnimation(databus.imgList['step6'], 5, 2000, 329)
    this.step7 = new MyAnimation(databus.imgList['step7'], 5, 2000, 329)
    this.step8 = new MyAnimation(databus.imgList['step8'], 5, 2000, 329)

    this.btnArea = {
      startX: canvas.width / 2 - 259/2 * r_h,
      startY: canvas.height/2 - 114/2 * r_h,
      width: 259*r_h,
      height: 114*r_h
    }
    this.soapArea = {
      startX: 70 * r_w,
      startY: 40 * r_w,
      width: 380 * r_h,
      height: 300 * r_h
    }
    this.restartArea = {
      startX: canvas.width / 2 - 259 * r_h - 20,
      startY: canvas.height / 2 +20,
      width: 259 * r_h,
      height: 114 * r_h
    }
    this.epclassArea = {
      startX: canvas.width / 2 + 20,
      startY: canvas.height / 2 +20,
      width: 259 * r_h,
      height: 114 * r_h
    }
    this.washHandler = this.wash.bind(this)
    this.soapHandler = this.pickupSoap.bind(this)
    this.moveHandler = this.moveSoap.bind(this)
    this.gameoverHandler = this.gameover.bind(this)
  }
  init() {
    this.step1.init(ani_x, ani_y, ani_w, ani_h)
    this.step2.init(ani_x, ani_y, ani_w, ani_h)
    this.step4.init(ani_x + 160 * r_w, ani_y, ani_w / 2, ani_h)
    this.step5.init(ani_x + 50 * r_w, ani_y, ani_w, ani_h)
    this.step6.init(ani_x, ani_y, ani_w, ani_h)
    this.step7.init(ani_x, ani_y, ani_w, ani_h)
    this.step8.init(ani_x, ani_y, ani_w, ani_h)
    this.step1.state = 'first'
    this.step2.needsoap = true


    this.animations = []
    this.animations.push(this.step1)
    this.animations.push(this.step2)
    this.animations.push(this.step4)
    this.animations.push(this.step5)
    this.animations.push(this.step6)
    this.animations.push(this.step7)
    this.animations.push(this.step8)
    this.animations.push(this.step1)

    this.currentAni = this.step1

    
    this.bindEvent()

    this.pending = true
  
    this.makesoap = false
    
    this.hasbindoverEvent = false
  }
  render(ctx) {
    ctx.drawImage(this.databus.imgList['bg5'],
      0, 0, canvas.width, canvas.height)

    this.currentAni.render(ctx)

    ctx.drawImage(this.databus.imgList['soap'],
      this.soapArea.startX, this.soapArea.startY, this.soapArea.width, this.soapArea.height)


    if(!this.pending&&!this.currentAni.isPlaying&&!this.makesoap) {
      this.pending = true
      return
    }

    if(this.pending){
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = 0.3
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
      if (this.currentAni.state === 'last') {
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.3
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
        ctx.drawImage(this.databus.imgList['gameover'],
          canvas.width / 2 - 1116 / 2 * r_h, canvas.height / 2 - 509 / 2 * r_h, 1116 * r_h, 509 * r_h)
        ctx.drawImage(this.databus.imgList['btn01'],
          573, 15, 259, 114,
          this.restartArea.startX, this.restartArea.startY, this.restartArea.width, this.restartArea.height)
        ctx.drawImage(this.databus.imgList['btn01'],
          292, 15, 259, 114,
          this.epclassArea.startX, this.epclassArea.startY, this.epclassArea.width, this.epclassArea.height)
      }else if(this.currentAni.state ==='first'){
        ctx.drawImage(this.databus.imgList['btn01'], 
        292,159,259,114,
        this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)
      }else{
        ctx.drawImage(this.databus.imgList['btn01'],
          573, 159, 259, 114,
          this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)
      }
      
    }
  }
  update() {
    if (this.databus.frame % this.currentAni.interval === 0)
      this.currentAni.update()

    if(this.animations.length === 0 && this.pending && !this.hasbindoverEvent){
      this.databus._event.on('touchstart', this.gameoverHandler)
      this.step1.state = 'last'
      this.hasbindoverEvent = true
    }
  }
  bindEvent() {
    this.databus._event.on('touchstart', this.washHandler)
  }
  wash(e){
    if(!this.pending){
      return
    }
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.btnArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.pending = false

      if (this.animations.length === 1) {
        this.databus._event.off('touchstart', this.washHandler)
               
        // console.log(this.databus._event)
      }
      if (this.animations[0].needsoap){
        this.databus._event.on('touchstart', this.soapHandler)
        this.makesoap = true
        
      }else{
        this.currentAni = this.animations.shift()
        this.currentAni.playAnimation(0, false, 20)
      }
      if (this.step1.state ==='first') this.step1.state = ''
    }
  }
  pickupSoap(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.soapArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus._event.on('touchmove', this.moveHandler)
      this.databus._event.once('touchend', this.putDown.bind(this))
      }
  }
  moveSoap(e){
    e.preventDefault()

    this.soapArea.startX = e.touches[0].clientX - 190 * r_h
    this.soapArea.startY = e.touches[0].clientY - 150 * r_h
  }
  putDown(e){
    e.preventDefault()

    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY

    if (x >= ani_x
      && x <= ani_x + ani_w
      && y >= ani_y
      && y <= ani_y + ani_h) {
      this.pending = true
      this.makesoap = false
      this.currentAni = this.step2
      this.step2.needsoap = false
      this.databus._event.off('touchstart', this.soapHandler)
      }
    this.soapArea.startX = 70 * r_w
    this.soapArea.startY = 40 * r_w
    this.databus._event.off('touchmove', this.moveHandler)
  }
  gameover(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.restartArea
    let area2 = this.epclassArea
    
    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus._event.off('touchstart', this.gameoverHandler)
      this.databus.changeScene('startPage')
    }
    if (x >= area2.startX
      && x <= area2.startX + area2.width
      && y >= area2.startY
      && y <= area2.startY + area2.height) {
      this.databus._event.off('touchstart', this.gameoverHandler)
      this.databus.changeScene('epClass')
    }
  }
}

