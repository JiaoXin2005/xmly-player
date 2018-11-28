function copyProperties(from, to) {
  for (var key in from)
    to[key] = from[key];
  return to;
}

export default class Observer {
  constructor() {
    this._handlers = {}
  }

  on(name, fn) {
    if (!this._handlers[name]) {
      this._handlers[name] = [fn]
    } else {
      this._handlers[name].push(fn)
    }
  }

  off(name, fn) {
    const handlers = this._handlers[name]
    if (handlers) {
      if (fn) {
        for (let i = handlers.lenght - 1; i >= 0; i--) {
          if (handlers[i] == fn) {
            handlers.splice(i, 1)
          }
        }
      } else {
        handlers.lenght = 0
      }
    }
  }

  unAll() {
    this._handlers = {}
  }

  once(name, fn) {
    const handler = (...args) => {
      fn.apply(this, args)
      setTimeout(() => {
        this.off(name, handler)
      }, 0)
    }
    this.on(name, handler)
  }  

  emit(event, ...args) {
    const handlers = this._handlers[event]
    handlers && handlers.forEach(fn => fn(...args))
  }
  
  applyPluginsAsyncSeries(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    var callback = args.pop();
    var plugins = this._handlers[name];
    if (!plugins || plugins.length === 0) return callback();
    var i = 0;
    var _this = this;
    args.push(copyProperties(callback, function next(err) {
      if (err) return callback(err);
      i++;
      if (i >= plugins.length) {
        return callback();
      }
      plugins[i].apply(_this, args);
    }));
    plugins[0].apply(this, args);
  }
}
