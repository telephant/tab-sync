import { EventParamsMap } from '@/util/event-emitter';
import { BaseSync, EventMap } from './base';

export interface TabSyncType<T extends EventParamsMap> extends BaseSync<T> {
  setState(state: any): void;
  getState(): any;
  onStateChange(callback: (state: any) => void): void;
}


export type TabSyncEventMap<T extends EventMap> = BaseSync<T>;
