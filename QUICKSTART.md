# 快速开始指南

## 🚀 5分钟快速启动

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问应用
打开浏览器访问：`http://localhost:5173`

### 4. 登录使用
- 密码：`123456`
- 开始上传和管理文件

## 📋 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产版本 |
| `npm run lint` | 代码检查 |

## 🔧 快速配置

### 修改API地址
编辑 `src/App.jsx`：
```javascript
const API_BASE = 'http://your-api-server:8080/api';
```

### 修改端口
编辑 `vite.config.js`：
```javascript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

## 🎯 功能速览

- ✅ 密码登录
- ✅ 文件上传（拖拽/点击）
- ✅ 文件下载
- ✅ 文件删除
- ✅ 响应式设计

## 🆘 遇到问题？

1. **端口被占用**：修改 `vite.config.js` 中的端口
2. **依赖安装失败**：删除 `node_modules` 重新安装
3. **API连接失败**：检查后端服务是否启动

## 📞 获取帮助

- 查看完整文档：[README.md](README.md)
- 查看架构文档：[ARCHITECTURE.md](ARCHITECTURE.md)
- 查看组件关系：[COMPONENT_DIAGRAM.md](COMPONENT_DIAGRAM.md) 