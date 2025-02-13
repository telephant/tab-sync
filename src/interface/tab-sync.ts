import { BaseSync, EventMap } from './base';

export interface TabSyncerType<T extends EventMap> extends BaseSync<T> {
  setState(state: any): void;
  getState(): any;
  onStateChange(callback: (state: any) => void): void;
}


export type TabSyncerEventMap<T extends EventMap> = BaseSync<T>;
