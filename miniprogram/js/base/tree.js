export default class Tree {
  constructor(imgObj,sx, sy, width, height,duration){
    this.img = imgObj
    this.locx = sx
    this.locy = sy
    this.width = width
    this.height = height
    this.duration = duration
  }

  render(ctx){
    ctx.drawImage(this.img, this.locx, this.locy, this.width, this.height)
  }

}