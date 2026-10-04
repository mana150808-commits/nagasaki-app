# Nagasaki Trip / 長崎観光アプリ

長崎を訪れる外国人観光客向けのモバイルアプリ。ホテル（ドーミーイン長崎新地中華街）の
宿泊客にQRコードで配ることを想定しています。

React + Vite + Tailwind CSS + react-router-dom で構築した **PWA**（スマホのホーム画面に
追加すると全画面アプリとして起動できます）。

## 公開URL

**https://nagasaki-app.pages.dev**

- Cloudflare Pages で公開中。HTTPSなので現在地機能も動作します。
- 公開は手元から `npm run build` → `npx wrangler pages deploy dist --project-name nagasaki-app`。
  GitHubへのpushだけでは反映されません（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)
  を用意済みですが、GitHub側のシークレット未設定のため現在は無効）。
- 検索エンジンには載らないよう `noindex` を設定しています（[public/_headers](public/_headers)）。
  QRコードを配布する段階で外します。

## 主な機能

- **ホテルからの徒歩分数**：ドーミーイン長崎新地中華街を基準に、各店までの徒歩時間を表示。
  地図には3分・6分・10分の徒歩圏リングを描画します（[src/walkRings.js](src/walkRings.js)）。
- **実地図**：MapLibre GL ＋ OpenFreeMap（APIキー不要）。店舗ピン・現在地・ズーム・
  言語切替を搭載し、拡大すると店名ラベルが出ます。
- **5言語対応**：英語 / 简体字 / 繁體字 / 한국어 / 日本語。店舗・料理の説明文も切り替わります。
- **お気に入り**：店舗ページのハートで保存し、Savedタブや地図の絞り込みから探せます。
- **営業時間**：店舗ページのボタンで日〜土の一覧を開きます。今日の曜日を強調表示。
- **アンケート**：5段階評価＋自由記述。回答はGoogleスプレッドシートに集約します。
- **利用者カウント**：1端末につき1回だけ記録を送信します。
- **ホーム画面への追加案内**：iPhone / Android それぞれの手順を表示します。

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

アンケート・利用者カウントの送信先は `.env.local` に設定します（gitignore済み）。

```
VITE_SURVEY_URL=https://script.google.com/macros/s/.../exec
```

### スマホで確認する場合

同一 Wi-Fi 内のスマホから見るには、ネットワークに公開して起動します。

```bash
npm run dev -- --host
```

表示された `http://<PCのIP>:5173` をスマホのブラウザで開きます。
なお、localhost やローカルIPからのアクセスは利用者カウントに含めません。

## 画面

ホームが「Map / List / Saved / Feedback」の4タブを兼ねる構成です。

| ルート | 画面 | 内容 |
| --- | --- | --- |
| `/` | Home | 4タブ（地図・一覧・お気に入り・アンケート）。カテゴリー絞り込みと言語切替 |
| `/shop/:shopId` | Shop | 外観写真、紹介文、住所、地図アプリへの経路、営業時間、おすすめメニュー |
| `/shop/:shopId/menu/:menuId` | Menu | 料理の写真・価格・説明 |
| `/survey` | Survey | アンケート（ホームのFeedbackタブと同じフォーム） |
| `/map`, `/welcome` | — | `/` へ転送（旧デザインのルートの互換用） |

## 起動演出

アプリを読み込んだときに一度だけ再生します（アプリ内でホームに戻ったときは再生しません）。

1. 夜景の灯りが順に点る
2. 画面中央に「DISCOVER NAGASAKI」が現れて消える
3. ヘッダー → カテゴリー → 地図 → タブバーの順に現れる

端末設定で「視差効果を減らす」が有効な場合は再生しません。

## 掲載店舗（25軒）

| ID | 店名 | 日本語名 | カテゴリ | エリア |
| --- | --- | --- | --- | --- |
| `asa` | ASA Kisaburo | 亜紗 喜三郎 | Izakaya | 銅座町 |
| `irish-pub` | Irish Pub Nagasaki | | Bar | 長崎駅周辺 |
| `base` | cafe＆bar BASE | | Cafe | 思案橋周辺 |
| `iwi` | BAR IWI | | Bar | 思案橋 |
| `pure` | Nagasaki Wagyu Yakiniku Pure | | Yakiniku | 新地中華街周辺 |
| `kamadojyaya` | Kamadojyaya | | Izakaya | 思案橋 |
| `tito-dragon` | Darts Cafe TiTO Dragon | | Bar | 思案橋 |
| `shunsai-nagaya` | Shunsai Nagaya | | Izakaya | 思案橋・銅座周辺 |
| `kozanro` | Kozanro | 江山楼 | Chinese | 新地町 |
| `kairakuen` | Kairakuen | 会楽園 | Chinese | 新地町 |
| `kyokaen` | Kyokaen | 京香園 | Chinese | 新地町 |
| `laolee` | Lao Lee | 老李 | Chinese | 新地町 |
| `fukuju` | Fukuju | 中華料理 福寿 | Chinese | 新地町 |
| `shianbashi-ramen` | Shianbashi Ramen | 思案橋ラーメン | Ramen | 思案橋 |
| `tsuruchan` | Tsuruchan | ツル茶ん | Cafe | 思案橋周辺 |
| `shippoku-hamakatsu` | Nagasaki Shippoku Hamakatsu | 長崎卓袱浜勝 | Japanese | 思案橋・銅座周辺 |
| `yossou` | Yossou | 吉宗 | Japanese | 思案橋周辺 |
| `osakaya-hamamachi` | Osakaya Hamamachi | 大阪屋 浜町店 | Yakiniku | 思案橋 |
| `kadoya` | Kadoya | かどや | Ramen | 思案橋 |
| `kaniya-doza` | Kaniya | かにや | Japanese | 銅座町 |
| `yakitori-ren` | Yakitori Ren | 焼鳥 蓮 | Izakaya | 銅座町 |
| `hiiragi-ramen` | Ramen Hiiragi | らーめん柊 | Ramen | 銅座町 |
| `dashibonz` | Dashi Bonz | だしぼんず | Izakaya | 思案橋周辺 |
| `sushi-kozo` | Sushi Kozo | 鮨 幸三 | Sushi | 銅座町 |
| `koda-shokudo` | Koda Shokudo | 甲田食堂 | Japanese | 銅座町 |

