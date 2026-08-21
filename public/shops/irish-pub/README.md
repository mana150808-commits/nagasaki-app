# Irish Pub Nagasaki の写真をここに入れてください

このフォルダ = `public/shops/irish-pub/`
（`src/data/shops.js` の `id: 'irish-pub'`, `photoBase: '/shops/irish-pub'` に対応）

## 入れるファイル（名前は完全一致で）
- `exterior.jpg` … お店の外観（ページ上部のバナー）
- `menu1.jpg` … Guinness Draught
- `menu2.jpg` … Fish & Chips
- `menu3.jpg` … Shepherd's Pie
- `menu4.jpg` … Nagasaki Pickles

## メモ
- `.png` を使う場合は、ファイルを `.jpg` にリネームするか、
  `src/data/shops.js` の該当ファイル名（`'exterior.jpg'` など）を `'exterior.png'` に変更。
- 置いたら `npm run dev` のページをリロードすると、プレースホルダー枠が実写真に切り替わります。
- 写真が無い間は、テーマに合ったプレースホルダー枠が表示されます。
