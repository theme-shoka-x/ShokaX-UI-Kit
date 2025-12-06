# Copilot Instructions for ShokaX-UI-Kit

简明规则，帮助 AI 迅速在本仓库（bun + turbo 的 monorepo）高效协作。

## 总览
- 采用 bun workspaces + turbo。根脚本：`bun run dev|build|lint|check-types|test|test:e2e` → 由 turbo fan out 到各包。
- 工作区：`apps/valaxy-theme-shokax`（Valaxy 主题与 demo）、`packages/nyx-player`（Vue3 音乐播放器/组件）、`packages/shokax-uikit`（UI 组件与样式）、`packages/shokax-toolkit-lib`（工具函数）。
- 代码风格：TypeScript + Vue 3 + UnoCSS，ESLint 使用 `@antfu/eslint-config`；尽量保持现有风格，不要引入 Prettier。
- bun overrides：`vite` 被替换为 `rolldown-vite`，`vue` 指向最新版，注意调试时的潜在差异。

## 构建与调试
- 根目录运行：
  - `bun run dev`：并行启动各包的 dev（turbo，持久进程）。
  - `bun run build`：依赖顺序执行 `lint` → `check-types` → `test` → `build`（见 `turbo.json`）。
  - `bun run lint` / `bun run check-types` / `bun run test` / `bun run test:e2e`：透传到各包。
- 包级运行（示例）：
  - Valaxy 主题：`bun --cwd apps/valaxy-theme-shokax run demo`（启动 demo），`bun --cwd apps/valaxy-theme-shokax run build:demo`，`bun --cwd apps/valaxy-theme-shokax run typecheck`。
  - Nyx Player：`bun --cwd packages/nyx-player run dev|build|test|test:e2e|check-types`（E2E 基于 Playwright，需先有 dev server，测试文件在 `tests/e2e/`）。
  - UI Kit：`bun --cwd packages/shokax-uikit run dev|build|check-types`（无单测）。
  - Toolkit：`bun --cwd packages/shokax-toolkit-lib run test --coverage`（Vitest，阈值 90/80/90）。
- Vitest 根配置 `vitest.config.ts` 使用 workspace 模式，排除 E2E；如果新增单测，放在对应包 `src` 侧。

## 关键约定与结构
- Valaxy 主题：
  - 入口配置 `theme/valaxy.config.ts`，为 Vite 设置别名 `@uikit -> packages/shokax-uikit/src`，使用 `generateSafelist` 为 UnoCSS safelist 注入图标类。
  - 默认主题配置在 `theme/node/index.ts` 的 `defaultThemeConfig`，调 safelist/导航请保持类型 `ThemeConfig`。
  - Segments 文章数据规范化逻辑在 `theme/components/segments/segmentsPostsShared.ts`，包含封面占位、分类 slug、阅读时长估算。
- Nyx Player：
  - 主入口 `src/entries/init.ts`：`initPlayer(el, showBtn, urls, playBtn?, darkModeTarget?, preset?, styles?)`；使用 Pinia + `pinia-plugin-persistedstate` 保持播放状态（sessionStorage）。
  - 播放状态仓库在 `src/stores/usePlayingStore.ts`，包含播放/暂停、当前歌单、阅读（歌词）模式等 getter/action；序列化时重新构造 `PlayList`。
  - 样式依赖 UnoCSS（`virtual:uno.css`）与 CSS 变量；覆盖主题可传 `preset`/`styles`。
  - E2E 场景在 `tests/e2e/player.test.ts`，假设元素 `#MusicPlayerRoot`、`#test`、`#play`。
- ShokaX UI Kit：
  - 入口 `src/main.ts`，组件与样式在 `src/components`、`src/styles`；`entries/codeblock.ts`、`entries/pagefind.ts` 提供按需初始化（Pagefind 搜索挂载 `#pagefind_mount`）。
  - 构建包含主包与 codeblock 子构建（`vite.codeblock.config.ts`）。
- Toolkit Lib：
  - 导出在 `src/index.ts` 聚合，如 `formatCategories`、`structurePostsByDate`、`generateTagCloud` 等，纯函数型，无副作用。

## 开发提示
- 保持 TypeScript 严格性：`vue-tsc` / `tsc --noEmit` 在子包执行；新增导出记得补类型声明或 d.ts 生成。
- UnoCSS：新增原子类时留意 safelist（尤其 Valaxy 主题图标类）。
- 组件命名空间：遵循现有前缀（如 Valaxy 组件路径带 `segments`），避免全局冲突。
- 若新增 Valaxy 插件/配置，务必通过 `themePlugin` 返回 Vite 配置（保持与现有 alias/safelist 兼容）。
- 发布：`apps/valaxy-theme-shokax` 使用 `ci:publish`（`bun workspaces foreach --recursive -- bun publish --access public --no-git-checks`）；`nyx-player`/`shokax-uikit` 默认 npm registry，确认版本/导出字段。

## 常用路径索引
- 根脚本：`package.json`、`turbo.json`。
- Valaxy 主题：`apps/valaxy-theme-shokax/theme/`（配置、组件、样式）、`demo/`（示例站点）。
- Nyx Player：`packages/nyx-player/src/**`，E2E `tests/e2e`。
- UI Kit：`packages/shokax-uikit/src/**`（components/composables/styles/entries）。
- Toolkit：`packages/shokax-toolkit-lib/src/**`。

如有不清晰或缺漏的部分，请告知，我会补充或调整。