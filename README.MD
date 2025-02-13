# TabSyncer

🚀 The simplest way to sync data between browser tabs! A tiny yet powerful library that makes tab communication a breeze.


[中文](./README-CN.md)

## English

### Why TabSyncer?

- 🪶 **Incredibly Light** - Tiny 4KB footprint with zero dependencies. Your bundle size will thank you!
- 🔄 **Seamless Sync** - Keep your tabs in perfect harmony. Update data in one tab, see it everywhere!
- 📨 **Easy Communication** - Let your tabs talk to each other like best friends
- 💾 **Smart Management** - Handle your data with ease. Auto-persists state across page refreshes!
- 🔐 **Auto Persistence** - Your data survives refreshes and tab closures. Never lose state again!


### Get Started in Seconds

```bash
npm install tab-syncer
# or
yarn add tab-syncer
```

### Show Me the Code!

```typescript
import { TabSyncer } from 'tab-syncer';

// Initialize TabSync with a unique namespace and initial state
const tabSyncer = new TabSyncer(
  'myApp',           // namespace
  'broadcast',       // sync method
  {                  // initial state
    count: 0,
    message: ''
  }
);

// Update state
tabSyncer.setState(prevState => ({
  ...prevState,
  count: prevState.count + 1
}));

// Get current state
const state = tabSync.getState();

// Listen to state changes
tabSyncer.onStateChange((state) => {
  console.log('State updated:', state);
});

// Send notifications across tabs
tabSyncer.notify('customEvent', { data: 'Hello from another tab!' });

// Subscribe to notifications
tabSyncer.subscribe('customEvent', (data) => {
  console.log('Received:', data);
});
```

## API Reference

### Constructor

#### `new TabSyncer(namespace, method, initialState)`
Creates a new TabSyncer instance.

```typescript
new TabSyncer(
  namespace: string,  // Unique identifier for your app instance
  method: string,     // Sync method, currently supports 'broadcast'
  initialState: T     // Initial state object of any type
)
```

### Methods

#### `setState(newState)`
Updates the state across all tabs.

**Type:**
```typescript
setState(newState: T | ((prevState: T) => T)): void
```

**Example:**
```typescript
// Direct value
tabSyncer.setState({ count: 1, message: 'Hello' });

// Updater function
tabSyncer.setState(prevState => ({
  ...prevState,
  count: prevState.count + 1
}));
```

#### `getState()`
Returns the current state.

**Type:**
```typescript
getState(): T
```

**Example:**
```typescript
const currentState = tabSyncer.getState();
console.log(currentState); // { count: 1, message: 'Hello' }
```

#### `onStateChange(callback)`
Subscribe to state changes across all tabs.

**Type:**
```typescript
onStateChange(callback: (state: T) => void): () => void
```

**Example:**
```typescript
const unsubscribe = tabSyncer.onStateChange((state) => {
  console.log('New state:', state);
});

// Cleanup when needed
unsubscribe();
```

#### `notify(event, data)`
Send a custom event to all other tabs.

**Type:**
```typescript
notify(event: string, data: any): void
```

**Example:**
```typescript
tabSyncer.notify('userLoggedIn', { 
  userId: 123,
  timestamp: Date.now()
});
```

#### `subscribe(event, callback)`
Listen for custom events from other tabs.

**Type:**
```typescript
subscribe(event: string, callback: (data: any) => void): () => void
```

**Example:**
```typescript
const unsubscribe = tabSyncer.subscribe('userLoggedIn', (data) => {
  console.log('User logged in from another tab:', data);
});

// Cleanup when needed
unsubscribe();
```
## License

MIT