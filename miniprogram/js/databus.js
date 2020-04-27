import Event from './base/event'
import StartPage from './scene/startpage'
import SelectRole from './scene/selectrole'

let instance
let ctx = canvas.getContext('2d')

let images = {
  'boy':'images/role-boy.png',
  'selectedboy': 'images/selectedboy.png',
  'girl': 'images/role-girl.png',
  'selectedgirl': 'images/selectedgirl.png',
  'bedroomBg':'images/bedroom.jpg'
}

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
    this.loadAllResource(function(){
      instance.createScenes()
    })

  }

  reset() {
    this.frame      = 0
    this.scenename = 'startPage'
    this.role = 0
    //this.animations = []
    this.gameOver   = false


    this.sceneObj.startPage.init()
  }

  changeScene(scenename){
    //this.animations = []
    this.scenename = scenename
    this.sceneObj[scenename].init()
  }
  loadAllResource(callback){
    for(let key in images){
      this.imgList[key] = new Image()
      this.imgList[key].src = images[key]
    }
    callback()
  }
  createScenes(){
    this.sceneObj = {}
    this.sceneObj['startPage'] = new StartPage(instance)
    this.sceneObj['selectRole'] = new SelectRole(instance)
    // this.sceneObj['sceneOne'] = new SceneOne(instance)
  }
}
