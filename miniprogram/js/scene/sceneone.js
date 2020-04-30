import MyAnimation from '../base/myanim.js'

let r_w = canvas.width / 1104
let r_h = canvas.height / 621

export default class SceneOne {
  constructor(databus){
    this.databus = databus
    this.animations = []
    this.role = databus.role

    //this.sleep = new Myanimation(databus.imgList[`sleep${this.role}`],3,1764,249)
    //this.animations.push(this.sleep)

    this.sleepgirl = new MyAnimation(databus.imgList['sleepgirl'],3,1764,249)
    this.animations.push(this.sleepgirl)

    this.girl = new MyAnimation(databus.imgList['girl'], 7, 2239, 484)
    this.animations.push(this.girl)

    this.window = new MyAnimation(databus.imgList['window'],4,2240,484)
    this.animations.push(this.window)

    this.clock = new MyAnimation(databus.imgList['clock'],5,410,68)
    this.animations.push(this.clock)

    this.windowArea = {
      startX: 810 * r_w,
      startY: 20 * r_w,
      width: 560 *0.5* r_w,
      height: 484 *0.5* r_w
    }

    this.maskArea = {
      startX: canvas.width - 150 * r_w ,
      startY: 250 * r_w,
      width: 221* 0.6 * r_w,
      height: 103* 0.6 * r_w,
      maskSrc: this.databus.imgList['maskg1']
    }

    this.clockArea = {
      startX: canvas.width / 2 + 250 * r_w,
      startY: 240 * r_w,
      width: 82 * r_w,
      height: 68 * r_w
    }

    this.sleepgArea = {
      startX: 35 * r_w,
      startY: 282 * r_w,
      width: 588 * r_w,
      height: 249 * r_w
    }

    this.girlArea = {
      startX: canvas.width / 2 - 220*r_w , 
      startY: 300 * r_w,
      width: 319 * 0.6 * r_w,
      height: 484 * 0.6 * r_w
    }

    this.beltBtnArea = {
      startX: canvas.width/2 ,
      startY: 320 * r_w,
      width: 100 * r_w,
      height: 100 * r_w
    }

    this.nextSceneBtnArea = {
      startX: canvas.width - 200*r_w,
      startY: 300 * r_w,
      width: 100 * r_w,
      height: 100 * r_w
    }
  }

  init() {
    this.window.init(this.windowArea.startX, this.windowArea.startY, this.windowArea.width,this.windowArea.height)

    this.clock.init(this.clockArea.startX,this.clockArea.startY,this.clockArea.width,this.clockArea.height)
    this.clock.playAnimation(0,true,10)

    //this.role = this.databus.role  //传递过来的角色值
    //this.sleep.init(10,135,588*0.5,249*0.5)
    //this.sleep.playAnimation(0,true,40)
    //this.sleepboy.init(10, 135, 635 * 0.5, 369 * 0.5)
    //this.sleepboy.playAnimation(0, true, 40)
    this.sleepgirl.init(this.sleepgArea.startX,this.sleepgArea.startY,this.sleepgArea.width,this.sleepgArea.height)
    this.sleepgirl.playAnimation(0, true, 40)

    this.girl.init(this.girlArea.startX,this.girlArea.startY,this.girlArea.width,this.girlArea.height)
    this.girl.playAnimation(0, true, 20)

    this.bgx = 0
    this.bgy = 0
    this.bgw = 1104
    this.bgh = 1104 * canvas.height / canvas.width

    this.wake = false
    this.big = false
    this.cheaked = true
    this.cover = true
    this.close = false
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
    //ctx.drawImage(this.databus.imgList['bedroomBg'], 0, 0, canvas.width, canvas.height)
    ctx.drawImage(this.databus.imgList['bedroomBg'], this.bgx, this.bgy, this.bgw, this.bgh,0,0,canvas.width,canvas.height)

    this.window.render(ctx)
    this.clock.render(ctx)
    if (this.wake) {
      this.girl.render(ctx)
    } else {
      this.sleepgirl.render(ctx)
    }

    if(this.big && this.cheaked) {
      ctx.translate(-200,-350)
      ctx.scale(2,2)
      this.cheaked = false
    }

    if(this.big && !this.close){
      ctx.fillStyle = '#1aad19'
      ctx.fillRect(this.beltBtnArea.startX, this.beltBtnArea.startY, this.beltBtnArea.width, this.beltBtnArea.height)
    }
    if(this.close && this.cover){
      this.cover = false
      ctx.scale(0.5, 0.5)
      ctx.translate(200, 350)
    }

    if(this.close) {
      ctx.fillRectStyle = '#ff0000'
      ctx.fillRect(this.nextSceneBtnArea.startX ,this.nextSceneBtnArea.startY, this.nextSceneBtnArea.width, this.nextSceneBtnArea.height)
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
      this.databus._event.on('touchend', this.downHandler)
    }
  }

  maskmove(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    this.maskArea.startX = x - this.maskArea.width / 2
    this.maskArea.startY = y - this.maskArea.height / 2

    let area = this.girlArea
    if (x >= area.startX-200
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height){
        console.log("hello")
      }
  }

  putdown() {
    this.big = true
    this.databus._event.off('touchmove',this.moveHandler)
    this.databus._event.off('touchend',this.downHandler)
    this.databus._event.on('touchstart', this.turnHandler)
  }

  maskturn(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.beltBtnArea

    if (x >= (area.startX-100)*2
      && x <= (area.startX-100) * 2 + area.width *2
      && y >= (area.startY-175)*2
      && y <= (area.startY-175)*2 + area.height*2) {
      ++this.maskcount
      if(this.maskcount > 3){
        this.close = true
        this.databus._event.on('touchstart',this.nextHandler)
        this.databus._event.off('touchstart',this.turnHandler)
      }else{
        this.maskArea.maskSrc = this.databus.imgList[`maskg${this.maskcount}`]
      }
    }
  }

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