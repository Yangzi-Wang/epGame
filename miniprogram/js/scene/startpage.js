
let r_w = canvas.width / 1334
let r_h = canvas.height / 750

export default class StartPage {
  constructor(databus){
    
    this.databus = databus

    this.btnArea = {
      startX: canvas.width / 2 - 196/2 * r_w,
      startY: canvas.height / 2,
      width: 196 * r_w,
      height: 194 * r_w
    }
    this.eventHandler1 = this.nextScene.bind(this)
    this.hasEventBind = false

  }
  init(){
    this.animations = []
    // console.log(this.databus.ready)
    if (this.databus.ready) this.bindEvent()
  }
  render(ctx) {
    //ctx.drawImage()

    if(this.databus.ready){
      ctx.drawImage(this.databus.imgList['btn01'],
      11,299,196,194,
        this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)
    }else{

      drawCricle(ctx, this.databus.process);
    }
    

    // this.animations.forEach((ani) => {
    //     if (ani.isPlaying) {
    //       ani.aniRender(ctx)
    //     }
    //   })
  }
  update() {
    
  }
  bindEvent(){
    if(!this.hasEventBind){
      this.databus._event.on('touchstart', this.eventHandler1)
      this.hasEventBind = true
    }
    
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
      this.hasEventBind = false
      }
  }
}

let center = [canvas.width/2,canvas.height/2]
function drawCricle(ctx, percent) {
  // 画灰色的圆
  ctx.beginPath();
  ctx.arc(center[0], center[1], 60, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#CC99FF';
  ctx.fill();

  // 画进度环				
  ctx.beginPath();
  ctx.moveTo(center[0], center[1]);
  ctx.arc(center[0], center[1], 60, Math.PI * 1.5, Math.PI * (1.5 + 2 * percent / 100)); 
  ctx.closePath();
  ctx.fillStyle = '#FF0066'; 
  ctx.fill();
  // 画内填充圆				
  ctx.beginPath();
  ctx.arc(center[0], center[1], 57, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#000';
  ctx.fill();
  // 填充文字				
  ctx.font = "normal 13pt Microsoft YaHei";
  ctx.fillStyle = '#FF0066';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.moveTo(center[0], center[1]);
  ctx.fillText(percent + '%', center[0], center[1]);
}