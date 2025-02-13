import { BroadcastHandler } from './comm/broadcast';
import { SyncMode, EventMap } from './interface/base';
import { TabSyncerType } from './interface/tab-sync';
import { State } from './store/state';

class TabSyncer<T extends EventMap, P extends object> implements TabSyncerType<T> {
  private name: string;

  private mode: SyncMode;

  private state: State<P>;

  private _handler: BroadcastHandler<T>;

  constructor(name: string, mode: SyncMode, initialState: P) {
    this.name = name;

    this.mode = mode;

    this._handler = this.getHandler();

    this.state = new State<P>(
      initialState,
      (cb) => {
        this._handler.subscribe('stateChange', cb);
      },
      (state) => this._handler.notify('stateChange', state as T['stateChange'])
    );
  }

  getHandler(): BroadcastHandler<T> {
    switch(this.mode) {
      case 'broadcast':
      default:
        return BroadcastHandler.getInstance<T>(this.name);
      // case 'localstorage':
      //   return LocalStorageHandler.getInstance<T>(this.name);
    }
  }
  
  notify<E extends keyof T>(event: E, params: T[E]): void {
    this._handler.notify(event, params);
  }

  subscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void {
    this._handler.subscribe(event, callback);
  }

  unsubscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void {
    this._handler.unsubscribe(event, callback);
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
  TabSyncer
};

