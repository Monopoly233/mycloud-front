# 我的云盘 - 前端架构文档

## 📋 项目概述

我的云盘是一个基于 React + Vite 的现代化文件管理应用，提供文件上传、下载、删除等功能。项目采用组件化架构，具有良好的可维护性和可扩展性。

## 🏗️ 技术栈

- **框架**: React 19
- **构建工具**: Vite
- **HTTP客户端**: Axios
- **样式**: CSS3 + 响应式设计
- **语言**: JavaScript (ES6+)

## 📁 目录结构

```
src/
├── components/           # 可复用组件
│   ├── Header.jsx       # 头部导航组件
│   ├── Header.css       # 头部样式
│   ├── FileList.jsx     # 文件列表组件
│   ├── FileList.css     # 文件列表样式
│   ├── FileCard.jsx     # 文件卡片组件
│   ├── FileCard.css     # 文件卡片样式
│   ├── UploadModal.jsx  # 上传模态框组件
│   └── UploadModal.css  # 上传模态框样式
├── pages/               # 页面组件
│   ├── LoginPage.jsx    # 登录页面
│   ├── LoginPage.css    # 登录页面样式
│   ├── DashboardPage.jsx # 主页面
│   └── DashboardPage.css # 主页面样式
├── App.jsx              # 主应用组件
├── App.css              # 全局样式
├── index.jsx            # 应用入口
└── index.css            # 全局样式
```

## 🧩 组件架构

### 1. 页面级组件 (Pages)

#### LoginPage
- **职责**: 用户登录界面
- **功能**: 
  - 密码输入和验证
  - 登录状态管理
  - 错误信息显示
- **Props**:
  - `onLogin`: 登录回调函数
  - `loading`: 加载状态
  - `message`: 消息提示

#### DashboardPage
- **职责**: 主应用界面
- **功能**:
  - 文件管理主界面
  - 组件组合和布局
  - 状态传递
- **Props**:
  - `files`: 文件列表
  - `loading`: 加载状态
  - `message`: 消息提示
  - `showUploadModal`: 上传模态框显示状态
  - 各种回调函数

### 2. 功能组件 (Components)

#### Header
- **职责**: 顶部导航栏
- **功能**:
  - 应用标题显示
  - 上传文件按钮
  - 退出登录按钮
- **Props**:
  - `onUpload`: 上传按钮回调
  - `onLogout`: 退出按钮回调

#### FileList
- **职责**: 文件列表容器
- **功能**:
  - 文件列表渲染
  - 空状态显示
  - 加载状态显示
  - 刷新功能
- **Props**:
  - `files`: 文件数组
  - `loading`: 加载状态
  - `onDownload`: 下载回调
  - `onDelete`: 删除回调
  - `onRefresh`: 刷新回调

#### FileCard
- **职责**: 单个文件卡片
- **功能**:
  - 文件信息显示
  - 文件类型图标
  - 下载/删除操作
- **Props**:
  - `file`: 文件对象
  - `onDownload`: 下载回调
  - `onDelete`: 删除回调

#### UploadModal
- **职责**: 文件上传模态框
- **功能**:
  - 拖拽上传
  - 点击选择文件
  - 上传进度显示
- **Props**:
  - `onUpload`: 上传回调
  - `onClose`: 关闭回调

## 🔄 数据流

```
App.jsx (状态管理)
├── LoginPage (登录状态)
└── DashboardPage (主应用状态)
    ├── Header (导航)
    ├── FileList (文件列表)
    │   └── FileCard[] (文件卡片)
    └── UploadModal (上传功能)
```

### 状态管理

- **认证状态**: `isAuthenticated`
- **文件列表**: `files`
- **加载状态**: `loading`
- **消息提示**: `message`
- **模态框状态**: `showUploadModal`

## 🎨 样式架构

### 设计原则
- **模块化**: 每个组件对应独立的CSS文件
- **响应式**: 支持移动端和桌面端
- **一致性**: 统一的颜色、字体、间距规范

### 样式层级
```
全局样式 (index.css, App.css)
├── 页面样式 (pages/*.css)
└── 组件样式 (components/*.css)
```

### 设计系统
- **主色调**: #667eea (蓝色)
- **辅助色**: #764ba2 (紫色)
- **成功色**: #28a745 (绿色)
- **危险色**: #dc3545 (红色)
- **中性色**: #6c757d (灰色)

## 🔌 API 集成

### 接口配置
- **基础URL**: `http://localhost:8080/api`
- **认证方式**: Header中的 `X-Password`
- **数据格式**: JSON

### 主要接口
- `GET /files` - 获取文件列表
- `POST /upload` - 上传文件
- `GET /download/:filename` - 下载文件
- `DELETE /delete/:filename` - 删除文件

### 错误处理
- 网络错误处理
- 认证错误处理
- 文件操作错误处理

## 🚀 性能优化

### 代码分割
- 组件级别的代码分割
- 按需加载

### 渲染优化
- React.memo 优化组件重渲染
- 合理的组件拆分

### 用户体验
- 加载状态显示
- 进度条反馈
- 错误信息提示

## 📱 响应式设计

### 断点设置
- **移动端**: < 768px
- **平板端**: 768px - 1024px
- **桌面端**: > 1024px

### 适配策略
- 弹性布局 (Flexbox)
- 网格布局 (CSS Grid)
- 媒体查询

## 🔧 开发规范

### 命名规范
- **组件**: PascalCase (如 `FileCard`)
- **文件**: PascalCase (如 `FileCard.jsx`)
- **CSS类**: kebab-case (如 `file-card`)
- **变量**: camelCase (如 `fileList`)

### 代码组织
- 组件文件与样式文件对应
- 相关功能放在同一目录
- 清晰的导入导出

### 注释规范
- 组件功能说明
- 复杂逻辑注释
- Props 类型说明

## 🧪 测试策略

### 单元测试
- 组件渲染测试
- 用户交互测试
- 状态变化测试

### 集成测试
- 页面流程测试
- API 集成测试

## 📦 构建与部署

### 开发环境
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 部署配置
- 静态文件部署
- 环境变量配置
- 路由配置

## 🔮 未来扩展

### 功能扩展
- 文件预览
- 文件夹管理
- 文件搜索
- 批量操作

### 技术升级
- TypeScript 支持
- 状态管理库 (Redux/Zustand)
- UI 组件库集成
- 单元测试框架

### 性能优化
- 虚拟滚动
- 图片懒加载
- 缓存策略
- PWA 支持

## 📚 相关文档

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [Axios 官方文档](https://axios-http.com/)

---

*最后更新: 2024年12月* 