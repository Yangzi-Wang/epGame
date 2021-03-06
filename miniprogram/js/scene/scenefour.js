import MyAnimation from '../base/myanim.js'

let r_w = canvas.width/1334
let r_h = canvas.height/750
let pr = window.devicePixelRatio

let offcanvas = wx.createCanvas()
offcanvas.width = 1333
offcanvas.height = 750
const offctx = offcanvas.getContext('2d')

export default class SceneFour {
  constructor(databus) {

    this.databus = databus
    this.role = databus.role

    this.animations = []
    this.alcohol = new MyAnimation(databus.imgList['alcohol'], 4, 524, 139)
    this.animations.push(this.alcohol)

    // this.boy = databus.sceneObj.selectRole.boy
    // this.girl = databus.sceneObj.selectRole.girl
    this.rabbit = databus.sceneObj.sceneThree.rabbit

    this.zoominArea = {
      startX: 460*r_w,
      startY: 180 * r_w,
      width: 360 * r_w,
      height: 170 * r_w
    }

    this.alcoholArea = {
      startX: canvas.width / 2 + 30 * r_w,
      startY: 330 * r_w,
      width: 131 * 1.2 * r_w,
      height: 139 * 1.2 * r_w
    }
    this.nextSceneBtnArea = {
      startX: canvas.width / 2 - 259/2 * r_h,
      startY: canvas.height / 2 - 114/2 * r_h,
      width: 259 * r_h,
      height: 114 * r_h
    }
    this.targetArea = {
      startX: 360 * r_w + 70,
      startY: 280 * r_w + 50,
      width: 310 * r_w,
      height: 180 * r_w
    }
  }
  init() {
    
    this.alcohol.init(this.alcoholArea.startX, this.alcoholArea.startY, this.alcoholArea.width, this.alcoholArea.height)

    // this.boy.init(250*r_w, 220*r_h, 319*0.6*r_h, 484*0.6*r_h)
    // this.boy.playAnimation(0, true, 20)
    this.rabbit.init(800 * r_w, 260 * r_h, 273 * 1.5 * r_h, 415 * 1.5 * r_h)
    this.rabbit.playAnimation(0, true, 30)

    this.duration = 0   //消毒时长
    this.finished = false   //消毒完毕
    this.zooming = false    //拉近景
    this.zoomin = false    //进入近景
    this.inTargetArea = false    //消毒液进入目标区域

    this.bgx=0
    this.bgy=0
    this.bgw = 1333
    this.bgh = 1333 * canvas.height / canvas.width
    this.drawToOffcanvas()
    

    // this.boxx = 540*r_w
    // this.boxy = 215*r_h
    // this.boxw = 136*r_h
    // this.boxh = 87*r_h

    this.zoomHandler = this.zoom.bind(this)
    this.moveHandler = this.moveAlcohol.bind(this)
    this.pickupHandler = this.pickupAlcohol.bind(this)
    this.nextHandler = this.nextScene.bind(this)

    this.databus.audioList['4_1'].play()
    this.playAudio = true
    this.databus.audioList['4_1'].onEnded((res) => { 
      this.bindEvent()
      this.playAudio = false
      })
    
  }
  drawToOffcanvas(){
    offctx.drawImage(this.databus.imgList['bg4'],
      0, 0, offcanvas.width, offcanvas.height)

    offctx.drawImage(this.databus.imgList['box'],
    540,215,136,87)
  }
  render(ctx) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(offcanvas,
      this.bgx, this.bgy, this.bgw, this.bgh,
      0, 0, canvas.width/pr, canvas.height/pr)

    if(this.zoomin){
      if(this.inTargetArea){

        let tx = this.alcohol.locx - this.alcohol.locy - 100
        let ty = this.alcohol.locx + this.alcohol.locy - 100
        ctx.translate(tx, ty)
        ctx.rotate(-Math.PI / 4)
        this.alcohol.render(ctx)
        // 恢复
        ctx.rotate(Math.PI / 4)
        ctx.translate(-tx, -ty)
        // 计时
        this.duration++
        
      }else{
        this.alcohol.render(ctx)
      }
      
      // ctx.fillRect(this.targetArea.startX, this.targetArea.startY, this.targetArea.width, this.targetArea.height)
    } else if (!this.zooming){
      //箭头
       ctx.drawImage(this.databus.imgList['btn01'],
        509, 532, 164, 112,
        440 * r_w, 240*r_w, 164 * 0.4 * r_h, 112 * 0.4 * r_h)
    }
    if(this.finished){
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = 0.3
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
      ctx.drawImage(this.databus.imgList['btn01'], 
      11,159,259,114,
      this.nextSceneBtnArea.startX, this.nextSceneBtnArea.startY, this.nextSceneBtnArea.width, this.nextSceneBtnArea.height)
    }

    // ctx.fillStyle = '#1aad19'
    // ctx.fillRect(this.zoominArea.startX, this.zoominArea.startY, this.zoominArea.width, this.zoominArea.height)

    if (this.role === 0) {
       //this.selectedboy.render(ctx)
    } 

    if (this.role === 1) {
       //this.selectedgirl.render(ctx)
    } 
    if (this.playAudio) {
      this.rabbit.render(ctx)
    }
  }
  update() {
    
    this.animations.forEach((ani) => {
      if (this.databus.frame % ani.interval === 0)
        ani.update()
    })

    if (this.databus.frame % this.rabbit.interval === 0)
      this.rabbit.update()

    if(this.zooming){
      this.bgx+=3
      this.bgy+=0.7
      this.bgw -= 6
      //不变形
      this.bgh = this.bgw*canvas.height/canvas.width

      if (this.bgx > 380) {
        this.zooming = false
        this.zoomin = true
        this.databus._event.on('touchstart', this.pickupHandler)
      }

      // this.boxx -= 1
      // this.boxy += 0.5
      // this.boxw += 1
      // this.boxh = this.boxw*87/136
      
    }
  }

  bindEvent() {
    this.databus._event.on('touchstart', this.zoomHandler)
  }
  zoom(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.zoominArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.zooming = true
      this.databus._event.off('touchstart', this.zoomHandler)
    }
  }
  pickupAlcohol(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.alcoholArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus._event.on('touchmove', this.moveHandler)
      this.databus._event.once('touchend', this.putDown.bind(this))
    }
  }
  moveAlcohol(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    this.alcohol.setXY(x-100,y-100)

    let area = this.targetArea
    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height){
        if(!this.inTargetArea){
          this.inTargetArea = true
          this.alcohol.playAnimation(0, true, 20)
        }

      }else{
      if (this.inTargetArea) {
        this.inTargetArea = false
        this.alcohol.stop(true)
      }
      }
  }
  putDown(){
    this.inTargetArea = false
    this.alcohol.stop(true)
    this.alcohol.setXY(this.alcoholArea.startX, this.alcoholArea.startY)
    this.databus._event.off('touchmove', this.moveHandler)

    if(this.duration>200) this.finished = true

    if(this.finished){
      this.databus._event.off('touchstart', this.pickupHandler)
      this.databus.audioList['4_2'].play()
      this.playAudio = true
      this.databus.audioList['4_2'].onEnded((res) => { 
        this.databus._event.on('touchstart', this.nextHandler)
        this.playAudio = false
       })
      
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
      && y <= area.startY + area.height) {
      this.databus.changeScene('sceneFive')
      this.databus._event.off('touchstart', this.nextHandler)
    }
  }
}

