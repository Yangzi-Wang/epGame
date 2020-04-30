export default class MyAnimation {
  constructor(imgObj, count, resource_w, resource_h) {
    
    // 当前动画是否播放中
    this.isPlaying = false

    // 动画是否需要循环播放
    this.loop = false

    // 每一帧的时间间隔
    this.interval = 20

    // 当前播放的帧
    this.index = -1

    // 总帧数
    this.count = count

    this.img = imgObj
    this.img_w = resource_w / this.count
    this.img_h = resource_h
  }

  init(locx, locy, target_w, target_h) {
    this.locx = locx
    this.locy = locy
    this.target_w = target_w
    this.target_h = target_h

    this.isPlaying = false
    this.index = 0
  }

  // 将播放中的帧绘制到canvas上
  render(ctx) {
    
    ctx.drawImage(
      this.img,
      // 源图像
      this.index*this.img_w,
      0,
      this.img_w,
      this.img_h,
      // 目标图像
      this.locx,
      this.locy,
      this.target_w,
      this.target_h
    )
  }

  // 播放预定的帧动画
  playAnimation(index = 0, loop = false, interval = 20) {

    this.isPlaying = true
    this.loop = loop
    this.interval = interval
    this.index = index
  }

  // 停止帧动画播放
  stop(reset = false) {
    this.isPlaying = false
    if(reset) this.index = 0
  }


  // 帧遍历
  update() {
    if(this.isPlaying){
      this.index++

      if (this.index > this.count - 1) {
        if (this.loop) {
          this.index = 0
        }

        else {
          this.index--
          this.stop()
        }
      }
    }
    
  }
  setXY(x,y){
    this.locx = x
    this.locy = y
  }
}
