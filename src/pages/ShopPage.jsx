import { useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { setLastShopId } from '../mapState.js'
import { getShopById, shopImageUrl } from '../data/shops.js'
import ShopImage from '../components/ShopImage.jsx'
import OpeningHours from '../components/OpeningHours.jsx'
import MenuNote from '../components/MenuNote.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import { useLanguage, pickText } from '../LanguageContext.jsx'
import { CATEGORY_LABEL } from '../walkRingsText.js'

const TEXT = {
  back: { en: 'Back', zhCN: '返回', zhTW: '返回', ko: '뒤로', ja: '戻る' },
  backToMap: { en: '← Back to map', zhCN: '← 返回地图', zhTW: '← 返回地圖', ko: '← 지도로 돌아가기', ja: '← マップに戻る' },
  notFoundTitle: { en: 'Shop not found', zhCN: '找不到该店', zhTW: '找不到該店', ko: '가게를 찾을 수 없습니다', ja: 'お店が見つかりません' },
  notFoundBody: {
    en: 'This shop doesn’t exist yet.',
    zhCN: '这家店尚不存在。',
    zhTW: '這家店尚不存在。',
    ko: '아직 등록되지 않은 가게입니다.',
    ja: 'このお店はまだ登録されていません。',
  },
  menu: { en: 'Menu', zhCN: '菜单', zhTW: '菜單', ko: '메뉴', ja: 'メニュー' },
  recommended: { en: 'Recommended', zhCN: '推荐', zhTW: '推薦', ko: '추천', ja: 'おすすめ' },
  gmaps: { en: 'Directions via Google Maps', zhCN: 'Google 地图导航', zhTW: 'Google 地圖導航', ko: '구글 지도로 길찾기', ja: 'Google マップで道順' },
  amaps: { en: 'Directions via Apple Maps', zhCN: 'Apple 地图导航', zhTW: 'Apple 地圖導航', ko: '애플 지도로 길찾기', ja: 'Apple マップで道順' },
}
const tt = (key, lang) => TEXT[key][lang] || TEXT[key].en

// お店の詳細ページ。
// ルート /shop/:shopId の id を受け、shops データから該当店を描画する。
// 構成：上=外観 / 中=説明 / 下=代表メニュー写真(3〜5枚)。
// マップ実装には依存しない（マップを差し替えてもこのページは不変）。
// 店名・カテゴリー・エリア名・説明文・メニュー品目名は、ホーム（マップ）で選んだ
// 言語（LanguageContext）に連動して切り替わる。住所だけは日本語のまま
// （タクシーや店員に見せて使えるようにするため意図的に翻訳しない）。
export default function ShopPage() {
  const { shopId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useLanguage()
  const shop = getShopById(shopId)

  // Backで地図に戻ったとき、この店のピンを中心に表示させるための記録
  useEffect(() => {
    if (shop) setLastShopId(shop.id)
  }, [shop])

  // 該当店が無い場合
  if (!shop) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display text-3xl text-navy">{tt('notFoundTitle', lang)}</p>
        <p className="text-sm text-ink/60">{tt('notFoundBody', lang)}</p>
        <button
          type="button"
          onClick={() => navigate('/map')}
          className="press rounded-full bg-vermilion px-5 py-2 font-semibold text-white shadow-hand"
        >
          {tt('backToMap', lang)}
        </button>
      </main>
    )
  }

  const name = shop.nameI18n?.[lang] || shop.name
  const category = CATEGORY_LABEL[shop.category]?.[lang] || shop.category
  const area = shop.areaI18n?.[lang] || shop.area

  return (
    <main className="page-enter min-h-dvh bg-[#f5f3ee] pb-12">
      {/* 戻るボタン（写真の上に重ならないよう帯で配置）とお気に入りボタン */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          type="button"
          // 直前の画面（ホームまたはマップ）へ戻る。
          // QRやリンクでこのページを直接開いた場合は戻る先が無いので、マップへ送る。
          onClick={() => (location.key === 'default' ? navigate('/map') : navigate(-1))}
          aria-label="Back"
          className="press inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 font-display text-lg text-navy shadow-hand"
        >
          <span aria-hidden="true">←</span> {tt('back', lang)}
        </button>

        <FavoriteButton shopId={shop.id} />
      </div>

      {/* 上：外観バナー */}
      <div className="relative">
        <ShopImage
          src={shopImageUrl(shop, shop.exterior)}
          variant="exterior"
          label={`${name} — storefront`}
          alt={`${name} storefront`}
          className="h-56 w-full sm:h-64"
        />
        {/* 下部を少し暗くして店名を読みやすく */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />

        <div className="absolute bottom-3 left-5 right-5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          <h1 className="font-display text-4xl leading-none">
            {name}
            <span className="ml-2 align-middle text-2xl font-normal">{shop.nameJa}</span>
          </h1>
        </div>
      </div>

      {/* 中：説明 */}
      <section className="px-5 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {category} · {area}
        </p>
        <p className="mt-1 text-sm text-ink/50">{shop.areaJa}</p>
        <p className="mt-4 leading-relaxed text-ink/90">{pickText(shop.description, lang)}</p>

        {/* 住所（日本語のまま。タクシーや店員に見せて使えるようにするため翻訳しない） */}
        {shop.address && <p className="mt-4 text-sm text-ink/70">{shop.address}</p>}

        {/* 道順（Googleマップ／Appleマップをそれぞれ別アプリ・タブで開く） */}
        {shop.geo?.lat != null && (
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${shop.geo.lat},${shop.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-hand"
            >
              <span aria-hidden="true">📍</span> {tt('gmaps', lang)}
            </a>
            <a
              href={`https://maps.apple.com/?daddr=${shop.geo.lat},${shop.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-hand"
            >
              <span aria-hidden="true">📍</span> {tt('amaps', lang)}
            </a>
          </div>
        )}

        {/* 営業時間（ボタンを押すと日〜土の一覧が開く） */}
        <OpeningHours hours={shop.hours} />
      </section>

      {/* 下：代表メニュー（写真3〜5枚） */}
      <section className="px-5 pt-8">
        <h2 className="mb-1 font-display text-2xl text-navy">
          {tt('menu', lang)} <span className="text-base font-normal text-ink/50">{tt('recommended', lang)}</span>
        </h2>
        {/* メニュー写真がイメージ画である旨（設定した店舗のみ） */}
        {shop.menuImageNote && (
          <p className="mb-1 text-xs italic text-ink/45">* {shop.menuImageNote}</p>
        )}
        {/* メニュー・価格は時期によって変わる旨 */}
        <MenuNote className="mb-3" />
        {/* メニュー表（店頭の品書き写真） */}
        {shop.menuBoardImage && (
          <div className="mb-3 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-hand">
            <ShopImage
              src={shopImageUrl(shop, shop.menuBoardImage)}
              variant="menu"
              label={tt('menu', lang)}
              alt={tt('menu', lang)}
              className="aspect-[4/3] w-full"
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          {shop.menu.map((m, i) => {
            const mName = m.nameI18n?.[lang] || m.name
            return (
              <Link
                key={m.id ?? i}
                to={`/shop/${shop.id}/menu/${m.id}`}
                className="press block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-hand transition-shadow hover:shadow-handlg"
              >
                <ShopImage
                  src={shopImageUrl(shop, m.img)}
                  variant="menu"
                  label={mName}
                  alt={mName}
                  className="aspect-square w-full"
                />
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-ink/80">{mName}</p>
                  {m.price && <p className="text-xs font-semibold text-vermilion">{m.price}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
