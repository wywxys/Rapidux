# Rapidux Sample Project

这是一个由 Rapidux AI 组件生成器创建的样例 Next.js 项目。

## 项目特性

- ✨ 最小依赖的 Next.js 15 项目
- 🎨 使用 Tailwind CSS 进行样式设计
- 📱 响应式设计，支持暗色模式
- 🔧 TypeScript 支持
- 🎯 AI 生成的组件示例
- 🚀 可以复用主项目的 node_modules

## 项目结构

```
sample-project/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 应用布局
│   │   ├── page.tsx            # 首页
│   │   ├── demo/
│   │   │   └── page.tsx        # 组件演示页面
│   │   └── globals.css         # 全局样式
│   └── components/
│       └── generated/          # AI 生成的组件
│           ├── button.tsx      # 按钮组件
│           ├── card.tsx        # 卡片组件
│           └── index.ts        # 组件导出
├── package.json                # 依赖配置
├── tsconfig.json              # TypeScript 配置
├── tailwind.config.ts         # Tailwind 配置
├── next.config.ts             # Next.js 配置
└── README.md                  # 项目说明
```

## 配置说明

### 1. Next.js 配置 (next.config.ts)
- 启用 `experimental.externalDir` 允许从父目录导入
- 配置 webpack 解析父目录的 node_modules
- 设置路径别名指向主项目的组件

### 2. TypeScript 配置 (tsconfig.json)
- 配置路径映射 (`@/*`) 指向本项目和主项目
- 包含主项目的 TypeScript 文件以便类型检查

### 3. 依赖管理
- 只包含 Next.js 核心依赖
- 通过 webpack 配置复用主项目的 node_modules
- 避免重复安装相同的包

## 运行项目

### 1. 安装依赖

```bash
cd sample-project
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

项目将在 http://localhost:3001 启动（避免与主项目端口冲突）

### 3. 构建项目

```bash
npm run build
```

## 用户系统集成

当前支持以下测试用户：

1. **管理员用户**
   - Email: admin@rapidux.com
   - Password: admin123

2. **测试用户**
   - Email: test@rapidux.com
   - Password: test123

## AI 生成的组件

### GeneratedButton
- 支持多种变体：primary, secondary, outline
- 支持多种尺寸：sm, md, lg
- 包含点击动画和禁用状态
- TypeScript 类型完整

### GeneratedCard
- 支持多种样式：default, elevated, outlined
- 灵活的内容结构
- 响应式设计
- 支持暗色模式

## 集成到主项目

这个样例项目可以作为 AI 生成组件的测试环境：

1. **实时预览**: 在此项目中预览 AI 生成的组件
2. **代码验证**: 验证生成的代码是否正确运行
3. **样式测试**: 测试组件在不同场景下的表现
4. **导出功能**: 将验证过的组件导出到主项目

## 开发指南

### 添加新的生成组件

1. 在 `src/components/generated/` 目录下创建新组件
2. 在 `index.ts` 中导出新组件
3. 在演示页面中添加使用示例

### 样式定制

- 修改 `tailwind.config.ts` 来自定义主题
- 在 `globals.css` 中添加全局样式
- 使用 CSS 变量支持暗色模式

### 类型安全

- 所有组件都包含完整的 TypeScript 类型
- 使用接口定义组件 Props
- 支持泛型和联合类型

## 下一步计划

- [ ] 集成 AI API 进行实时组件生成
- [ ] 添加组件编辑器功能
- [ ] 实现代码导出和保存功能
- [ ] 添加更多组件模板
- [ ] 支持组件库导入导出
