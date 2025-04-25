import { BaseSync, EventMap } from '../interface/base';

class BroadcastHandler<T extends EventMap> implements BaseSync<T> {
  private static instance: BroadcastHandler<EventMap>;

  private name: string;

  private bc: BroadcastChannel;

  public listeners: Map<string, ((event: any) => void)>;

  private constructor(name: string) {
    this.name = name;

    this.bc = new BroadcastChannel(name);

    this.listeners = new Map();

    this._listenOn();
  }

  static getInstance<T extends EventMap>(name: string): BroadcastHandler<T> {
    if (!this.instance) {
      this.instance = new BroadcastHandler<T>(name);
    }

    return this.instance as BroadcastHandler<T>;
  }

  _listenOn() {
    this.bc.onmessage = (event) => {
      const { event: e, params } = event.data;
      this.listeners.get(e)?.(params);
    };
  }

  notify<E extends keyof T>(event: E, params: T[E]): void {
    console.log('notify', event, params);

    this.bc.postMessage({ event, params });
  }

  subscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void {
    console.log('subscribe', event);

    this.listeners.set(event as string, callback);
  }

  unsubscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void {
    console.log('unsubscribe', event);

    this.listeners.delete(event as string);
  }

  dispose() {
    this.listeners.clear();

    this.bc.onmessage = null;

    this.bc.close();
  }
}

export {
  BroadcastHandler,
};
