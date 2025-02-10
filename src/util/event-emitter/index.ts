import { EventEmitter } from 'events';

export type EventParamsMap = {
  [key: string]: any;
};

type K<T> = Extract<keyof T, string>;

export class TypeEventEmitter<T extends EventParamsMap = EventParamsMap> extends EventEmitter {
  protected _logger: Console | any;

  constructor(logger: Console | any = console) {
    super();
    this.setMaxListeners(Infinity);
    this._logger = logger;
  }

  on<E extends K<T>>(eventName: E, listener: (...args: T[E]) => void) {
    return super.on(eventName, listener);
  }

  off<E extends K<T>>(eventName: E, listener: (...args: T[E]) => void) {
    return super.off(eventName, listener);
  }

  removeAllListeners<E extends K<T>>(eventName: E) {
    return super.removeAllListeners(eventName);
  }

  once<E extends K<T>>(eventName: E, listener: (...args: T[E]) => void): this {
    return super.once(eventName, listener);
  }
}
