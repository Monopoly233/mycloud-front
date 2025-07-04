#!/bin/bash

echo "=== 老旧设备支持测试脚本 ==="
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "错误: 请在 front/mycloud 目录下运行此脚本"
    exit 1
fi

echo "1. 安装依赖..."
npm install

echo ""
echo "2. 启动开发服务器..."
echo "服务器将在 http://localhost:5173 启动"
echo ""
echo "3. 测试链接:"
echo "   - 现代界面: http://localhost:5173"
echo "   - 简洁界面: http://localhost:5173 (老旧设备自动检测)"
echo "   - User-Agent测试: http://localhost:5173/?test=ua"
echo ""
echo "4. 测试方法:"
echo "   - 使用现代浏览器访问查看现代界面"
echo "   - 使用老旧浏览器或修改User-Agent查看简洁界面"
echo "   - 访问测试页面验证检测逻辑"
echo ""
echo "5. 强制简洁视图:"
echo "   在 main.jsx 中取消注释 'return SimpleView;' 行"
echo ""

# 启动开发服务器
npm run dev 