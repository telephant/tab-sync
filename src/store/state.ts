class State<T> {
  _data: T;

  _listeners: ((state: T) => void)[];

  constructor(initialState: T) {
    this._data = initialState;
    this._listeners = [];
  }

  setState(param: T | ((prevState: T) => T), notify: boolean = true) {
    if (typeof param !== 'function') {
      this._data = param;
    }

    this._data = (param as Function)?.(this._data);

    // notify listeners
    if (notify) {
      this._listeners.forEach(listener => listener(this._data));
    }
  }

  getState() {
    return this._data;
  }

  onStateChange(listener: (state: T) => void) {
    this._listeners.push(listener);
  }

  offStateChange(listener: (state: T) => void) {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  removeAllListeners() {
    this._listeners = [];
  }

  dispose() {
    this.removeAllListeners();
    this._data = {} as T;
  }
}

export {
  State
};

