# 店舗写真の置き場所

このフォルダ（`public/shops/`）に、お店ごとのサブフォルダを作って写真を入れます。

## ルール
- フォルダ名 = そのお店の `id`（`src/data/shops.js` で定義した id）
- 例：`id: 'asa'` のお店 → `public/shops/asa/` に写真を入れる
- `public/` の中身はサイトの `/`（ルート）に公開されるので、
  `public/shops/asa/exterior.jpg` は アプリ内で `/shops/asa/exterior.jpg` として読み込まれます。

## 各お店に入れるファイル
`src/data/shops.js` の各店舗の設定に合わせます。

- `exterior`（外観） … 例: `exterior.jpg`
- `menu[].img`（メニュー各写真） … 例: `menu1.jpg`, `menu2.jpg`, ...

ファイル名・拡張子は `shops.js` の値と**完全一致**させてください
（違う名前にしたい場合は `shops.js` 側の値を書き換える）。

## 新しいお店を追加する手順
1. `src/data/shops.js` の `shops` 配列に1件追加（`id`, `name`, `map.x/y`, `menu` など）
2. `public/shops/<そのid>/` フォルダを作る
3. その中に `exterior.jpg` とメニュー写真を入れる

写真をまだ置いていない場合は、自動でプレースホルダー枠が表示されます。
