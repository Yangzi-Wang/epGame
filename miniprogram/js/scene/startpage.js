
let r_w = canvas.width / 1334
let r_h = canvas.height / 750

export default class StartPage {
  constructor(databus){
    
    this.databus = databus

    this.btnArea = {
      startX: canvas.width / 2 - 100 * r_w,
      startY: canvas.height / 2,
      width: 200 * r_w,
      height: 100 * r_w
    }
  }
  init(){
    this.animations = []
    this.eventHandler1 = this.nextScene.bind(this)
    this.bindEvent()
  }
  render(ctx) {
    //ctx.drawImage()
    ctx.fillStyle = '#1aad19'
    ctx.fillRect(this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)

    // this.animations.forEach((ani) => {
    //     if (ani.isPlaying) {
    //       ani.aniRender(ctx)
    //     }
    //   })
  }
  update() {

  }
  bindEvent(){
    this.databus._event.on('touchstart', this.eventHandler1)
  }
  nextScene(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.btnArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height){
      this.databus.changeScene('selectRole')
      this.databus._event.off('touchstart', this.eventHandler1)
      }
  }
}

