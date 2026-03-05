# 图形编程 - 教育编程学习平台

基于 Blockly 的 Web 端积木式图形编程软件，面向教育场景，支持拖拽积木块实现编程逻辑。

## 功能特性

- **积木式编程**：拖拽逻辑、循环、数学、文本、变量、函数等积木块
- **中文界面**：使用 Blockly 简体中文语言包
- **代码执行**：通过 JS-Interpreter 沙箱安全执行生成的 JavaScript
- **输出面板**：重定向 console.log 到页面输出区
- **项目管理**：新建、保存、打开项目（IndexedDB 本地存储）
- **无限循环保护**：防止死循环导致浏览器卡死

## 技术栈

- React 18 + TypeScript
- Vite
- Blockly
- JS-Interpreter
- Zustand
- Dexie (IndexedDB)
- Tailwind CSS

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 线上部署

**详细步骤**（含 GitHub 注册、推送、部署）：见 [DEPLOY.md](DEPLOY.md)

项目支持多种免费托管平台：

| 平台 | 命令/方式 |
|------|-----------|
| **GitHub Pages** | `npm run deploy`（需先将代码推送到 GitHub，并在仓库 Settings -> Pages 中选择 gh-pages 分支） |
| **Vercel** | `npx vercel` 或连接 GitHub 自动部署（部署前将 vite.config.ts 中 base 改为 `'/'`） |
| **Netlify** | 拖拽 `dist` 文件夹到 netlify.com，或连接 GitHub |
| **Cloudflare Pages** | 连接 GitHub 或上传 `dist` |

**注意**：GitHub Pages 部署到 `username.github.io/仓库名` 时，`vite.config.ts` 中 `base` 需为 `'/仓库名/'`；部署到 Vercel/Netlify 根域名时，`base` 改为 `'/'`。

## 项目结构

```
src/
├── components/       # React 组件
│   ├── BlocklyEditor/   # Blockly 编辑器
│   ├── Header/          # 顶部工具栏
│   ├── OutputPanel/     # 输出面板
│   └── ProjectPicker/   # 项目选择弹窗
├── blocks/          # 积木定义与工具箱配置
├── interpreter/     # JS-Interpreter 适配器
├── storage/         # IndexedDB 项目存储
├── store/           # Zustand 状态管理
└── locales/         # 语言包
```

## 使用说明

1. 从左侧工具箱拖拽积木到工作区
2. 拼接积木形成程序逻辑
3. 点击「运行」执行程序
4. 在右侧输出面板查看结果
5. 使用「保存」将项目保存到本地
6. 使用「打开」加载已保存的项目
