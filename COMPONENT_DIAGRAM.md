# 组件关系图

## 🏗️ 组件层级结构

```
App.jsx (根组件)
├── LoginPage (登录页面)
│   └── 内部状态: password
│
└── DashboardPage (主页面)
    ├── Header (头部导航)
    ├── FileList (文件列表)
    │   └── FileCard[] (文件卡片数组)
    └── UploadModal (上传模态框)
```

## 🔄 数据流向

### 登录流程
```
LoginPage → onLogin → App.jsx → API → 状态更新 → DashboardPage
```

### 文件操作流程
```
FileCard → onDownload/onDelete → App.jsx → API → 状态更新 → FileList
```

### 上传流程
```
Header → onUpload → UploadModal → onUpload → App.jsx → API → 状态更新
```

## 📊 组件职责矩阵

| 组件 | 状态管理 | UI渲染 | 用户交互 | API调用 |
|------|----------|--------|----------|---------|
| App.jsx | ✅ | ❌ | ❌ | ✅ |
| LoginPage | ❌ | ✅ | ✅ | ❌ |
| DashboardPage | ❌ | ✅ | ❌ | ❌ |
| Header | ❌ | ✅ | ✅ | ❌ |
| FileList | ❌ | ✅ | ❌ | ❌ |
| FileCard | ❌ | ✅ | ✅ | ❌ |
| UploadModal | ❌ | ✅ | ✅ | ❌ |

## 🎯 Props 传递链

### 登录相关
```
App.jsx
├── onLogin: (password) => void
├── loading: boolean
└── message: string
    ↓
LoginPage
```

### 文件管理相关
```
App.jsx
├── files: File[]
├── loading: boolean
├── message: string
├── showUploadModal: boolean
├── onDownload: (filename) => void
├── onDelete: (filename) => void
├── onUpload: (files, onProgress) => void
├── onRefresh: () => void
├── onLogout: () => void
├── onShowUploadModal: () => void
└── onHideUploadModal: () => void
    ↓
DashboardPage
    ├── Header (onUpload, onLogout)
    ├── FileList (files, loading, onDownload, onDelete, onRefresh)
    │   └── FileCard[] (file, onDownload, onDelete)
    └── UploadModal (onUpload, onClose)
```

## 🎨 样式继承关系

```
全局样式 (index.css, App.css)
├── 页面样式
│   ├── LoginPage.css
│   └── DashboardPage.css
└── 组件样式
    ├── Header.css
    ├── FileList.css
    ├── FileCard.css
    └── UploadModal.css
```

## 🔧 组件复用性分析

### 高复用性组件
- **Header**: 可在其他页面复用
- **FileCard**: 可在不同列表场景复用
- **UploadModal**: 可作为通用上传组件

### 页面级组件
- **LoginPage**: 特定于登录场景
- **DashboardPage**: 特定于文件管理场景

### 容器组件
- **FileList**: 文件列表容器，可扩展支持不同数据源

## 📱 响应式适配

### 移动端适配
```
Header: 垂直布局
FileList: 单列布局
FileCard: 垂直排列
UploadModal: 全屏显示
```

### 桌面端适配
```
Header: 水平布局
FileList: 网格布局
FileCard: 水平排列
UploadModal: 居中显示
```

## 🚀 性能优化点

### 组件级优化
- **FileCard**: 使用 React.memo 避免不必要的重渲染
- **FileList**: 虚拟滚动（未来优化）
- **UploadModal**: 懒加载

### 状态优化
- **文件列表**: 分页加载（未来优化）
- **上传进度**: 实时更新
- **错误处理**: 统一管理

## 🔮 扩展性设计

### 新功能集成点
```
DashboardPage
├── 文件搜索组件
├── 文件夹树组件
├── 批量操作组件
└── 设置面板组件
```

### 插件化架构
- 文件预览插件
- 文件格式转换插件
- 第三方存储插件 