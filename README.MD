# TabSync

🚀 The simplest way to sync data between browser tabs! A tiny yet powerful library that makes tab communication a breeze.


[中文](./README-CN.md)

## English

### Why TabSync?

- 🪶 **Incredibly Light** - Tiny 4KB footprint with zero dependencies. Your bundle size will thank you!
- 🔄 **Seamless Sync** - Keep your tabs in perfect harmony. Update data in one tab, see it everywhere!
- 📨 **Easy Communication** - Let your tabs talk to each other like best friends
- 💾 **Smart Management** - Handle your data with ease. Auto-persists state across page refreshes!
- 🔐 **Auto Persistence** - Your data survives refreshes and tab closures. Never lose state again!


### Get Started in Seconds

```bash
npm install tab-sync
# or
yarn add tab-sync
```

### Show Me the Code!

```typescript
import { TabSync } from 'tab-sync';

// Initialize TabSync with a unique namespace and initial state
const tabSync = new TabSync(
  'myApp',           // namespace
  'broadcast',       // sync method
  {                  // initial state
    count: 0,
    message: ''
  }
);

// Update state
tabSync.setState(prevState => ({
  ...prevState,
  count: prevState.count + 1
}));

// Get current state
const state = tabSync.getState();

// Listen to state changes
tabSync.onStateChange((state) => {
  console.log('State updated:', state);
});

// Send notifications across tabs
tabSync.notify('customEvent', { data: 'Hello from another tab!' });

// Subscribe to notifications
tabSync.subscribe('customEvent', (data) => {
  console.log('Received:', data);
});
```

## API Reference

### Constructor

#### `new TabSync(namespace, method, initialState)`
Creates a new TabSync instance.

```typescript
new TabSync(
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
tabSync.setState({ count: 1, message: 'Hello' });

// Updater function
tabSync.setState(prevState => ({
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
const currentState = tabSync.getState();
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
const unsubscribe = tabSync.onStateChange((state) => {
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
tabSync.notify('userLoggedIn', { 
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
const unsubscribe = tabSync.subscribe('userLoggedIn', (data) => {
  console.log('User logged in from another tab:', data);
});

// Cleanup when needed
unsubscribe();
```
## License

MIT