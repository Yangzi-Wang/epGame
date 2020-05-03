// import MyAnimation from '../base/myanim.js'

let r_w = canvas.width / 1334
let r_h = canvas.height / 750

export default class EpClass {
  constructor(databus) {

    this.databus = databus

    this.btnArea = {
      startX: canvas.width - 160,
      startY: canvas.height - 100,
      width: 100,
      height: 50
    }
    this.backArea = {
      startX: 60,
      startY: 50,
      width: 100,
      height: 50
    }
    this.bgArea = {
      startX: (canvas.width - canvas.height * 1333 / 750) / 2,
      startY: 0,
      width: canvas.height * 1333 / 750,
      height: canvas.height
    }
    let that = this
    this.txtArea = {
      startX: that.bgArea.startX + 350 * r_h,
      startY: 190 * r_h,
      width: 490 * r_h * 817 / 475,
      height: 490 * r_h
    }
    this.backHandler = this.goback.bind(this)
    this.nextPageHandler = this.nextPage.bind(this)
  }
  init() {
    
    this.bindEvent()

    this.pageNo = 1

  }
  render(ctx) {
    ctx.fillStyle = '#fdbf7d'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(this.databus.imgList['epclass'],
      this.bgArea.startX, this.bgArea.startY, this.bgArea.width, this.bgArea.height)


    ctx.drawImage(this.databus.imgList['txt'+this.pageNo],
      this.txtArea.startX, this.txtArea.startY, this.txtArea.width, this.txtArea.height)

    ctx.fillStyle = '#ff0000'
    ctx.fillRect(this.backArea.startX, this.backArea.startY, this.backArea.width, this.backArea.height)
    if(this.pageNo<4)
      ctx.fillRect(this.btnArea.startX, this.btnArea.startY, this.btnArea.width, this.btnArea.height)
    
  }
  update() {
    
  }
  bindEvent() {
    this.databus._event.on('touchstart', this.nextPageHandler)
    this.databus._event.on('touchstart', this.backHandler)
  }
  nextPage(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.btnArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
        this.pageNo++
        if(this.pageNo===4){
          this.databus._event.off('touchstart', this.nextPageHandler)
        }
      }
  }
  goback(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.backArea

    if (x >= area.startX
      && x <= area.startX + area.width
      && y >= area.startY
      && y <= area.startY + area.height) {
      this.databus.changeScene('startPage')
      this.databus._event.off('touchstart', this.backHandler)
    }
  }
}

