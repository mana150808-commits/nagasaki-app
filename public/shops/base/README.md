# cafe＆bar BASE の写真をここに入れてください

このフォルダ = `public/shops/base/`
（`src/data/shops.js` の `id: 'base'`, `photoBase: '/shops/base'` に対応）

## 入れるファイル（名前は完全一致で）
- `exterior.jpg` … お店の外観（ページ上部のバナー）
- `menu1.jpg` … Signature BASE Burger
- `menu2.jpg` … Berry French Toast
- `menu3.jpg` … Tomato Sauce Hamburger Doria
- `menu4.jpg` … Design Latte

## メモ
- `.png` を使う場合は、ファイルを `.jpg` にリネームするか、
  `src/data/shops.js` の該当ファイル名（`'exterior.jpg'` など）を `'exterior.png'` に変更。
- 置いたら `npm run dev` のページをリロードすると、プレースホルダー枠が実写真に切り替わります。
- 写真が無い間は、テーマに合ったプレースホルダー枠が表示されます。
