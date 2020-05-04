import MyAnimation from '../base/myanim.js'

let r_w = canvas.width / 1104
let r_h = canvas.height / 621

export default class SceneOne {
  constructor(databus){
    this.databus = databus
    this.animations = []
    //this.sleep = new Myanimation(databus.imgList[`sleep${this.role}`],3,1764,249)
    //this.animations.push(this.sleep)
    this.clock = new MyAnimation(this.databus.imgList['clock'], 5, 410, 68)
    this.animations.push(this.clock)

    this.window = new MyAnimation(databus.imgList['window'],4,1366,295)
    this.animations.push(this.window)


    this.windowArea = {
      startX: 810 * r_w,
      startY: 20 * r_h,
      width: 342 * 0.8 * r_w,
      height: 295 * 0.8 * r_h
    }

    this.maskArea = {
      startX: canvas.width - 150 * r_w ,
      startY: 250 * r_h,
      width: 221* 0.65 * r_w,
      height: 103 * 0.65 * r_h,
      maskSrc: this.databus.imgList['maskg1']
    }

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

    this.targetArea = {
      startX: canvas.width / 2 - 150 * r_w,
      startY: 400 * r_h,
      width: 50 * r_w,
      height: 50 * r_h
    }

    this.beltBtnArea = {
      startX: canvas.width/2 - 10,
      startY: 380 * r_h,
      width: 258 * 0.5 * r_w,
      height: 113 * 0.5 * r_h
    }

    this.nextSceneBtnArea = {
      startX: canvas.width / 2 - 259 / 2 * r_w,
      startY: canvas.height / 2 - 144 / 2 * r_h,
      width: 259 * r_w,
      height: 144 * r_h
    }
  }

  init() {
    this.role = this.databus.role
    console.log(this.role)
    if(this.role==1){
      this.name = 'girl'
    }else{
      this.name = 'boy'
    }
    this.sleep = new MyAnimation(this.databus.imgList[`sleep${this.name}`], 3, 1764, 249)
    this.animations.push(this.sleep)

    this.man = new MyAnimation(this.databus.imgList[`o${this.name}`], 7, 1953, 436)
    this.animations.push(this.man)

    this.window.init(this.windowArea.startX, this.windowArea.startY, this.windowArea.width,this.windowArea.height)

    this.clock.init(this.clockArea.startX,this.clockArea.startY,this.clockArea.width,this.clockArea.height)
    this.clock.playAnimation(0,true,10)

    //this.role = this.databus.role  //传递过来的角色值
    //this.sleep.init(10,135,588*0.5,249*0.5)
    //this.sleep.playAnimation(0,true,40)
    this.sleep.init(this.sleepgArea.startX,this.sleepgArea.startY,this.sleepgArea.width,this.sleepgArea.height)
    this.sleep.playAnimation(0, true, 40)

    this.man.init(this.girlArea.startX,this.girlArea.startY,this.girlArea.width,this.girlArea.height)
    this.man.playAnimation(0, true, 20)

    this.wake = false
    this.big = false
    this.cheaked = true
    this.cover = true
    this.close = false
    this.bol = true
    this.maskcount = 1
    this.btn = this.databus.imgList['mstep1']
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
      ctx.drawImage(this.btn, this.beltBtnArea.startX, this.beltBtnArea.startY, this.beltBtnArea.width, this.beltBtnArea.height)
    }
    if(this.close && this.cover){
      this.cover = false
      ctx.scale(0.5, 0.5)
      ctx.translate(300 * r_w, 500 * r_h)
    }

    if(this.close) {
      ctx.drawImage(this.databus.imgList['out'], this.nextSceneBtnArea.startX, this.nextSceneBtnArea.startY, this.nextSceneBtnArea.width, this.nextSceneBtnArea.height)
    }

    ctx.drawImage(this.maskArea.maskSrc, this.maskArea.startX, this.maskArea.startY, this.maskArea.width, this.maskArea.height)


    //if(this.role==0){
      //this.sleepboy.render(ctx)
    //}
    //else{
      //this.sleepgirl.render(ctx)
    //}
  }

  update() {
    this.animations.forEach((ani) => {
      if (this.databus.frame % ani.interval === 0)
        ani.update()
    })
  }

  bindEvent() {
    this.databus._event.on('touchstart',this.windowHandler)
    this.databus._event.on('touchstart',this.pickHandler)
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
        console.log("hello")
      this.databus._event.on('touchend', this.downHandler)
      }
  }
  //放下口罩
  putdown() {
    this.big = true
    if(this.role==1){
      this.maskArea.startX = canvas.width / window.devicePixelRatio / 2 - 195 * r_w
      this.maskArea.startY  = 385 * r_h
    }else{
      this.maskArea.startX = canvas.width / window.devicePixelRatio / 2 - 195 * r_w
      this.maskArea.startY = 395 * r_h
    }
    this.databus._event.off('touchmove',this.moveHandler)
    this.databus._event.off('touchend',this.downHandler)
    this.databus._event.on('touchstart', this.turnHandler)
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
        this.databus._event.on('touchstart',this.nextHandler)
        this.databus._event.off('touchstart',this.turnHandler)
      }else{
        this.btn = this.databus.imgList[`mstep${this.maskcount}`]
        this.maskArea.maskSrc = this.databus.imgList[`maskg${this.maskcount}`]
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