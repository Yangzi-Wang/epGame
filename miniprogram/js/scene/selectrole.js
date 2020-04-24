let bedroomBg = new Image()
bedroomBg.src = 'images/bedroom.jpg'
export default class SelectRole {
  constructor(databus) {

    this.databus = databus

    this.btnArea = {
      startX: canvas.width / 2 - 50,
      startY: canvas.height / 2 + 50,
      width: 100,
      height: 50
    }
  }
  init() {
    this.animations = []
    this.bindEvent()
  }
  render(ctx) {
    ctx.drawImage(bedroomBg,0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)

    // this.animations.forEach((ani) => {
    //     if (ani.isPlaying) {
    //       ani.aniRender(ctx)
    //     }
    //   })
  }
  update(){
    
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

