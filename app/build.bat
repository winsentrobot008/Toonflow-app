@echo off
REM ===============================
REM Toonflow Web 构建脚本
REM 自动安装依赖、构建并启动项目
REM ===============================

REM 切换到当前脚本所在目录
cd /d "%~dp0"

REM 使用本地 Node.js 运行 npm
set NODE_PATH=C:\Users\aoogoost\Desktop\nodejs\node-v20.18.0-win-x64
set PATH=%NODE_PATH%;%PATH%

echo 🔧 正在安装依赖...
npm install

echo 🚀 正在构建项目...
npm run build

echo 🌐 启动本地服务器...
npm run dev

pause
