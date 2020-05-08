import MyAnimation from '../base/myanim.js'
import Tree from '../base/tree.js'

let r_w = canvas.width / 1366
let r_h = canvas.height / 768

let offcanvas = wx.createCanvas()
offcanvas.width = 1333
offcanvas.height = 750
const offctx = offcanvas.getContext('2d')

export default class SceneTwo {
  constructor(databus){
    this.databus = databus
    this.animations = []
    this.trees = []
    this.lady = new MyAnimation(this.databus.imgList['lady'], 5, 1366, 433)
    this.animations.push(this.lady)
    this.gentle = new MyAnimation(this.databus.imgList['gentle'], 5, 1366, 539)
    this.animations.push(this.gentle)
    this.rabbit = new MyAnimation(databus.imgList['rabbit'], 5, 1370, 415)
    this.animations.push(this.rabbit)


    this.lineArea = {
      startX: 20 * r_w,
      startY: 320 * r_w,
      width: 409 * r_w,
      height: 175  * r_w
    }

    this.treeArea = {
      startX: canvas.width / 2 + 30 * r_w,
      startY: 150 * r_h,
      width: 768* 0.2 * r_w,
      height: 845 * 0.2 * r_h
    }
    this.trashArea = {
      startX: canvas.width / 2 + 55 * r_w,
      startY: 300 * r_h,
      width: 344 * 0.2 * r_w,
      height: 408 * 0.2 * r_h
    }

    this.brandArea = {
      startX: canvas.width / 2 - 5 * r_w ,
      startY: 280 * r_h,
      width: 144 * 0.2  * r_w,
      height: 131 * 0.2 * r_h
    }

    this.roleArea = {
      startX: canvas.width / 2 - 100 * r_w,
      startY: canvas.height - 518 * 0.6 * r_h,
      width: 342 * 0.6 * r_w,
      height: 518 * 0.6 * r_h
    }

    this.rabbitArea = {
      startX: canvas.width / 2 + 120 * r_w,
      startY: 450 * r_h,
      width: 273.2 * r_w,
      height: 415 * r_h
    }

    this.ladyArea = {
      startX: canvas.width / 2 - 80 * r_w,
      startY: 250 * r_h,
      width: 342 * 0.2 * r_w,
      height: 433 * 0.2 * r_h
    }

    this.gentleArea = {
      startX: canvas.width / 2 - 50 * r_w,
      startY: 300 * r_h,
      width: 342 * 0.3 * r_w,
      height: 539 * 0.3 * r_h
    }

    this.leftArea = {
      startX: canvas.width / 2 - 100 * r_w,
      startY: canvas.height / 2 - 50 * r_h,
      width: 198 * r_w,
      height: 193 * r_h
    }

    this.rightArea = {
      startX: canvas.width / 2 - 100 * r_w,
      startY: canvas.height / 2 - 50 * r_h,
      width: 199 * r_w,
      height: 193 * r_h
    }

    for(let i=0;i<5;i++){
      let sx = canvas.width / 2 + 30 * r_w + i * 80 * r_w
      let sy = 150 *  r_h
      let width = 768 * (0.2 + i / 10) * r_w
      let height = 845 * (0.2 + i / 10) * r_h
      let duration = 400 + i*200
      this.temp = new Tree(this.databus.imgList['tree1'],sx,sy,width,height,duration)
      this.trees.push(this.temp)
    }
  }


  init(){
    this.role = this.databus.role
    this.run = false
    this.leftbtn  = false
    this.left = false
    this.rightbtn = false
    this.right  =false
    this.near = false
    this.vis = false
    this.tip = true
    this.count = 401
    this.cycle = 0
    console.log(this.trees)

    if(this.role==1){
      this.name = 'girl'
    }else{
      this.name = 'boy'
    }
    
    this.move = new MyAnimation(this.databus.imgList[`move${this.name}`], 4, 1366, 518)
    this.animations.push(this.move)

    this.move.init(this.roleArea.startX, this.roleArea.startY, this.roleArea.width, this.roleArea.height)
    this.move.playAnimation(0, true, 20)

    this.lady.init(this.ladyArea.startX, this.ladyArea.startY, this.ladyArea.width, this.ladyArea.height)
    this.lady.playAnimation(0, true, 20)

    this.gentle.init(this.gentleArea.startX, this.gentleArea.startY, this.gentleArea.width, this.gentleArea.height)
    this.gentle.playAnimation(0, true, 20)

    this.rabbit.init(this.rabbitArea.startX, this.rabbitArea.startY, this.rabbitArea.width, this.rabbitArea.height)
    this.rabbit.playAnimation(0, true, 30)

    this.leftHandler = this.turnleft.bind(this)
    this.rightHandler = this.turnright.bind(this)
    this.nextHandler = this.nextscene.bind(this)
    this.bindEvent()
    this.databus.audioList['avoid'].play()
    this.databus.audioList['avoid'].onEnded((res)=> {
      this.tip = false
      this.run = true
    })
  }

