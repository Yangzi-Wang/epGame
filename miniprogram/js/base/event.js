export default class Event {
  constructor() {
    //记录所有的事件及处理函数
    this.handler = {};
  }

  /**
* on 添加事件监听
* @param type 事件类型
* @param handler 事件处理函数
*/

  on = (type, handler, once = false) => {

    if (!(handler instanceof Function)) {
      throw new Error('handler must be a function');
    }

    if (!this.handler[type]) {
      this.handler[type] = [];
    }

    

    if (!this.handler[type].includes(handler)) {
      this.handler[type].push(handler);

      if (once) {
        handler.once = true;
      }
    }

  }

  /**
   * off 取消事件监听
   * @param type 要取消的事件类型
   * @param handler 要取消的事件函数,如果不传则清除该类型所有函数
   */

  off = (type, handler) => {

    if (!handler) {
      this.handler[type] = [];
      return false;
    }

    this.handler[type] = this.handler[type].filter(fn => handler !== fn);

  }

  /**
   * trigger  执行函数
   * @param type 要执行哪个类型的函数
   * @param eventData 事件对象
   * @param point this执行
   */

  trigger = (type, eventData = {}) => {

    this.handler[type]&&this.handler[type].forEach(fn => {

      // fn.call(_this, eventData);
      fn(eventData)

      if (fn.once) {
        this.off(type, fn);
      }

    })
    //console.log(this.handler[type])
  }

  /**
   * once 该函数只执行一次
   * @param type 事件类型
   * @param handler 事件处理函数
   */

  once = (type, fn) => {

    this.on(type, fn, true);

  }

}
