import MyAnimation from '../base/myanim.js'

let r_w = canvas.width / 1334
let r_h = canvas.height / 750
let pr = window.devicePixelRatio

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

    this.rabbit = new MyAnimation(databus.imgList['rabbit'], 5, 1370, 415)

    this.audio = []
    this.audio.push(databus.audioList['wash2'])
    this.audio.push(databus.audioList['wash3'])
    this.audio.push(databus.audioList['wash4'])
    this.audio.push(databus.audioList['wash5'])
    this.audio.push(databus.audioList['wash6'])
    this.audio.push(databus.audioList['wash7'])
    this.audio.push(databus.audioList['wash8'])
    this.audio.push(databus.audioList['wash9'])

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
    this.rabbit.init(80 * r_w, 260* r_h,273*1.5*r_h,415*1.5*r_h)
    this.rabbit.playAnimation(0, true, 30)

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

    this.pending = true
    this.audioend = false
  
    this.makesoap = false
    
    this.hasbindoverEvent = false

    this.databus.audioList['wash1'].play()
    this.databus.audioList['wash1'].onEnded((res) => {
      this.bindEvent()   
      this.audioend = true   
    })
    // this.resize = false

  }
  render(ctx) {
    // if (!this.resize) {
    //   canvas.width = canvas.width * window.devicePixelRatio
    //   canvas.height = canvas.height * window.devicePixelRatio
    //   ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    //   this.resize = true
    // }
    ctx.drawImage(this.databus.imgList['bg5'],
      0, 0, canvas.width/pr, canvas.height/pr)

    this.currentAni.render(ctx)

    ctx.drawImage(this.databus.imgList['soap'],
      this.soapArea.startX, this.soapArea.startY, this.soapArea.width, this.soapArea.height)


    if(!this.pending&&!this.currentAni.isPlaying&&!this.makesoap) {
      this.pending = true
      if(this.audio.length!==0){
        let au = this.audio.shift()
        au.play()
        this.audioend = false
        au.onEnded((res) => {
          this.audioend = true
        })
      }
      
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
          canvas.width/pr / 2 - 1116 / 2 * r_h, canvas.height/pr / 2 - 509 / 2 * r_h, 1116 * r_h, 509 * r_h)
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
    if(!this.audioend){
      this.rabbit.render(ctx)
    }
  }
  update() {
    if (this.databus.frame % this.rabbit.interval === 0)
    this.rabbit.update()

    if (this.databus.frame % this.currentAni.interval === 0)
      this.currentAni.update()

    if(this.animations.length === 0 && this.pending && !this.hasbindoverEvent){
      this.step1.state = 'last'
      this.hasbindoverEvent = true
      this.databus.audioList['gameover'].play()
      this.databus.audioList['gameover'].onEnded((res) => { 
        this.databus._event.on('touchstart', this.gameoverHandler)
       })
    }
  }
  bindEvent() {
    this.databus._event.on('touchstart', this.washHandler)
  }
  wash(e){
    if(!this.pending||!this.audioend){
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

      let au = this.audio.length !== 0 && this.audio.shift()
      au.play()
      this.audioend = false
      au.onEnded((res) => {
        this.audioend = true
      })
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

      // canvas.width = canvas.width / window.devicePixelRatio
      // canvas.height = canvas.height / window.devicePixelRatio
      // canvas.getContext('2d').scale(1, 1)
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