  render(ctx) {
    ctx.drawImage(this.databus.imgList['sky'], 0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

    ctx.drawImage(this.databus.imgList['ground'], 0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

    //ctx.drawImage(this.databus.imgList['line'], this.lineArea.startX, this.lineArea.startY, this.lineArea.width, this.lineArea.height)

    for (let i = 0; i < this.trees.length;i++){
      this.trees[i].render(ctx)
    }
    if(this.vis){
      ctx.drawImage(this.databus.imgList['brand'], this.brandArea.startX, this.brandArea.startY, this.brandArea.width, this.brandArea.height)
    }

    if (this.trashArea.startY + this.trashArea.height <= canvas.height / window.devicePixelRatio){
      ctx.drawImage(this.databus.imgList['trash'], this.trashArea.startX, this.trashArea.startY, this.trashArea.width, this.trashArea.height)
    }
    if (this.lady.locy + this.lady.target_h <= canvas.height / window.devicePixelRatio){
      this.lady.render(ctx)
    }
    if (this.gentle.locy + this.gentle.target_h <= canvas.height / window.devicePixelRatio){
      this.gentle.render(ctx)
    }
    this.move.render(ctx)

    if (this.tip) {
      this.rabbit.render(ctx)
    }

    if(this.leftbtn){
      ctx.drawImage(this.databus.imgList['btnfs'],11,151,198,193, this.leftArea.startX, this.leftArea.startY, this.leftArea.width, this.leftArea.height)
    }
    if(this.rightbtn) {
      ctx.drawImage(this.databus.imgList['btnfs'],335,151,198,193, this.rightArea.startX, this.rightArea.startY, this.rightArea.width, this.rightArea.height)
    }
  }

  update() {
    this.animations.forEach((ani) => {
      if (this.databus.frame % ani.interval === 0)
        ani.update()
    })
    if(this.run){
      if (this.count / 2000 <= 0.6) {
      this.trashArea.startX += 0.4 * r_w
      this.trashArea.startY += 0.3 * r_h
      this.trashArea.width = 344 * this.count / 2000 * r_w
        this.trashArea.height = 408 * this.count / 2000 * r_h
      }else{
        this.trashArea.startX += 0.4 * r_w
        this.trashArea.startY += 0.3 * r_h
      }

      if(this.count/2000<=0.7){
        this.lady.locx -= 0.3 * r_w
        this.lady.target_w = 342 * this.count / 2000 * r_w
        this.lady.target_h = 433 * this.count / 2000 * r_h 
      }else{
        this.lady.locx -= 0.3 * r_w
        this.lady.locy += 0.4 * r_h
      }
      
      if((this.count+200) / 2000<=0.7 ){
        this.gentle.locx -= 0.08 * r_w
        this.gentle.target_w = 342 * (this.count + 200) / 2000 * r_w
        this.gentle.target_h = 539 * (this.count + 200) / 2000 * r_h
      }else{
        this.gentle.locy += 0.4 * r_h
      }

      if(this.gentle.locy + this.gentle.target_h/2 >=this.move.locy && !this.left){
        this.leftbtn = true
        this.run  =false
        this.databus._event.on('touchstart', this.leftHandler)
      }

      if (this.lady.locy + this.lady.target_h / 2 >= this.move.locy && !this.right){
        this.rightbtn = true
        this.run = false
        this.near = true
        this.vis = true
        this.databus._event.on('touchstart', this.rightHandler)
      }

      if(this.near && this.vis){
        this.cycle++
        this.brandArea.startX -= 0.02 * r_w
        this.brandArea.startY -= 0.05 * r_h
        this.brandArea.width = 144  *( 0.2  + this.cycle / 2000) * r_w
        this.brandArea.height = 131 * (0.2 + this.cycle / 2000) * r_h
        if ( (0.2 + this.cycle / 2000) >= 0.7){
          this.near = false
          this.run = false
          this.tip = true
          this.databus.audioList['arrive'].play()
          this.databus._event.on('touchstart', this.nextHandler)
        }
      }
      //this.cycle++
      for (let i = 0; i < this.trees.length; i++){
        this.trees[i].duration++
        this.trees[i].locx += 0.4 * r_w
        if (this.trees[i].duration / 2000 <=0.6){
          this.trees[i].width = 768 * this.trees[i].duration / 2000 * r_w
          this.trees[i].height = 845 *  this.trees[i].duration / 2000 * r_h
        }
        else{
          this.trees[i].locy += 0.3 * r_w
        }
        if (this.trees[i].height + this.trees[i].locy >= canvas.height / window.devicePixelRatio){
          this.trees.pop()
        }
      }
      if (this.trees[0].duration / 2000 >= 0.3){
        let temp = new Tree(this.databus.imgList['tree1'], this.treeArea.startX, this.treeArea.startY, this.treeArea.width, this.treeArea.height,400)
        this.trees.unshift(temp)
        console.log(this.trees)
      }

    
      this.count++
    }
  }

  bindEvent() {

  }


  turnleft(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.leftArea
    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
        console.log("hello")
      this.move.locx -= 200
      this.left  =true
      this.run  = true
      this.leftbtn = false
      this.databus._event.off('touchstart', this.leftHandler)
    }
  }

  turnright(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.rightArea
    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      console.log("hello")
      this.move.locx += 200
      this.right = true
      this.run = true
      this.rightbtn = false
      this.databus._event.off('touchstart', this.rightHandler)
    }
  }

  nextscene(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.brandArea
    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus._event.off('touchstart')
      this.databus.changeScene('sceneThree')
    }
  }
}