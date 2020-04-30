
import DataBus    from './databus'

let ctx   = canvas.getContext('2d')

wx.cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  env: 'epgame-96p1p',
})
//const db = wx.cloud.database()

let databus = new DataBus()


/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

    databus.loadAllResource(function () {
      databus.createScenes()
    })
    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener('touchstart')
    canvas.removeEventListener('touchmove')
    canvas.removeEventListener('touchend')

    canvas.addEventListener('touchstart',function(e){
      databus._event.trigger('touchstart',e)
    })
    canvas.addEventListener('touchmove', function (e) {
      databus._event.trigger('touchmove', e)
    })
    canvas.addEventListener('touchend', function (e) {
      databus._event.trigger('touchend', e)
    })
    

    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }


  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    databus.sceneObj[databus.scenename].render(ctx)

  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    databus.sceneObj[databus.scenename].update()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
