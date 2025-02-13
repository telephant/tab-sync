export type SyncMode = 'broadcast' | 'localstorage';

export type EventMap = {
  [k: string]: any;
};

export interface BaseSync<T extends EventMap> {
  notify<E extends keyof T>(event: E, params: T[E]): void;
  subscribe(event: string, callback: (message: string) => void): void;
  unsubscribe(event: string, callback: (message: string) => void): void;
}

export interface StateOptions<T> {
  persist: boolean;
}
