import { useParams, useNavigate, Link } from 'react-router-dom'
import { getShopById, shopImageUrl } from '../data/shops.js'
import ShopImage from '../components/ShopImage.jsx'
import OpeningHours from '../components/OpeningHours.jsx'
import { useLanguage, pickText } from '../LanguageContext.jsx'

// お店の詳細ページ。
// ルート /shop/:shopId の id を受け、shops データから該当店を描画する。
// 構成：上=外観 / 中=説明 / 下=代表メニュー写真(3〜5枚)。
// マップ実装には依存しない（マップを差し替えてもこのページは不変）。
// 説明文は、マップで選んだ言語（LanguageContext）に連動して切り替わる。
export default function ShopPage() {
  const { shopId } = useParams()
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const shop = getShopById(shopId)

  // 該当店が無い場合
  if (!shop) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display text-3xl text-navy">Shop not found</p>
        <p className="text-sm text-ink/60">This shop doesn’t exist yet.</p>
        <button
          type="button"
          onClick={() => navigate('/map')}
          className="press rounded-full bg-vermilion px-5 py-2 font-semibold text-white shadow-hand"
        >
          ← Back to map
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

      {/* 上：外観バナー */}
      <div className="relative">
        <ShopImage
          src={shopImageUrl(shop, shop.exterior)}
          variant="exterior"
          label={`${shop.name} — storefront`}
          alt={`${shop.name} storefront`}
          className="h-56 w-full sm:h-64"
        />
        {/* 下部を少し暗くして店名を読みやすく */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />

        <div className="absolute bottom-3 left-5 right-5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          <h1 className="font-display text-4xl leading-none">
            {shop.name}
            <span className="ml-2 align-middle text-2xl font-normal">{shop.nameJa}</span>
          </h1>
        </div>
      </div>

      {/* 中：説明 */}
      <section className="px-5 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {shop.category} · {shop.area}
        </p>
        <p className="mt-1 text-sm text-ink/50">{shop.areaJa}</p>
        <p className="mt-4 leading-relaxed text-ink/90">{pickText(shop.description, lang)}</p>

        {/* 住所（日本語のまま。タクシーや店員に見せて使えるようにするため翻訳しない） */}
        {shop.address && <p className="mt-4 text-sm text-ink/70">{shop.address}</p>}

        {/* 営業時間（ボタンを押すと日〜土の一覧が開く） */}
        <OpeningHours hours={shop.hours} />
      </section>

      {/* 下：代表メニュー（写真3〜5枚） */}
      <section className="px-5 pt-8">
        <h2 className="mb-1 font-display text-2xl text-navy">
          Menu <span className="text-base font-normal text-ink/50">Recommended</span>
        </h2>
        {/* メニュー写真がイメージ画である旨（設定した店舗のみ） */}
        {shop.menuImageNote && (
          <p className="mb-3 text-xs italic text-ink/45">* {shop.menuImageNote}</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {shop.menu.map((m, i) => (
            <Link
              key={m.id ?? i}
              to={`/shop/${shop.id}/menu/${m.id}`}
              className="press block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-hand transition-shadow hover:shadow-handlg"
            >
              <ShopImage
                src={shopImageUrl(shop, m.img)}
                variant="menu"
                label={m.name}
                alt={m.name}
                className="aspect-square w-full"
              />
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-ink/80">{m.name}</p>
                {m.price && <p className="text-xs font-semibold text-vermilion">{m.price}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
