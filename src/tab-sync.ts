import { BroadcastHandler } from '@/comm/broadcast';
import { SyncMode } from '@/interface/base';
import { TabSyncType } from '@/interface/tab-sync';
import { State } from '@/store/state';
import { EventParamsMap, TypeEventEmitter } from '@/util/event-emitter';

class TabSync<T extends EventParamsMap, P extends object> implements TabSyncType<T> {
  private name: string;

  private mode: SyncMode;

  private state: State<P>;

  private eventEmitter: TypeEventEmitter<T>;

  private _handler: BroadcastHandler<T>;

  constructor(name: string, mode: SyncMode, initialState: P) {
    this.name = name;

    this.mode = mode;

    this.state = new State<P>(initialState);

    this.eventEmitter = new TypeEventEmitter<T>();

    this._handler = this.getHandler();
  }

  getHandler(): BroadcastHandler<T> {
    switch(this.mode) {
      case 'broadcast':
        return BroadcastHandler.getInstance<T>(this.name);
      // case 'localstorage':
      default:
        return BroadcastHandler.getInstance<T>(this.name);
        // this._handler = new LocalStorageHandler();
    }
  }
  
  notify<E extends keyof T>(event: E, params: T[E]): void {
    this.eventEmitter.emit(event as string, params);

    this._handler.notify(event, params);
  }

  subscribe<E extends keyof T>(event: E, callback: (...args: T[E]) => void): void {
    this.eventEmitter.on(event as any, callback);
  }

  unsubscribe<E extends keyof T>(event: E, callback: (...args: T[E]) => void): void {
    this.eventEmitter.off(event as any, callback);
  }

  setState(...params: Parameters<State<P>['setState']>): void {
    this.state.setState(...params);
  }

  getState(): any {
    return this.state.getState();
  }

  onStateChange(callback: (...args: Parameters<State<P>['setState']>) => void): void {
    this.state.onStateChange(callback);
  }
}

export {
  TabSync
};

