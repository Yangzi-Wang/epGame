import MyAnimation from '../base/myanim.js'

let r_w = canvas.width / 1104
let r_h = canvas.height / 621

export default class SceneOne {
  constructor(databus){
    this.databus = databus
    this.animations = []

    this.clock = new MyAnimation(this.databus.imgList['clock'], 5, 410, 68)
    this.animations.push(this.clock)

    this.window = new MyAnimation(databus.imgList['window'],4,1366,295)
    this.animations.push(this.window)

    this.rabbit = new MyAnimation(databus.imgList['rabbit'],5,1370,415)
    this.animations.push(this.rabbit)


    this.windowArea = {
      startX: 810 * r_w,
      startY: 20 * r_h,
      width: 342 * 0.8 * r_w,
      height: 295 * 0.8 * r_h
    }

    /*this.maskArea = {
      imgX: 46,
      dx: 262,
      startX: canvas.width - 150 * r_w ,
      startY: 250 * r_h,
      width: 221* 0.65 * r_w,
      height: 103 * 0.65 * r_h,
    }*/

    this.clockArea = {
      startX: canvas.width / 2 + 250 * r_w,
      startY: 240 * r_h,
      width: 82 * r_w,
      height: 68 * r_h
    }

    this.sleepgArea = {
      startX: 35 * r_w,
      startY: 282 * r_h,
      width: 588 * r_w,
      height: 249 * r_h
    }

    this.girlArea = {
      startX: canvas.width / 2 - 220*r_w , 
      startY: 300 * r_h,
      width: 319 * 0.6 * r_w,
      height: 484 * 0.6 * r_h
    }

    this.rabbitArea = {
      startX: canvas.width / 2 + 100 * r_w,
      startY: 300 * r_h,
      width: 273 * r_w,
      height: 415 * r_h
    }

    this.targetArea = {
      startX: canvas.width / 2 - 150 * r_w,
      startY: 400 * r_h,
      width: 50 * r_w,
      height: 50 * r_h
    }

    this.beltBtnArea = {
      imgX: 11,
      dx: 339,
      startX: canvas.width/2 - 10,
      startY: 380 * r_h,
      width: 258 * 0.5 * r_w,
      height: 113 * 0.5 * r_h
    }

    this.nextSceneBtnArea = {
      startX: canvas.width / 2 - 259 / 2 * r_w,
      startY: canvas.height / 2 - 144 / 2 * r_h,
      width: 259 * r_w,
      height: 114 * r_h
    }
  }

  init() {
     this.maskArea = {
      imgX: 46,
      dx: 262,
      startX: canvas.width / window.devicePixelRatio - 150 * r_w ,
      startY: 250 * r_h,
      width: 221* 0.65 * r_w,
      height: 103 * 0.65 * r_h,
    }

    this.beltBtnArea.imgX = 11
    
    this.role = this.databus.role

    if(this.role==1){
      this.name = 'girl'
    }else{
      this.name = 'boy'
    }

    this.sleep = new MyAnimation(this.databus.imgList[`sleep${this.name}`], 3, 1766, 249)
    this.animations.push(this.sleep)

    this.man = new MyAnimation(this.databus.imgList[this.name], 7, 1953, 436)
    this.animations.push(this.man)

    this.window.init(this.windowArea.startX, this.windowArea.startY, this.windowArea.width,this.windowArea.height)

    this.clock.init(this.clockArea.startX,this.clockArea.startY,this.clockArea.width,this.clockArea.height)
    this.clock.playAnimation(0,true,10)

    this.sleep.init(this.sleepgArea.startX,this.sleepgArea.startY,this.sleepgArea.width,this.sleepgArea.height)
    this.sleep.playAnimation(0, true, 40)

    this.man.init(this.girlArea.startX,this.girlArea.startY,this.girlArea.width,this.girlArea.height)
    this.man.playAnimation(0, true, 20)

    this.rabbit.init(this.rabbitArea.startX, this.rabbitArea.startY, this.rabbitArea.width, this.rabbitArea.height)
    this.rabbit.playAnimation(0, true, 30)

    this.wake = false 
    this.big = false 
    this.cheaked = true 
    this.cover = true
    this.close = false
    this.bol = true
    this.tip = true
    this.maskcount = 1
    this.downHandler = this.putdown.bind(this)
    this.windowHandler = this.windowtouch.bind(this)
    this.pickHandler  = this.pickmask.bind(this)
    this.moveHandler = this.maskmove.bind(this)
    this.turnHandler = this.maskturn.bind(this)
    this.nextHandler = this.nextScene.bind(this)
    this.bindEvent()
  }



