# Nagasaki Trip / 長崎観光アプリ

長崎を訪れる外国人観光客向けのモバイルアプリ（プロトタイプ）。
React + Vite + Tailwind CSS + react-router-dom で構築した **PWA**（スマホのホーム画面に
追加すると全画面アプリとして起動できます）。

実地図（MapLibre GL）上の飲食店ピンから店舗ページ・料理ページへ進める構成で、
店舗と料理の説明文は **5言語**（英語 / 简体字 / 繁體字 / 한국어 / 日本語）に対応しています。

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
| `/` | Home | 夜景イラスト＋City Map のプレビュー、Feedback ボタン |
| `/map` | Map | MapLibre GL による長崎市の実地図。店舗ピン・現在地・言語切替 |
| `/shop/:shopId` | Shop | 店舗の外観写真、紹介文、おすすめメニュー一覧 |
| `/shop/:shopId/menu/:menuId` | Menu | 料理の写真と説明 |
| `/survey` | Survey | 5段階評価（星）＋自由記述＋送信 → お礼メッセージ |
| `/admin-results` | 🔒 開発者専用 | アンケート結果の一覧（**隠しルート**） |

## 地図

- [MapLibre GL JS](https://maplibre.org/) ＋ [OpenFreeMap](https://openfreemap.org/) の
  `positron` スタイルを使用（APIキー不要）。
- 現在地表示（GeolocateControl）とズーム操作（NavigationControl）を搭載。
- 掲載店舗のピンをタップすると、その店舗ページへ遷移します。

## 多言語対応

- 対応言語は英語 / 简体字 / 繁體字 / 한국어 / 日本語の5つ。
- 地図画面の言語切替で選んだ言語が、店舗ページ・料理ページの説明文にも反映されます。
- 選択内容は localStorage（`nagasaki_app_lang`）に保存され、次回起動時も維持されます。
- 実装は [`src/LanguageContext.jsx`](src/LanguageContext.jsx)。テキストは
  [`src/data/shops.js`](src/data/shops.js) に `{ en, zhCN, zhTW, ko, ja }` の形で持たせています。

## 掲載店舗（8軒）

| ID | 店名 | カテゴリ | エリア |
| --- | --- | --- | --- |
| `asa` | ASA Kisaburo | Izakaya | 銅座町 |
| `irish-pub` | Irish Pub Nagasaki | Bar | 長崎駅近く |
| `base` | cafe＆bar BASE | Cafe & Bar | 思案橋近く |
| `iwi` | BAR IWI | Bar | 思案橋 |
| `pure` | Nagasaki Wagyu Yakiniku Pure | Yakiniku | 新地中華街近く |
| `kamadojyaya` | Kamadojyaya | Izakaya | 思案橋 |
| `tito-dragon` | Darts Cafe TiTO Dragon | Bar | 思案橋 |
| `shunsai-nagaya` | Shunsai Nagaya | Izakaya | 思案橋・銅座近く |

写真は `public/shops/<店舗ID>/` に `exterior.jpg`（外観）と `menu1〜4.jpg`（料理）を配置しています。

## アンケート結果について（開発者向け）

- 回答は端末の **localStorage** に保存されます（バックエンドなし）。
- そのため回答は回答者の端末内にのみ残り、**複数端末の結果を集計することはできません**。
  公開して運用する場合は、送信先をサーバーやスプレッドシートに変更する必要があります。
- 開発者は URL 直打ちで **`/admin-results`** を開くと、その端末の回答一覧を閲覧できます。
  アプリ内のどのUIからもこのページへのリンクは張っていません。
- 送信処理は [`src/services/submitSurvey.js`](src/services/submitSurvey.js) に分離済み。
  バックエンドに接続する際は、この関数の中身を `fetch(...)` に差し替えるだけで済みます。

## 主要ディレクトリ

```
src/
  components/
    MapView.jsx           # MapLibre GL の実地図・店舗ピン・言語切替
    NightView.jsx         # ホームの夜景イラスト
    ChinatownScene.jsx    # アンケート画面の背景イラスト
    HomeCard.jsx          # ホームのカード型ボタン（大/小）
    ShopImage.jsx         # 店舗・料理写真の表示
    SurveyForm.jsx        # 星評価＋自由記述＋送信
    BackButton.jsx        # 「戻る」ボタン
    icons/NagasakiIcons.jsx  # 教会・路面電車・港・坂道・ランタン等の手描き風SVG
  pages/
    Home.jsx  MapPage.jsx  ShopPage.jsx  MenuPage.jsx  SurveyPage.jsx  AdminResults.jsx
  data/
    shops.js              # 店舗・メニュー情報（5言語のテキストを含む）
  services/
    submitSurvey.js       # 送信処理（console出力＋localStorage）
  LanguageContext.jsx     # 言語切替の共有状態
  introState.js           # 初回のイントロ演出の表示管理
public/
  shops/<店舗ID>/         # 外観・料理の写真
  icons/                  # PWA 用アイコン（192 / 512）
```

## デザイン

「長崎らしさ・手作り感」を最優先。手書き風フォント（Patrick Hand / Yomogi 等）、
紙テクスチャ背景、少し歪んだ手描き風の枠、長崎モチーフ（教会・路面電車・港・坂・ランタン）の
自作SVGアイコンで構成しています。配色はネイビー・テラコッタ・生成り色・差し色の朱／緑。
