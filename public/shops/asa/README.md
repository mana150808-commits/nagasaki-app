# 亜紗（Asa）の写真をここに入れてください

このフォルダ = `public/shops/asa/`
（`src/data/shops.js` の `id: 'asa'`, `photoBase: '/shops/asa'` に対応）

## 入れるファイル（名前は完全一致で）
- `exterior.jpg` … お店の外観（ページ上部のバナー）
- `menu1.jpg` … メニュー1（Sashimi platter）
- `menu2.jpg` … メニュー2（Grilled skewers）
- `menu3.jpg` … メニュー3（Champon）
- `menu4.jpg` … メニュー4（Local sake）

## メモ
- `.png` を使いたい場合は、ファイルを `.jpg` にリネームするか、
  `src/data/shops.js` の該当ファイル名（`'exterior.jpg'` など）を `'exterior.png'` に変更。
- 置いたら `npm run dev` のページをリロードすると、プレースホルダー枠が実写真に切り替わります。
- この README は消してもOK（動作には影響しません）。
