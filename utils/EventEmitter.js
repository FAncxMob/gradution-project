class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(type, cb) {
    const cbs = this.listeners[type] || []
    cbs.push(cb)
    this.listeners[type] = cbs

    return () => {
      this.remove(type, cb)
    }
  }

  emit(type, ...args) {
    console.log(`%cevent ${type} be triggered`, 'color:rgb(20,150,250);font-size:14px')
    const cbs = this.listeners[type]
    if (Array.isArray(cbs)) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < cbs.length; i++) {
        const cb = cbs[i]
        if (typeof cb === 'function') cb(...args)
      }
    }
  }

  remove(type, cb) {
    if (cb) {
      let cbs = this.listeners[type]
      cbs = cbs.filter(eMap => eMap.cb !== cb)
      this.listeners[type] = cbs
    } else {
      this.listeners[type] = null
      delete this.listeners[type]
    }
  }
}

export default new EventEmitter()
