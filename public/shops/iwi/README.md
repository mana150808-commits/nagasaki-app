# BAR IWI の写真をここに入れてください

このフォルダ = `public/shops/iwi/`
（`src/data/shops.js` の `id: 'iwi'`, `photoBase: '/shops/iwi'` に対応）

## 入れるファイル（名前は完全一致で）
- `exterior.jpg` … お店の外観（ページ上部のバナー）
- `menu1.jpg` … Special House Cocktails
- `menu2.jpg` … Standard Spirits & Mixers
- `menu3.jpg` … Domestic & Imported Beers
- `menu4.jpg` … Casual Bar Snacks

## メモ
- この店はメニュー写真を「イメージ画」として扱います（ページに
  「Menu photos are for illustration purposes only.」の注記が表示されます）。
  文言は `src/data/shops.js` の `menuImageNote` で変更できます。
- `.png` を使う場合は、ファイルを `.jpg` にリネームするか、
  `src/data/shops.js` の該当ファイル名を `'...png'` に変更。
- 置いたら `npm run dev` のページをリロードすると、プレースホルダー枠が写真に切り替わります。
