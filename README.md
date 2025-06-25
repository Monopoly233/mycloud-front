# 我的云盘 - 前端项目

一个基于 React + Vite 的现代化文件管理应用，提供简洁、高效的个人云盘服务。

## ✨ 功能特性

- 🔐 **简单认证** - 密码登录，无需复杂注册
- 📁 **文件管理** - 上传、下载、删除文件
- 🎯 **拖拽上传** - 支持拖拽文件到上传区域
- 📱 **响应式设计** - 完美适配移动端和桌面端
- ⚡ **快速构建** - 基于 Vite，开发体验极佳
- 🎨 **现代UI** - 简洁美观的用户界面

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/           # 可复用组件
│   ├── Header.jsx       # 头部导航组件
│   ├── FileList.jsx     # 文件列表组件
│   ├── FileCard.jsx     # 文件卡片组件
│   └── UploadModal.jsx  # 上传模态框组件
├── pages/               # 页面组件
│   ├── LoginPage.jsx    # 登录页面
│   └── DashboardPage.jsx # 主页面
├── App.jsx              # 主应用组件
└── index.jsx            # 应用入口
```

## 🛠️ 技术栈

- **框架**: React 19
- **构建工具**: Vite
- **HTTP客户端**: Axios
- **样式**: CSS3 + 响应式设计
- **语言**: JavaScript (ES6+)

## 🎯 使用说明

### 登录
1. 打开应用首页
2. 输入密码：`123456`（可在后端配置中修改）
3. 点击登录按钮

### 文件上传
1. 点击"📤 上传文件"按钮
2. 在弹出的模态框中：
   - 点击选择文件，或
   - 直接拖拽文件到上传区域
3. 等待上传完成

### 文件管理
- **下载文件**: 点击文件卡片上的"⬇️"按钮
- **删除文件**: 点击文件卡片上的"🗑️"按钮
- **刷新列表**: 点击"🔄 刷新"按钮

## 🔧 配置说明

### 后端API配置

在 `src/App.jsx` 中修改API基础URL：

```javascript
const API_BASE = 'http://localhost:8080/api';
```

### 环境变量

创建 `.env` 文件来配置环境变量：

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=我的云盘
```

## 🎨 设计系统

### 颜色规范
- **主色调**: #667eea (蓝色)
- **辅助色**: #764ba2 (紫色)
- **成功色**: #28a745 (绿色)
- **危险色**: #dc3545 (红色)
- **中性色**: #6c757d (灰色)

### 响应式断点
- **移动端**: < 768px
- **平板端**: 768px - 1024px
- **桌面端**: > 1024px

## 📱 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 🔍 开发指南

### 添加新组件

1. 在 `src/components/` 目录下创建组件文件
2. 创建对应的CSS文件
3. 在需要的地方导入并使用

```javascript
// 示例：创建新组件
import React from 'react';
import './NewComponent.css';

const NewComponent = ({ prop1, prop2 }) => {
  return (
    <div className="new-component">
      {/* 组件内容 */}
    </div>
  );
};

export default NewComponent;
```

### 样式规范

- 使用CSS模块化，每个组件对应独立的CSS文件
- 遵循BEM命名规范
- 优先使用Flexbox和Grid布局
- 支持响应式设计

### 代码规范

- 使用ES6+语法
- 组件名使用PascalCase
- 文件名与组件名保持一致
- 添加必要的注释

## 🧪 测试

### 运行测试

```bash
npm run test
```

### 测试覆盖率

```bash
npm run test:coverage
```

## 📦 构建与部署

### 开发环境

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist/` 目录中。

### 部署到服务器

1. 构建生产版本
2. 将 `dist/` 目录内容上传到Web服务器
3. 配置服务器支持SPA路由

### Docker部署

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 故障排除

### 常见问题

**Q: 启动时出现端口占用错误**
A: 修改 `vite.config.js` 中的端口配置，或关闭占用端口的进程

**Q: 上传文件失败**
A: 检查后端服务是否正常运行，确认API地址配置正确

**Q: 样式显示异常**
A: 清除浏览器缓存，或重新安装依赖 `npm install`

### 调试模式

启动调试模式：

```bash
npm run dev -- --debug
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [React](https://react.dev/) - 前端框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Axios](https://axios-http.com/) - HTTP客户端

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 项目讨论区

---

**我的云盘** - 让文件管理变得简单高效 ✨
