import { StateOptions } from '../interface/base';
import { AESUtil } from '../util/aes-util';
const KEY = 'ts__state';

class State<T> {
  _data: T;

  _listeners: ((state: T) => void)[];

  _notifier: (state: T) => void;

  _subscriber: ((cb: (params: T) => void) => void);

  _options: StateOptions<T>;

  get data() {
    return this._data;
  }

  set data(value: T) {
    this._data = value;

    if (this._options.persist) {
      this.persist(value);
    }
  }

  constructor(
    initialState: T,
    subscriber: ((cb: (params: T) => void) => void),
    notifier: (state: T) => void,
    options: StateOptions<T> = {
      persist: true,
    }
  ) {
    this._data = this.stateFromLocalStorage() || initialState;
    this._options = options;

    this._listeners = [];
    this._subscriber = subscriber;
    this._notifier = notifier;

    this._subscriber((state) => {
      this.data = state;
      this._listeners.forEach(listener => listener(state));
    });
  }

  setState(param: T | ((prevState: T) => T), notify: boolean = true) {
    if (typeof param !== 'function') {
      this.data = param;
    } else {
      this.data = (param as Function)?.(this.data);
    }

    // notify listeners
    if (notify) {
      this._notifier(this.data);
    }

    return this.data;
  }

  getState() {
    return this.data;
  }

  onStateChange(listener: (state: T) => void) {
    this._listeners.push(listener);
  }

  offStateChange(listener: (state: T) => void) {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  stateFromLocalStorage() {
    const data = localStorage.getItem(KEY);
    try {
      if (data) {
        const decrypted = AESUtil.decrypt(data);
        return JSON.parse(decrypted);
      }
    } catch (error) {
      console.error('Error decrypting data from localStorage'); 
    }

    return null;
  }

  persist(data: T) {
    const encrypted = AESUtil.encrypt(JSON.stringify(data));
    localStorage.setItem(KEY, encrypted);
  }

  removeAllListeners() {
    this._listeners = [];
  }

  dispose() {
    this.removeAllListeners();
    this.data = {} as T;
  }
}

export {
  State
};

export default State;
