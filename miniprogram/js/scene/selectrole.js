import MyAnimation from '../base/myanim.js'
let bedroomBg = new Image()
bedroomBg.src = 'images/bedroom.jpg'
let boy = new Image()
boy.src = 'images/role-boy.png'
let girl = new Image()
girl.src = 'images/role-girl.png'
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
    this.boy = new MyAnimation(boy, 7, 2237, 484)
    this.animations.push(this.boy)
    this.girl = new MyAnimation(girl, 7, 2239, 484)
    this.animations.push(this.girl)

  }
  init() {
    //this.animations = []
    this.boy.init(canvas.width/2-100, 90, 319*0.3,484*0.3)
    this.boy.playAnimation(0,true,20)
    this.girl.init(canvas.width /2+10, 90, 319 * 0.3, 484 * 0.3)
    this.girl.playAnimation(0, true, 20)
    this.bindEvent()
    
  }
  render(ctx) {
    ctx.drawImage(bedroomBg,0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)

    this.animations.forEach((ani) => {
        
          ani.render(ctx)
        
      })
  }
  update(){
    this.animations.forEach((ani) => {
      if(this.databus.frame % ani.interval ===0)
      ani.update()
    })
  }

  bindEvent() {
    this.databus._event.once('touchstart', this.confirm.bind(this))
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
      //this.databus.changeScene('SceneOne')
    }
  }
}

