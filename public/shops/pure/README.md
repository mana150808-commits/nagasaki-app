# Nagasaki Wagyu Yakiniku Pure の写真をここに入れてください

このフォルダ = `public/shops/pure/`
（`src/data/shops.js` の `id: 'pure'`, `photoBase: '/shops/pure'` に対応）

## 入れるファイル（名前は完全一致で）
- `exterior.jpg` … お店の外観（ページ上部のバナー）
- `menu1.jpg` … Premium Nagasaki Wagyu Assortment
- `menu2.jpg` … Thick-Cut Karubi
- `menu3.jpg` … Cold Noodles
- `menu4.jpg` … Nagasaki Local Sake

## メモ
- `.png` を使う場合は、ファイルを `.jpg` にリネームするか、
  `src/data/shops.js` の該当ファイル名を `'...png'` に変更。
- 置いたら `npm run dev` のページをリロードすると、プレースホルダー枠が写真に切り替わります。
- 写真が無い間は、テーマに合ったプレースホルダー枠が表示されます。
