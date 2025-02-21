type SyncMode = 'broadcast' | 'localstorage';
type EventMap = {
    [k: string]: any;
};
interface BaseSync<T extends EventMap> {
    notify<E extends keyof T>(event: E, params: T[E]): void;
    subscribe(event: string, callback: (message: string) => void): void;
    unsubscribe(event: string, callback: (message: string) => void): void;
}
interface StateOptions<T> {
    persist: boolean;
}

declare class BroadcastHandler<T extends EventMap> implements BaseSync<T> {
    private static instance;
    private name;
    private bc;
    listeners: Map<string, ((event: any) => void)>;
    private constructor();
    static getInstance<T extends EventMap>(name: string): BroadcastHandler<T>;
    _listenOn(): void;
    notify<E extends keyof T>(event: E, params: T[E]): void;
    subscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void;
    unsubscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void;
    dispose(): void;
}

interface TabSyncerType<T extends EventMap> extends BaseSync<T> {
    setState(state: any): void;
    getState(): any;
    onStateChange(callback: (state: any) => void): void;
}

declare class State<T> {
    _data: T;
    _listeners: ((state: T) => void)[];
    _notifier: (state: T) => void;
    _subscriber: ((cb: (params: T) => void) => void);
    _options: StateOptions<T>;
    get data(): T;
    set data(value: T);
    constructor(initialState: T, subscriber: ((cb: (params: T) => void) => void), notifier: (state: T) => void, options?: StateOptions<T>);
    setState(param: T | ((prevState: T) => T), notify?: boolean): T;
    getState(): T;
    onStateChange(listener: (state: T) => void): void;
    offStateChange(listener: (state: T) => void): void;
    stateFromLocalStorage(): any;
    persist(data: T): void;
    removeAllListeners(): void;
    dispose(): void;
}

declare class TabSyncer<T extends EventMap, P extends object> implements TabSyncerType<T> {
    private name;
    private mode;
    private state;
    private _handler;
    constructor(name: string, mode: SyncMode, initialState: P);
    getHandler(): BroadcastHandler<T>;
    notify<E extends keyof T>(event: E, params: T[E]): void;
    subscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void;
    unsubscribe<E extends keyof T>(event: E, callback: (params: T[E]) => void): void;
    setState(...params: Parameters<State<P>['setState']>): void;
    getState(): any;
    onStateChange(callback: (...args: Parameters<State<P>['setState']>) => void): void;
}

export { TabSyncer };