### 店舗を追加するには

1. [`src/data/shops.js`](src/data/shops.js) に1オブジェクト追加します。
   座標は住所から国土地理院の住所検索APIで取得します（概算値は使わない）。

   ```bash
   curl "https://msearch.gsi.go.jp/address-search/AddressSearch?q=長崎県長崎市新地町13-13"
   ```

2. `public/shops/<店舗ID>/` に `exterior.jpg`（外観）と `menu1〜5.jpg`（料理）を置きます。
   **1枚あたり1400px・400KB程度まで**に収めてください（表示が遅くなるため）。
3. `category` を新しい種類にすると、地図の凡例にも自動で追加されます。

## アンケート・利用者数

回答と利用記録は、Apps Script 経由で Google スプレッドシートに追記されます。

| シート | 内容 |
| --- | --- |
| 回答 | 日時 / 評価 / コメント |
| 利用者 | 日時 / 端末 / 表示 / きっかけ / 言語 / 端末ID / ドメイン |

- 利用者は **1端末につき1回だけ**記録されるため、行数がそのまま利用者数になります。
- QRコードのURLに `?src=front` のように付けると「きっかけ」列で掲示場所を判別できます。
- 個人を特定する情報は送っていません。実装は
  [`src/services/submitSurvey.js`](src/services/submitSurvey.js) と
  [`src/services/trackVisit.js`](src/services/trackVisit.js)。

## 主要ディレクトリ

```
src/
  components/
    MapView.jsx           # MapLibre GL の実地図・店舗ピン・徒歩リング・言語切替
    NightView.jsx         # 背景の夜景イラスト
    FavoriteButton.jsx    # お気に入りの登録／解除
    OpeningHours.jsx      # 営業時間（日〜土、押すと開く）
    MenuNote.jsx          # 「メニューと価格は時期によって変わる」注記
    InstallPrompt.jsx     # ホーム画面への追加案内
    ShopImage.jsx         # 写真表示（無いときはプレースホルダー）
    SurveyForm.jsx        # 星評価＋自由記述＋送信
    icons/NagasakiIcons.jsx
  pages/
    Home.jsx              # 4タブのシェル（Map / List / Saved / Feedback）
    ShopPage.jsx  MenuPage.jsx  SurveyPage.jsx
  data/
    shops.js              # 店舗・メニュー情報（住所・営業時間・5言語のテキスト）
  services/
    submitSurvey.js       # アンケート送信
    trackVisit.js         # 利用者カウント
  walkRings.js            # ホテル座標・徒歩分数・営業ステータス
  walkRingsText.js        # 新デザインの文言・カテゴリー定義
  favorites.js            # お気に入り（localStorage）
  mapState.js             # 直前に開いた店（戻ったとき地図をその位置に）
  LanguageContext.jsx     # 言語切替の共有状態
  introState.js           # 起動演出の再生判定
public/
  shops/<店舗ID>/         # 外観・料理の写真
  icons/                  # PWA 用アイコン（192 / 512）
  _headers, _redirects    # Cloudflare Pages 用（noindex / SPAのルーティング）
```

## デザイン

「Organic」デザインシステム（ベージュ `#f5ead8` ＋テラコッタ `#c67139`）と、
夜景の背景を組み合わせています。旧デザインの配色（ネイビー・朱）も
アンケート画面などで引き続き使用しています。定義は
[tailwind.config.js](tailwind.config.js)。

## 運用上の注意

- 掲載内容は実在する店舗の情報です。**営業時間・価格は変わりやすいため、定期的に確認してください。**
- 説明文の翻訳はAIによる下訳を含みます。公開範囲を広げる前にネイティブ話者の確認を推奨します。
- 写真はサイズが大きいと表示が遅くなります。追加時は縮小してからコミットしてください。
