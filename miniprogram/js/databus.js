import Event from './base/event'
import StartPage from './scene/startpage'
import SelectRole from './scene/selectrole'
import SceneOne from './scene/sceneone'
import SceneTwo from './scene/scenetwo'
import SceneThree from './scene/scenethree'
import SceneFour from './scene/scenefour'
import SceneFive from './scene/scenefive'
import EpClass from './scene/epclass'


let instance
let ctx = canvas.getContext('2d')
/*let images = {
  'boy': 'images/role-boy.png',
  'selectedboy': 'images/selectedboy.png',
  'girl': 'images/role-girl.png',
  'boy': 'images/role-boy.png',
  'ogirl': 'images/stand-girl.png',
  'oboy': 'images/stand-boy.png',
  'selectedgirl': 'images/selectedgirl.png',
  'bedroomBg': 'images/bedroom.jpg',
  'window': 'images/window.png',
  'clock': 'images/clock.png',
  'maskg1': 'images/maskg1.png',
  'maskg2': 'images/maskg2.png',
  'maskg3': 'images/maskg3.png',
  'sleepgirl': 'images/sleepgirl.png',
  'sleepboy': 'images/sleepboy.png',
  'ground': 'images/ground.png',
  'sky': 'images/sky.png',
  'line': 'images/line.png',
  'tree1': 'images/tree1.png',
  'trash': 'images/trash.png',
  'brand': 'images/brand.png',
  'lady': 'images/lady.png',
  'gentle': 'images/gentle.png',
  'movegirl': 'images/movegirl.png',
  'moveboy': 'images/moveboy.png',
  'left': 'images/left.png',
  'right': 'images/right.png',
  'mstep1': 'images/mstep1.png',
  'mstep2': 'images/mstep2.png',
  'mstep3': 'images/mstep3.png',
  'out': 'images/out.png'
}*/
import images from './R.js'

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    //this.pool = new Pool()
    this._event = new Event()

    this.imgList = {}
    this.sceneObj = {}
    this.sceneObj['startPage'] = new StartPage(instance)
    // this.sceneObj.startPage.init()
    this.ready = false  //资源是否加载完毕
    this.process = 0
  }

  reset() {
    this.frame      = 0
    this.scenename = 'startPage'
    this.gameOver   = false
    this.role = 0


    this.sceneObj.startPage.init()
  }

  changeScene(scenename){
    this.scenename = scenename
    this.sceneObj[scenename].init()
  }
  loadAllResource(callback){
    let that = this
    let done = 0
    for(let obj of images){
      wx.cloud.downloadFile({
        fileID: obj.fileID,
        success: res => {
          done++
          // 返回临时文件路径
          that.imgList[obj.name] = new Image()
          that.imgList[obj.name].src = res.tempFilePath
          that.process = Math.round(done / images.length * 100)
          if (done === images.length) {
            callback()
          }
        },
        fail: console.error
      })
    }
  }
  loadAllResource2(callback) {
    let that = this
    let done = 0
    for (let obj of images) {
      
      that.imgList[obj.name] = new Image()
      that.imgList[obj.name].src = obj.fileID
    }
    callback()
  }
  createScenes(){
    
    this.sceneObj['selectRole'] = new SelectRole(instance)
    this.sceneObj['sceneOne'] = new SceneOne(instance)
    this.sceneObj['sceneTwo'] = new SceneTwo(instance)
    this.sceneObj['sceneThree'] = new SceneThree(instance)
    this.sceneObj['sceneFour'] = new SceneFour(instance)
    this.sceneObj['sceneFive'] = new SceneFive(instance)
    this.sceneObj['epClass'] = new EpClass(instance)

    this.ready = true
    this.sceneObj.startPage.bindEvent()
  }
}
