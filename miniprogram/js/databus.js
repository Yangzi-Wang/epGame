import Event from './base/event'
import StartPage from './scene/startpage'
import SelectRole from './scene/selectrole'

let instance
let ctx = canvas.getContext('2d')

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

    this.sceneObj = {}
    this.sceneObj['startPage'] = new StartPage(instance)
    this.sceneObj['selectRole'] = new SelectRole(instance)
    // this.sceneObj['sceneOne'] = new SceneOne(instance)

  }

  reset() {
    this.frame      = 0
    this.scenename = 'startPage'
    
    //this.animations = []
    this.gameOver   = false


    this.sceneObj.startPage.init()
  }

  changeScene(scenename){
    //this.animations = []
    this.scenename = scenename
    this.sceneObj[scenename].init()
  }
}
