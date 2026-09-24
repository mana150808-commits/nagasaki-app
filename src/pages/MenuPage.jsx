import { useParams, useNavigate } from 'react-router-dom'
import { getShopById, getMenuItem, shopImageUrl } from '../data/shops.js'
import ShopImage from '../components/ShopImage.jsx'
import { useLanguage, pickText } from '../LanguageContext.jsx'

// 料理の詳細ページ。
// ルート /shop/:shopId/menu/:menuId の id を受け、店舗→メニュー項目を取得して描画。
// 構成：上=料理写真（店舗ページと同じ画像）／下=料理名・日本語名/ローマ字・価格・説明。
// 価格・日本語名などは存在する時だけ表示（未入力のデータでも壊れない）。
// 説明文は、マップで選んだ言語（LanguageContext）に連動して切り替わる。
export default function MenuPage() {
  const { shopId, menuId } = useParams()
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const shop = getShopById(shopId)
  const item = getMenuItem(shop, menuId)

  // 該当データが無い場合
  if (!shop || !item) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display text-3xl text-navy">Dish not found</p>
        <p className="text-sm text-ink/60">This menu item doesn’t exist.</p>
        <button
          type="button"
          onClick={() => navigate(shop ? `/shop/${shop.id}` : '/map')}
          className="press rounded-full bg-vermilion px-5 py-2 font-semibold text-white shadow-hand"
        >
          ← Back
        </button>
      </main>
    )
  }

  return (
    <main className="page-enter min-h-dvh bg-[#f5f3ee] pb-12">
      {/* 戻るボタン（写真の上に重ならないよう帯で配置） */}
      <div className="px-4 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="press inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 font-display text-lg text-navy shadow-hand"
        >
          <span aria-hidden="true">←</span> Back
        </button>
      </div>

      {/* 上：料理写真 */}
      <div className="relative">
        <ShopImage
          src={shopImageUrl(shop, item.img)}
          variant="menu"
          label={item.name}
          alt={item.name}
          className="aspect-[4/3] w-full"
        />
      </div>

      {/* メニュー写真がイメージ画である旨（設定した店舗のみ） */}
      {shop.menuImageNote && (
        <p className="px-5 pt-2 text-xs italic text-ink/45">* {shop.menuImageNote}</p>
      )}

      {/* 下：料理の情報 */}
      <section className="px-5 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {shop.name} · Menu
        </p>

        <h1 className="mt-1 font-display text-3xl leading-tight text-navy">{item.name}</h1>

        {/* 日本語名 / ローマ字（あるときだけ） */}
        {(item.nameJa || item.romaji) && (
          <p className="mt-1 text-ink/60">
            {item.nameJa}
            {item.nameJa && item.romaji && <span className="text-ink/40"> / </span>}
            {item.romaji && <span className="italic">{item.romaji}</span>}
          </p>
        )}

        {/* 価格（あるときだけ） */}
        {item.price && (
          <p className="mt-3 inline-block rounded-full bg-vermilion/10 px-3 py-1 font-display text-2xl text-vermilion">
            {item.price}
          </p>
        )}

        {/* 説明 */}
        {item.description && (
          <p className="mt-4 leading-relaxed text-ink/90">{pickText(item.description, lang)}</p>
        )}
      </section>
    </main>
  )
}