  render(ctx) {
    if(this.bol){
      this.bol = false
      canvas.width = canvas.width * window.devicePixelRatio
      canvas.height = canvas.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    ctx.drawImage(this.databus.imgList['bedroomBg'], 0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

    this.window.render(ctx)
    this.clock.render(ctx)
    
    if (this.wake) {
      this.man.render(ctx)
    } else {
      this.sleep.render(ctx)
    }

    if(this.big && this.cheaked) {
      ctx.translate(-300 * r_w, -500 * r_h)
      ctx.scale(2,2)
      this.cheaked = false
    }

    if(this.big && !this.close){
      ctx.drawImage(this.databus.imgList['btnfs'],this.beltBtnArea.imgX,0,258,113, this.beltBtnArea.startX, this.beltBtnArea.startY, this.beltBtnArea.width, this.beltBtnArea.height)
    }
    if(this.close && this.cover){
      this.cover = false
      ctx.scale(0.5, 0.5)
      ctx.translate(300 * r_w, 500 * r_h)
    }

    ctx.drawImage(this.databus.imgList['mask'], this.maskArea.imgX, 0, 220, 126, this.maskArea.startX, this.maskArea.startY, this.maskArea.width, this.maskArea.height)

    if(this.close) {
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = 0.3
      ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.globalAlpha = 1
      ctx.drawImage(this.databus.imgList['btnfs'],690,151,259,114, this.nextSceneBtnArea.startX, this.nextSceneBtnArea.startY, this.nextSceneBtnArea.width, this.nextSceneBtnArea.height)
    }

    if (this.tip) {
      this.rabbit.render(ctx)
    }
  }

  update() {
    this.animations.forEach((ani) => {
      if (this.databus.frame % ani.interval === 0)
        ani.update()
    })
  }

  bindEvent() {
    this.databus.audioList['window'].play()
    this.databus.audioList['window'].onEnded((res) => {
      this.tip = false
      this.databus._event.on('touchstart', this.windowHandler)
    })
  }

  //打开窗户
  windowtouch (e){
      e.preventDefault()
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (x >= this.window.locx
        && x <= this.window.locx + this.window.target_w
        && y >= this.window.locy
        && y <= this.window.locy + this.window.target_h) {
        this.window.playAnimation(0, false, 30)
        this.wake = true
        this.databus.audioList['mother'].play()
        this.databus.audioList['mother'].onEnded((res)=>{
          this.tip = true
          this.databus.audioList['pickmask'].play()
          this.databus.audioList['pickmask'].onEnded((res)=>{
            this.databus.audioList['mask'].play()
            this.databus.audioList['mask'].onEnded((res)=>{
              this.tip = false
              this.databus._event.on('touchstart', this.pickHandler)
            })
          })
        })
        this.databus._event.off('touchstart',this.windowHandler)
      }
  }
  //拿起口罩
  pickmask(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.maskArea
    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus._event.on('touchmove', this.moveHandler)
    }
  }
  //口罩移动
  maskmove(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    this.maskArea.startX = x - this.maskArea.width / 2
    this.maskArea.startY = y - this.maskArea.height / 2

    let area = this.targetArea
    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height){
      this.databus._event.on('touchend', this.downHandler)
      }
  }
  //放下口罩
  putdown() {
    this.big = true
    if(this.role==1){
      this.maskArea.startX = canvas.width / window.devicePixelRatio / 2 - 198 * r_w
      this.maskArea.startY  = 385 * r_h
    }else{
      this.maskArea.startX = canvas.width / window.devicePixelRatio / 2 - 195 * r_w
      this.maskArea.startY = 395 * r_h
    }
    this.tip = true
    this.databus.audioList['maskway'].play()
    this.databus.audioList['maskway'].onEnded((res)=> {
      this.databus._event.on('touchstart', this.turnHandler)
      this.tip = false
    })
    this.rabbit.locx= canvas.width / window.devicePixelRatio / 2 - 360 * r_w
    this.rabbit.locy = 400 * r_h
    this.rabbit.target_w = 273 * 0.5 * r_w
    this.rabbit.target_h = 415 * 0.5 * r_h


    this.databus._event.off('touchmove',this.moveHandler)
    this.databus._event.off('touchend',this.downHandler)
  }
  //跳转口罩
  maskturn(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.beltBtnArea

    if (x >= (area.startX-150*r_w)*2
      && x <= (area.startX - 150 * r_h) * 2 + area.width *2
      && y >= (area.startY - 250 * r_w)*2
      && y <= (area.startY - 250 * r_h)*2 + area.height*2) {
      ++this.maskcount
      if(this.maskcount > 3){
        this.close = true
        this.rabbit.locx = this.rabbitArea.startX
        this.rabbit.locy = this.rabbitArea.startY
        this.rabbit.target_w = this.rabbitArea.width
        this.rabbit.target_h = this.rabbitArea.height
        this.tip = true
        this.databus.audioList['goout'].play()
        this.databus.audioList['goout'].onEnded((res) => {
          this.tip = false
          this.databus._event.on('touchstart', this.nextHandler)
          this.databus._event.off('touchstart', this.turnHandler)
        })
      }else{
        this.beltBtnArea.imgX += this.beltBtnArea.dx
        this.maskArea.imgX +=this.maskArea.dx
      }
    }
  }
  //场景跳转
  nextScene(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.nextSceneBtnArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height){
      this.databus._event.off('touchstart')
      this.databus._event.off('touchmove')
      this.databus._event.off('touchend')
      this.databus.changeScene('sceneTwo')
      }

  }
}