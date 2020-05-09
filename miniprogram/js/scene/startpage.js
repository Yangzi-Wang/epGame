
let r_w = canvas.width / 1334
let r_h = canvas.height / 750
let pr = window.devicePixelRatio

let index_img = new Image()
index_img.src = 'images/index.jpg'

export default class StartPage {
  constructor(databus){
    
    this.databus = databus

    this.btnArea = {
      startX: canvas.width / 2 - 196/2 * r_w,
      startY: canvas.height / 2 + 100*r_h,
      width: 196 * r_w,
      height: 194 * r_w
    }
    this.eventHandler1 = this.nextScene.bind(this)
    this.hasEventBind = false
    this.canvasScale = false

  }
  init(){
    this.animations = []
    // console.log(this.databus.ready)
    if (this.databus.ready){
      this.bindEvent()
    } 
    
  }
  render(ctx) {
    if (this.databus.ready&&!this.canvasScale){
canvas.width = canvas.width * window.devicePixelRatio
      canvas.height = canvas.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      this.canvasScale = true
    }

    if(this.databus.ready){
      ctx.drawImage(index_img,0,0,canvas.width/pr,canvas.height/pr)
      ctx.drawImage(this.databus.imgList['btn01'],
      11,299,196,194,
        this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)
    }else{
      ctx.drawImage(index_img, 0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = 0.3
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
      drawProgress(ctx, this.databus.process);
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
      // this.databus.audioList['bgmusic'].volume = 0.2
      this.databus.audioList['bgmusic'].autoplay = true
      this.databus.audioList['bgmusic'].loop = true
      // console.log(this.databus.audioList['bgmusic'])

      this.databus.audioList['start'].play()
      this.databus.audioList['start'].onEnded((res) => {
        this.databus._event.on('touchstart', this.eventHandler1)
      })
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
// let offcanvas = wx.createCanvas()
// offcanvas.width = canvas.width*window.devicePixelRatio
// offcanvas.height = canvas.height*window.devicePixelRatio
// const offctx = offcanvas.getContext('2d')
// offctx.scale(window.devicePixelRatio, window.devicePixelRatio)

let center = [canvas.width/2,canvas.height/2]
function drawCricle(onctx, percent) {
  let ctx = offctx
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
  ctx.fillStyle = '#fff';
  ctx.fill();
  // 填充文字				
  ctx.font = "normal 13pt Microsoft YaHei";
  ctx.fillStyle = '#FF0066';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.moveTo(center[0], center[1]);
  ctx.fillText(percent + '%', center[0], center[1]);

  onctx.drawImage(offcanvas,
    0, 0, canvas.width, canvas.height)
}
function drawProgress(ctx,percent){
  let l = 400
  ctx.fillStyle = '#CC99FF';
  ctx.fillRect(canvas.width/2-l/2,canvas.height/2,l,5)

  ctx.fillStyle = '#fdbf7d'; 
  ctx.fillRect(canvas.width / 2 - l / 2, canvas.height/2, l*percent/100, 5)
  // 填充文字				
  ctx.font = "normal 13pt Microsoft YaHei";
  ctx.fillStyle = '#fdbf7d';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // ctx.moveTo(canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText(percent + '%', canvas.width / 2, canvas.height / 2 + 24);
}