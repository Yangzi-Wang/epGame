import MyAnimation from '../base/myanim.js'
let r_w = canvas.width / 1334
let r_h = canvas.height / 750

export default class SelectRole {
  constructor(databus) {

    this.databus = databus

    this.btnArea = {
      startX: canvas.width / 2 - 259/2 * r_h,
      startY: 550 * r_h,
      width: 259 * r_h,
      height: 114 * r_h
    }

    this.animations = []
    this.boy = new MyAnimation(databus.imgList['boy'], 7, 2000, 441)
    this.animations.push(this.boy)
    this.selectedboy = new MyAnimation(databus.imgList['selectedboy'], 9, 2000, 343)
    this.animations.push(this.selectedboy)
    this.girl = new MyAnimation(databus.imgList['girl'], 7, 1953, 436)
    this.animations.push(this.girl)
    this.selectedgirl = new MyAnimation(databus.imgList['selectedgirl'], 7, 1953, 436)
    this.animations.push(this.selectedgirl)

    this.role = -1

  }
  init() {
    //this.animations = []
    let w = 319 * 0.9 * r_h
    let h = 484 * 0.9 * r_h
    let y = 100 * r_h
    let bx = canvas.width / 2 - w - 20
    let gx = canvas.width / 2 + 20
    this.boy.init(bx, y, w, h)
    this.boy.playAnimation(0,true,20)
    this.selectedboy.init(bx, y, w, h)
    this.selectedboy.playAnimation(0, true, 20)

    this.girl.init(gx, y, w, h)
    this.girl.playAnimation(0, true, 20)
    this.selectedgirl.init(gx, y, w, h)
    this.selectedgirl.playAnimation(0, true, 20)

    this.selectHandler = this.selectHandler.bind(this)
    this.confirmHandler = this.confirm.bind(this)
    this.bindEvent()
    this.role = -1
    
  }
  render(ctx) {
    ctx.drawImage(this.databus.imgList['bedroomBg'],0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#ffffff'
    ctx.globalAlpha = 0.3
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalAlpha = 1
    ctx.drawImage(this.databus.imgList['btn01'], 
      11, 15, 259, 114, 
      this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)

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
    this.databus._event.on('touchstart', this.confirmHandler)
    this.databus._event.on('touchstart', this.selectHandler)
  }
  
  confirm(e) {
    if(this.role===-1) return
    
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.btnArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus._event.off('touchstart', this.selectHandler)
      this.databus._event.off('touchstart', this.confirmHandler)
      this.databus.role = this.role
      this.databus.changeScene('sceneThree')
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

