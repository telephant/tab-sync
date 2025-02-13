# TabSyncer

🚀 一个轻量级（仅 4KB）的浏览器标签页数据同步库，让标签页之间的通信变得简单高效。

[English](./README.md)

## 特性

- 🪶 **轻量级** - 仅 4KB，零依赖，极小的体积
- 🔄 **数据同步** - 多标签页之间的状态自动同步
- 📨 **即时通信** - 标签页之间的消息收发
- 💾 **状态管理** - 简单易用的数据管理方案
- 🔐 **自动持久化** - 页面刷新后状态自动恢复
- ⚡ **快速接入** - 简单的 API，快速上手

## 安装

```bash
npm install tab-syncer
# 或者
yarn add tab-syncer
```

## 使用示例

```typescript
import { TabSyncer } from 'tab-syncer';

// 初始化
const tabSyncer = new TabSyncer('myApp', 'broadcast', { count: 0 });

// 更新状态，自动同步到其他标签页
tabSyncer.setState(prev => ({ count: prev.count + 1 }));

// 监听状态变化
tabSyncer.onStateChange(state => {
  console.log('状态已更新：', state);
});

// 发送消息到其他标签页
tabSyncer.notify('customEvent', '消息内容');

// 接收其他标签页的消息
tabSyncer.subscribe('customEvent', data => {
  console.log('收到消息：', data);
});
```

## License

MIT