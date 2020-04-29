import MyAnimation from '../base/myanim.js'


export default class SelectRole {
  constructor(databus) {

    this.databus = databus

    this.btnArea = {
      startX: canvas.width / 2 - 50,
      startY: canvas.height / 2 + 50,
      width: 100,
      height: 50
    }

    this.animations = []
    this.boy = new MyAnimation(databus.imgList['boy'], 7, 2237, 484)
    this.animations.push(this.boy)
    this.selectedboy = new MyAnimation(databus.imgList['selectedboy'], 9, 2878, 484)
    this.animations.push(this.selectedboy)
    this.girl = new MyAnimation(databus.imgList['girl'], 7, 2239, 484)
    this.animations.push(this.girl)
    this.selectedgirl = new MyAnimation(databus.imgList['selectedgirl'], 7, 2239, 484)
    this.animations.push(this.selectedgirl)

    this.role = -1

  }
  init() {
    //this.animations = []
    this.boy.init(canvas.width/2-100, 90, 319*0.3,484*0.3)
    this.boy.playAnimation(0,true,20)
    this.selectedboy.init(canvas.width / 2 - 100, 90, 319 * 0.3, 484 * 0.3)
    this.selectedboy.playAnimation(0, true, 20)

    this.girl.init(canvas.width /2+10, 90, 319 * 0.3, 484 * 0.3)
    this.girl.playAnimation(0, true, 20)
    this.selectedgirl.init(canvas.width / 2 + 10, 90, 319 * 0.3, 484 * 0.3)
    this.selectedgirl.playAnimation(0, true, 20)

    this.bindEvent()
    
  }
  render(ctx) {
    ctx.drawImage(this.databus.imgList['bedroomBg'],0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)

    if(this.role===0){
      this.selectedboy.render(ctx)
    } else { this.boy.render(ctx) }

    if (this.role === 1) {
      this.selectedgirl.render(ctx)
    } else { this.girl.render(ctx) }
  }
  update(){
    this.animations.forEach((ani) => {
      if(this.databus.frame % ani.interval ===0)
      ani.update()
    })
  }

  bindEvent() {
    this.databus._event.once('touchstart', this.confirm.bind(this))
    let selectHandler = this.selectHandler.bind(this)
    this.databus._event.once('touchstart', selectHandler)
  }
  
  confirm(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.btnArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {    
        console.log("hello")    
      this.databus.role = this.role
      this.databus.changeScene('sceneOne')
    }
  }
  selectHandler(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    if (x >= this.boy.locx
      && x <= this.boy.locx + this.boy.target_w
      && y >= this.boy.locy
      && y <= this.boy.locy + this.boy.target_h) {
        this.role = 0
    }
    if (x >= this.girl.locx
      && x <= this.girl.locx + this.girl.target_w
      && y >= this.girl.locy
      && y <= this.girl.locy + this.girl.target_h) {
      this.role = 1
    }
  }
}

