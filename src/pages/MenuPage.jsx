import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getShopById, getMenuItem, shopImageUrl } from '../data/shops.js'
import ShopImage from '../components/ShopImage.jsx'
import MenuNote from '../components/MenuNote.jsx'
import { useLanguage, pickText } from '../LanguageContext.jsx'

const TEXT = {
  back: { en: 'Back', zhCN: '返回', zhTW: '返回', ko: '뒤로', ja: '戻る' },
  notFoundTitle: { en: 'Dish not found', zhCN: '找不到该料理', zhTW: '找不到該料理', ko: '메뉴를 찾을 수 없습니다', ja: '料理が見つかりません' },
  notFoundBody: {
    en: 'This menu item doesn’t exist.',
    zhCN: '该菜品不存在。',
    zhTW: '該菜品不存在。',
    ko: '존재하지 않는 메뉴입니다.',
    ja: 'このメニューは存在しません。',
  },
  menu: { en: 'Menu', zhCN: '菜单', zhTW: '菜單', ko: '메뉴', ja: 'メニュー' },
}
const tt = (key, lang) => TEXT[key][lang] || TEXT[key].en

// 料理の詳細ページ。
// ルート /shop/:shopId/menu/:menuId の id を受け、店舗→メニュー項目を取得して描画。
// 構成：上=料理写真（店舗ページと同じ画像）／下=料理名・日本語名/ローマ字・価格・説明。
// 価格・日本語名などは存在する時だけ表示（未入力のデータでも壊れない）。
// 料理名・説明は、マップで選んだ言語（LanguageContext）に連動して切り替わる。
export default function MenuPage() {
  const { shopId, menuId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useLanguage()
  const shop = getShopById(shopId)
  const item = getMenuItem(shop, menuId)

  // 該当データが無い場合
  if (!shop || !item) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display text-3xl text-navy">{tt('notFoundTitle', lang)}</p>
        <p className="text-sm text-ink/60">{tt('notFoundBody', lang)}</p>
        <button
          type="button"
          onClick={() => navigate(shop ? `/shop/${shop.id}` : '/map')}
          className="press rounded-full bg-vermilion px-5 py-2 font-semibold text-white shadow-hand"
        >
          ← {tt('back', lang)}
        </button>
      </main>
    )
  }

  const shopName = shop.nameI18n?.[lang] || shop.name
  const itemName = item.nameI18n?.[lang] || item.name

  return (
    <main className="page-enter min-h-dvh bg-[#f5f3ee] pb-12">
      {/* 戻るボタン（写真の上に重ならないよう帯で配置） */}
      <div className="px-4 pt-4 pb-3">
        <button
          type="button"
          // 通常は履歴を1つ戻る（＝この料理を開いた元の店舗ページ）。
          // 店舗ページへ改めて遷移させると、push では 店舗→料理→店舗 とループになり、
          // replace でも履歴に店舗ページが2つ残ってBackを余計に押すことになるため。
          // QRやリンクでこの料理ページを直接開いた場合だけ、戻り先が無いので店舗ページへ送る。
          onClick={() =>
            location.key === 'default'
              ? navigate(`/shop/${shopId}`, { replace: true })
              : navigate(-1)
          }
          aria-label="Back"
          className="press inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 font-display text-lg text-navy shadow-hand"
        >
          <span aria-hidden="true">←</span> {tt('back', lang)}
        </button>
      </div>

      {/* 上：料理写真 */}
      <div className="relative">
        <ShopImage
          src={shopImageUrl(shop, item.img)}
          variant="menu"
          label={itemName}
          alt={itemName}
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
          {shopName} · {tt('menu', lang)}
        </p>

        <h1 className="mt-1 font-display text-3xl leading-tight text-navy">{itemName}</h1>

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
          <>
            <p className="mt-3 inline-block rounded-full bg-vermilion/10 px-3 py-1 font-display text-2xl text-vermilion">
              {item.price}
            </p>
            {/* メニュー・価格は時期によって変わる旨 */}
            <MenuNote className="mt-1.5" />
          </>
        )}

        {/* 説明 */}
        {item.description && (
          <p className="mt-4 leading-relaxed text-ink/90">{pickText(item.description, lang)}</p>
        )}
      </section>
    </main>
  )
}
