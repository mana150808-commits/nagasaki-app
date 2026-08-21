# Nagasaki Trip / 長崎観光アプリ

長崎を訪れる外国人観光客向けのモバイルアプリ（プロトタイプ）。
React + Vite + Tailwind CSS + react-router-dom で構築した **PWA**（スマホのホーム画面に
追加すると全画面アプリとして起動できます）。

## セットアップ

```bash
cd nagasaki-app
npm install
npm run dev      # 開発サーバー: http://localhost:5173
```

その他:

```bash
npm run build    # 本番ビルド（PWA の Service Worker / manifest を生成）
npm run preview  # 本番ビルドをローカル確認
```

### スマホで確認する場合

同一 Wi-Fi 内のスマホから見るには、ネットワークに公開して起動します:

```bash
npm run dev -- --host
```

表示された `http://<PCのIP>:5173` をスマホのブラウザで開き、
「ホーム画面に追加」でアプリとしてインストールできます。

## 画面

| ルート | 画面 | 内容 |
| --- | --- | --- |
| `/` | Home | MAPカード（大）＋アンケートカード（小） |
| `/map` | Map | 長崎市の仮マップ（手描き風SVG。後で実地図に差し替え可能） |
| `/survey` | Survey | 5段階評価（星）＋自由記述＋送信 → お礼メッセージ |
| `/admin-results` | 🔒 開発者専用 | アンケート結果の一覧（**隠しルート**） |

## アンケート結果について（開発者向け）

- 回答は端末の **localStorage** に保存されます（バックエンドなし）。
- 開発者は URL 直打ちで **`/admin-results`** を開くと回答一覧を閲覧できます。
  アプリ内のどのUIからもこのページへのリンクは張っていません。
- 送信処理は [`src/services/submitSurvey.js`](src/services/submitSurvey.js) に分離済み。
  将来バックエンドに接続する際は、この関数の中身を `fetch(...)` に差し替えるだけで済みます。

## 主要ディレクトリ

```
src/
  components/
    HomeCard.jsx          # ホームのカード型ボタン（大/小）
    MapView.jsx           # 仮マップ（★ここを実地図に差し替える）
    SurveyForm.jsx        # 星評価＋自由記述＋送信
    BackButton.jsx        # 「戻る」ボタン
    icons/NagasakiIcons.jsx  # 教会・路面電車・港・坂道・ランタン等の手描き風SVG
  pages/
    Home.jsx  MapPage.jsx  SurveyPage.jsx  AdminResults.jsx
  services/
    submitSurvey.js       # 送信処理（console出力＋localStorage）
```

## デザイン

「長崎らしさ・手作り感」を最優先。手書き風フォント（Patrick Hand / Yomogi 等）、
紙テクスチャ背景、少し歪んだ手描き風の枠、長崎モチーフ（教会・路面電車・港・坂・ランタン）の
自作SVGアイコンで構成しています。配色はネイビー・テラコッタ・生成り色・差し色の朱／緑。
