import Myanimation from '../base/myanim.js'

export default class SceneOne {
  constructor(databus){
    this.databus = databus
    this.animations = []

    //this.sleep = new Myanimation(databus.imgList[`sleep${this.role}`],3,1764,249)
    //this.animations.push(this.sleep)

    this.sleepgirl = new Myanimation(databus.imgList['sleepgirl'],3,1764,249)
    this.animations.push(this.sleepgirl)

    this.window = new Myanimation(databus.imgList['window'],4,2240,484)
    this.animations.push(this.window)

    this.clock = new Myanimation(databus.imgList['clock'],5,410,68)
    this.animations.push(this.clock)
  }

  init() {
    this.window.init(canvas.width/2+172, 12, 560*0.33, 484*0.33)
    this.clock.init(canvas.width/2+172, 140, 82*0.8, 68*0.8)
    this.clock.playAnimation(0,true,10)
    //this.role = this.databus.role  //传递过来的角色值
    //this.sleep.init(10,135,588*0.5,249*0.5)
    //this.sleep.playAnimation(0,true,40)
    //this.sleepboy.init(10, 135, 635 * 0.5, 369 * 0.5)
    //this.sleepboy.playAnimation(0, true, 40)
    this.sleepgirl.init(30, 135, 588, 249)
    this.sleepgirl.playAnimation(0, true, 40)
    this.bindEvent()
  }

  render(ctx) {
    ctx.drawImage(this.databus.imgList['bedroomBg'], 0, 0, canvas.width, canvas.height)
    this.window.render(ctx)
    this.clock.render(ctx)
    this.sleepgirl.render(ctx)
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
    this.windowevent = this.windowtouch.bind(this)
    this.databus._event.once('touchstart',this.windowevent)
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
      }
  }

}