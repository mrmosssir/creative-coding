# Creative Coding

一個專注於創意編程的現代化 Web 平台，探索程式設計與藝術的無限可能。

## 🚀 技術堆疊

- **框架**: [SvelteKit](https://kit.svelte.dev/) 2.x
- **語言**: TypeScript
- **樣式**: [Tailwind CSS](https://tailwindcss.com/) v4
- **建置工具**: [Vite](https://vitejs.dev/) 7.x
- **包管理器**: pnpm
- **代碼品質**: ESLint + Prettier
- **測試**: Vitest

## 🎨 特色功能

- ✨ **現代化設計**: 使用 Tailwind CSS v4 構建的響應式界面
- 📱 **響應式布局**: 完美適配桌面和移動設備
- 🌙 **深色主題**: 優雅的深色主題設計
- ⚡ **高效能**: 基於 SvelteKit 的快速載入和導航
- 🔧 **可擴展**: 模組化組件架構
- 📋 **側邊欄導航**: 智能響應式側邊欄系統
- 🎮 **互動展示**: 包含 Conway's Game of Life 等互動演示

## 🛠️ 開發環境設置

### 前置需求

- Node.js 18+
- pnpm (推薦) 或 npm

### 安裝步驟

1. **克隆專案**

   ```bash
   git clone https://github.com/mrmosssir/creative-coding.git
   cd creative-coding
   ```

2. **安裝依賴**

   ```bash
   pnpm install
   ```

3. **啟動開發伺服器**

   ```bash
   pnpm dev
   ```

4. **開啟瀏覽器**
   ```
   http://localhost:5173
   ```

## 📜 可用指令

| 指令               | 功能描述             |
| ------------------ | -------------------- |
| `pnpm dev`         | 啟動開發伺服器       |
| `pnpm build`       | 建置生產版本         |
| `pnpm preview`     | 預覽生產版本         |
| `pnpm check`       | TypeScript 類型檢查  |
| `pnpm check:watch` | 監聽模式下的類型檢查 |
| `pnpm format`      | 代碼格式化           |
| `pnpm lint`        | 代碼檢查             |
| `pnpm test`        | 執行測試             |

## 🏗️ 專案結構

```
src/
├── app.css              # Tailwind CSS 主要樣式檔案
├── app.d.ts             # TypeScript 型別聲明
├── app.html             # HTML 模板
├── lib/
│   ├── components/      # 可重用組件
│   │   └── Sidebar.svelte  # 側邊欄組件
│   └── assets/          # 靜態資源
│       ├── favicon.svg  # 網站圖標
│       └── logo.png     # Logo 圖片
├── routes/
│   ├── +layout.svelte   # 全域布局
│   ├── +page.svelte     # 首頁
│   └── conways-game-of-life/  # Conway's Game of Life 演示
└── static/              # 靜態檔案
```

## 🎯 設計特點

### 響應式設計

- **桌面版 (≥768px)**: 固定側邊欄 + 主要內容區域
- **移動版 (<768px)**: 隱藏式側邊欄 + 漢堡選單，高度為 72px 的頂部導航欄

### 顏色系統

使用 CSS 變數定義的深色主題：

- `--color-primary`: 主背景色 (#1b1b1f)
- `--color-secondary`: 次要背景色 (#161618)
- `--color-primary-text`: 主文字色 (#dfdfd6)
- `--color-link-text`: 連結文字色 (#98989f)
- `--color-link-active-text`: 活躍連結色 (#a8b1ff)
- `--color-border`: 邊框色 (#dfdfd6)

## 🚀 部署

### 建置生產版本

```bash
pnpm build
```

### 靜態網站部署

專案支援靜態網站生成，可以部署到：

- Vercel
- Netlify
- GitHub Pages
- 任何靜態檔案託管服務

## 🤝 貢獻指南

1. Fork 此專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 開發注意事項

- 使用 Tailwind CSS v4 的新語法 (`@import 'tailwindcss'`)
- 自定義主題通過 `@theme` 指令定義
- 組件使用 Svelte 5 的新語法 (`$props`, `$state`)
- 確保所有組件都有適當的 TypeScript 型別
- 側邊欄組件採用可重用設計，通過 props 控制顯示狀態
- 響應式設計基於 Tailwind 的 `md:` 和其他斷點

## 📝 更新日誌

### v0.0.1 (2025-10-29)

- 🎉 初始版本發布
- ✨ 實現 SvelteKit + Tailwind CSS v4 整合
- 📱 完成響應式設計
- 🌙 實現深色主題
- 🧭 完成側邊欄導航系統
- 🎮 添加 Conway's Game of Life 互動演示
- 🔧 建立可重用的 Sidebar 組件

## 📞 聯絡方式

如有任何問題或建議，歡迎：

- 開啟 [Issue](https://github.com/mrmosssir/creative-coding/issues)
- 提交 [Pull Request](https://github.com/mrmosssir/creative-coding/pulls)

---

**Creative Coding** - 用程式碼創造藝術 ✨
