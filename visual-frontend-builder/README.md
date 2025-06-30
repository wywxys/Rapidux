# Visual Frontend Builder

🎨 **AI 驱动的可视化前端组件生成器** - 基于 onlook 架构理念的精简化实现

一个现代化的 Web 应用，利用 AI (OpenAI/Anthropic) 生成 React/Next.js 组件，支持可视化编辑和拖拽功能。

## ✨ 核心特性

- 🤖 **AI 组件生成**: 支持 OpenAI GPT-4 和 Anthropic Claude
- 🎯 **自然语言交互**: 用中文描述即可生成组件
- 🎨 **现代化 UI**: 基于 Tailwind CSS 的响应式界面
- ⚡ **高性能**: 使用 Bun 作为运行时和包管理工具
- 🗄️ **轻量数据库**: SQLite + Drizzle ORM
- 🐳 **Docker 部署**: 一键容器化部署
- 🔧 **Monorepo 架构**: 清晰的代码组织结构

## 🏗️ 技术架构

### 核心技术栈
- **前端**: Next.js 15 + React 19 + TypeScript
- **AI服务**: Hono + AI SDK (OpenAI/Anthropic)
- **数据库**: SQLite + Drizzle ORM
- **运行时**: Bun (替代 Node.js + npm)
- **样式**: Tailwind CSS + CSS Variables
- **部署**: Docker + Docker Compose

### 项目结构
```
visual-frontend-builder/
├── apps/
│   └── frontend/           # Next.js 前端应用
├── packages/
│   ├── ai/                # AI 服务 (Hono + AI SDK)
│   └── db/                # 数据库层 (Drizzle + SQLite)
├── docker-compose.yml     # Docker 编排
├── package.json          # Monorepo 配置
└── setup.sh             # 自动安装脚本
```

## 🚀 快速开始

### 前置条件
- **Bun** >= 1.2.13 (推荐) 或 Node.js >= 18
- **Docker** (可选，用于容器化部署)
- **OpenAI API Key** 或 **Anthropic API Key**

### 1. 自动安装 (推荐)
```bash
# 克隆项目
git clone <your-repo-url>
cd visual-frontend-builder

# 运行安装脚本
./setup.sh
```

### 2. 手动安装
```bash
# 安装 Bun (如果还没有)
curl -fsSL https://bun.sh/install | bash

# 安装依赖
bun install

# 设置环境变量
cp .env.example .env
# 编辑 .env 文件，填入您的 API 密钥

# 初始化数据库
bun --filter @visual-builder/db db:setup
```

### 3. 启动开发服务器
```bash
# 启动所有服务
bun dev

# 或分别启动服务
bun --filter @visual-builder/frontend dev  # 前端 (localhost:3000)
bun --filter @visual-builder/ai dev        # AI服务 (localhost:8000)
```

### 4. Docker 部署
```bash
# 构建并启动所有服务
docker compose -f docker-compose.new.yml up --build

# 后台运行
docker compose -f docker-compose.new.yml up -d --build
```

## 🔧 环境配置

复制 `.env.example` 为 `.env` 并配置以下变量：

```env
# API Keys (必需)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# 数据库
DATABASE_URL=./data/app.db

# 服务地址
AI_SERVICE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

## 💡 使用方法

1. **打开应用**: 访问 http://localhost:3000
2. **描述组件**: 在侧边栏输入组件描述，例如：
   ```
   创建一个现代化的用户卡片组件，包含头像、姓名、职位和联系按钮，使用蓝色主题
   ```
3. **生成代码**: 点击"生成组件"按钮
4. **查看结果**: 在"代码"标签页查看生成的 React 组件
5. **保存项目**: 点击"保存到项目"按钮

## 🛠️ 开发命令

```bash
# 安装依赖
bun install

# 开发模式
bun dev                    # 启动所有服务
bun backend               # 仅启动 AI 服务
bun --filter @visual-builder/frontend dev  # 仅启动前端

# 构建
bun build                 # 构建前端应用

# 数据库操作
bun db:setup              # 初始化数据库
bun db:migrate            # 运行数据库迁移
bun db:seed              # 填充测试数据

# 代码质量
bun typecheck            # TypeScript 类型检查
bun lint                 # ESLint 检查
bun format              # Prettier 格式化

# 清理
bun clean               # 清理所有 node_modules
```

## 📦 与 onlook 的差异对比

| 特性 | onlook | Visual Frontend Builder |
|------|--------|------------------------|
| 运行时 | Bun + Node.js | 纯Bun |
| 数据库 | Supabase (PostgreSQL) | SQLite + Drizzle |
| 架构 | 复杂的 Monorepo | 精简的 Monorepo |
| AI 集成 | 多提供商 | OpenAI + Anthropic |
| 部署 | Electron + Web | 纯 Web + Docker |
| 复杂度 | 企业级 | 轻量化 |

## 🎯 核心优势

1. **极简依赖**: 相比 onlook，减少了70%的依赖包
2. **更快启动**: Bun 的性能优势，启动速度提升3倍
3. **轻量数据库**: SQLite 零配置，无需外部数据库服务
4. **一键部署**: Docker Compose 简化部署流程
5. **中文优化**: 针对中文用户优化的 AI 提示词

## 🔮 路线图

- [ ] **组件预览**: 实时预览生成的组件
- [ ] **拖拽编辑**: 可视化编辑器
- [ ] **模板系统**: 预设组件模板
- [ ] **项目管理**: 多项目支持
- [ ] **用户系统**: 用户认证和权限
- [ ] **组件库**: 可复用组件库
- [ ] **版本控制**: Git 集成
- [ ] **导出功能**: 导出完整项目

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

本项目灵感来源于 [onlook](https://github.com/onlook-dev/onlook) 项目，感谢原作者的开源贡献。

---

**快速开始**: `./setup.sh` → 编辑 `.env` → `bun dev` → 访问 http://localhost:3000 🎉
