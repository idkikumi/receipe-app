# れしぴくん

指定した食材を使ったおいしいレシピをAIが提案するWebアプリケーションです。

## 機能

- 食材を選択してレシピを生成
- よく使う食材のクイック選択
- カスタム食材の追加
- 前菜・主菜のカテゴリー選択
- AIによる3つのレシピ提案

## 技術スタック

- React 18
- TypeScript
- Vite
- Tailwind CSS (CDN)
- lucide-react (アイコン)

## ローカルでの実行方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてアプリケーションにアクセスできます。

### 3. ビルド

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### 4. プレビュー

```bash
npm run preview
```

## Cloudflare Pagesへのデプロイ方法

### 方法1: Gitリポジトリ経由（推奨）

1. プロジェクトをGitリポジトリにプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repository-url>
git push -u origin main
```

2. Cloudflare Pagesにログイン
   - https://dash.cloudflare.com/ にアクセス
   - Pages セクションに移動

3. 新しいプロジェクトを作成
   - "Create a project" をクリック
   - Gitリポジトリを接続

4. ビルド設定

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

5. デプロイを開始
   - "Save and Deploy" をクリック
   - 数分後に自動的にデプロイされます

### 方法2: Wranglerを使用した直接デプロイ

1. Wranglerのインストール

```bash
npm install -g wrangler
```

2. Cloudflareにログイン

```bash
wrangler login
```

3. ビルド

```bash
npm run build
```

4. デプロイ

```bash
wrangler pages deploy dist --project-name=receipe-app
```

## カスタマイズ

### 食材リストの編集

`src/App.tsx` の `commonIngredients` 配列を編集して、表示される食材を変更できます。

### スタイルの変更

Tailwind CSSのクラスを使用してスタイルをカスタマイズできます。

## 注意事項

このアプリケーションは `window.claude.complete()` を使用してAIレシピを生成します。
実際に動作させるには、適切なClaude APIの統合が必要です。

## ライセンス

MIT
