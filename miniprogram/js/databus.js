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

import images from './R.js'
import audio from './M.js'

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
    this.audioList = {}
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

    for(let obj of audio) {
      that.audioList[obj.name] = wx.createInnerAudioContext()
      that.audioList[obj.name].src = obj.fileID
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
