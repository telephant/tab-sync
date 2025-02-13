import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 设置静态文件目录
app.use('/dist', express.static(path.join(__dirname, '../dist')));


// 路由处理
// app.get('/dist', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'tab-sync.js'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});