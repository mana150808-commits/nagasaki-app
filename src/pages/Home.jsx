import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MapView from '../components/MapView.jsx'
import ShopImage from '../components/ShopImage.jsx'
import InstallPrompt from '../components/InstallPrompt.jsx'
import NightView from '../components/NightView.jsx'
import { FeedbackIcon } from '../components/icons/NagasakiIcons.jsx'
import SurveyForm from '../components/SurveyForm.jsx'
import { LANGUAGES, useLanguage } from '../LanguageContext.jsx'
import { shops, shopImageUrl } from '../data/shops.js'
import { useFavorites, toggleFavorite } from '../favorites.js'
import { HOTEL, walkMinutes } from '../walkRings.js'
import { getOpenStatus } from '../walkRings.js'
import { t, CATEGORY_KEYS, CATEGORY_LABEL, CATEGORY_COLOR, FAVORITES_FILTER } from '../walkRingsText.js'

// ホーム画面＝「02 Map」「03 List」「06 Saved」の3タブをまとめたシェル。
// 絞り込み（カテゴリー・お気に入り）と選択中の店舗は、3タブ全体で共有する。
export default function Home() {
  const navigate = useNavigate()
  const { lang, setLang } = useLanguage()
  const favorites = useFavorites()
  const [view, setView] = useState('map') // 'map' | 'list' | 'saved' | 'feedback'
  const [category, setCategory] = useState(null) // null=すべて／FAVORITES_FILTER／カテゴリー名
  const [selectedId, setSelectedId] = useState(null)

  const shopsWithWalk = useMemo(
    () =>
      shops
        .filter((s) => s.geo?.lat != null)
        .map((s) => ({
          ...s,
          walk: walkMinutes(HOTEL.lat, HOTEL.lng, s.geo.lat, s.geo.lng),
          status: getOpenStatus(s.hours, lang),
        }))
        .sort((a, b) => a.walk - b.walk),
    [lang],
  )

  const passesCategory = (s) =>
    !category || (category === FAVORITES_FILTER ? favorites.includes(s.id) : s.category === category)
  const filtered = shopsWithWalk.filter(passesCategory)
  const selected = shopsWithWalk.find((s) => s.id === selectedId) || null

  const cycleLang = () => {
    const i = LANGUAGES.findIndex((l) => l.code === lang)
    setLang(LANGUAGES[(i + 1) % LANGUAGES.length].code)
  }

  const openShop = (id) => navigate(`/shop/${id}`)

  // ホテル名はロゴ同様、言語を切り替えても英語表記のまま（エリア名だけ現地語に追従）。
  const placeName = 'Dormy Inn'
  const placeArea = t('place', lang).split('·')[1]?.trim() || ''

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-night font-body text-white">
      {/* 背景：長崎の夜景（フルブリード、今まで通り） */}
      <NightView className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/35 via-night/30 to-night/95" />

      {/* ヘッダー */}
      <div className="relative z-10 px-[22px] pt-[54px]">
        <div className="flex items-center justify-between">
          <div className="leading-none">
            <div className="font-display text-[22px] leading-none tracking-tight text-white">{placeName}</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden="true">
                <path d="M12 2C7.8 2 4.4 5.4 4.4 9.6c0 5.6 6.4 11.6 7.1 12.3a.7.7 0 0 0 1 0c.7-.7 7.1-6.7 7.1-12.3C19.6 5.4 16.2 2 12 2zm0 10.4a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z" />
              </svg>
              {placeArea}
            </div>
          </div>
          <button
            type="button"
            onClick={cycleLang}
            className="press flex h-[34px] items-center rounded-full bg-white/15 px-3 text-[13px] font-bold text-white hover:bg-white/25"
          >
            {LANG_CODE[lang]} ⇄
          </button>
        </div>
      </div>

      {/* カテゴリーチップ */}
      <div className="relative z-10 mt-3 flex gap-1.5 overflow-x-auto px-[22px] pb-1" style={{ scrollbarWidth: 'none' }}>
        <CategoryChip
          active={category === null}
          label={t('all', lang)}
          onClick={() => setCategory(null)}
        />
        {CATEGORY_KEYS.map((c) => (
          <CategoryChip
            key={c}
            active={category === c}
            label={CATEGORY_LABEL[c][lang] || CATEGORY_LABEL[c].en}
            dot={CATEGORY_COLOR[c]}
            onClick={() => setCategory((v) => (v === c ? null : c))}
          />
        ))}
      </div>

      {/* メインコンテンツ（タブで切り替え） */}
      <div className="relative z-10 mt-2 flex-1 overflow-hidden px-3 pb-[96px]">
        <div className={view === 'map' ? 'flex h-full flex-col' : 'hidden'}>
          <MapView
            className="m-7 min-h-0 flex-1"
            selectedId={selectedId}
            onSelect={(shop) => setSelectedId(shop.id)}
            categoryFilter={category}
            favoriteIds={favorites}
          />
          {selected && (
            <SelectedCard
              shop={selected}
              lang={lang}
              onOpen={() => openShop(selected.id)}
            />
          )}
        </div>

        {view === 'list' && (
          <ListView
            shops={filtered}
            lang={lang}
            favorites={favorites}
            onOpen={openShop}
          />
        )}

        {view === 'saved' && (
          <SavedView
            shops={shopsWithWalk.filter((s) => favorites.includes(s.id))}
            lang={lang}
            onOpen={openShop}
          />
        )}

        {view === 'feedback' && (
          <div className="h-full overflow-y-auto pb-6">
            <div className="px-2 pb-3 pt-1">
              <h2 className="font-heading text-[28px] leading-[1.12] text-white">{t('tabFeedback', lang)}</h2>
            </div>
            <div className="px-2">
              <SurveyForm />
            </div>
          </div>
        )}
      </div>

      {/* タブバー */}
      <div className="fixed bottom-[22px] left-1/2 z-20 flex h-16 w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 items-center gap-1 rounded-full bg-text p-1.5 shadow-organic-lg">
        <TabButton active={view === 'map'} onClick={() => setView('map')}>
          {t('tabMap', lang)}
        </TabButton>
        <TabButton active={view === 'list'} onClick={() => setView('list')}>
          {t('tabList', lang)}
        </TabButton>
        <TabButton active={view === 'saved'} onClick={() => setView('saved')} badge={favorites.length}>
          {t('tabSaved', lang)}
        </TabButton>
        <TabButton active={view === 'feedback'} onClick={() => setView('feedback')} icon={<FeedbackIcon size={16} />}>
          {t('tabFeedback', lang)}
        </TabButton>
      </div>

      <InstallPrompt />
    </main>
  )
}

const LANG_CODE = { en: 'EN', zhCN: '简', zhTW: '繁', ko: '한', ja: '日' }

function CategoryChip({ active, label, dot, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press flex h-9 flex-none items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[13px] ${
        active ? 'bg-text font-bold text-bg' : 'bg-neutral-200 font-semibold text-text hover:bg-neutral-300'
      }`}
    >
      {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
      {label}
    </button>
  )
}

function TabButton({ active, onClick, badge, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press flex h-full flex-1 items-center justify-center gap-1.5 rounded-full text-sm ${
        active ? 'bg-bg font-bold text-text' : 'font-semibold text-neutral-400'
      }`}
    >
      {icon}
      {children}
      {!!badge && (
        <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-neutral-100">
          {badge}
        </span>
      )}
    </button>
  )
}

function StatusTag({ status, lang }) {
  const bg = status.open ? (status.closingSoon ? 'bg-accent-200' : 'bg-accent-2-200') : 'bg-neutral-200'
  const fg = status.open ? (status.closingSoon ? 'text-accent-800' : 'text-accent-2-800') : 'text-neutral-700'
  return <span className={`text-[12px] font-bold ${fg}`}>{status.label}</span>
}

function SelectedCard({ shop, lang, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="press mt-3 flex items-center gap-3 rounded-radius-lg bg-neutral-100 p-2.5 text-left shadow-organic-md"
    >
      <ShopImage
        src={shopImageUrl(shop, shop.exterior)}
        variant="exterior"
        label={shop.name}
        alt=""
        className="h-[72px] w-[72px] flex-none rounded-[18px]"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-bold text-accent-700">
          {CATEGORY_LABEL[shop.category]?.[lang] || shop.category}
        </div>
        <div className="truncate font-heading text-lg text-text">{shop.nameI18n?.[lang] || shop.name}</div>
        <div className="mt-0.5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-accent-200 px-2 py-0.5 text-[12px] font-bold text-accent-800">
            {shop.walk} {t('min', lang)}
          </span>
          <StatusTag status={shop.status} lang={lang} />
        </div>
      </div>
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent text-base font-bold text-neutral-100">
        →
      </span>
    </button>
  )
}

function ListView({ shops: list, lang, favorites, onOpen }) {
  const grouped = CATEGORY_KEYS.map((cat) => ({
    key: cat,
    label: CATEGORY_LABEL[cat]?.[lang] || cat,
    color: CATEGORY_COLOR[cat],
    items: list.filter((s) => s.category === cat).sort((a, b) => a.walk - b.walk),
  })).filter((g) => g.items.length)

  return (
    <div className="h-full overflow-y-auto pb-6">
      {grouped.length === 0 && <p className="px-2 py-6 text-sm font-medium text-white/70">{t('none', lang)}</p>}
      {grouped.map((group) => (
        <div key={group.key}>
          <div className="flex items-center gap-2 px-2 pb-1 pt-3">
            <span className="h-3.5 w-3.5 rounded-full border-[3px] box-border" style={{ borderColor: group.color }} />
            <span className="text-[13px] font-bold text-accent-300">{group.label}</span>
          </div>
          {group.items.map((s) => (
            <ShopRow key={s.id} shop={s} lang={lang} saved={favorites.includes(s.id)} onOpen={() => onOpen(s.id)} />
          ))}
        </div>
      ))}
    </div>
  )
}

function ShopRow({ shop, lang, saved, onOpen }) {
  const ring = CATEGORY_COLOR[shop.category] || '#c67139'
  return (
    <div className="mb-2 flex items-center gap-3 rounded-radius-lg bg-neutral-100 p-2 shadow-organic-sm">
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <div className="h-[60px] w-[60px] flex-none rounded-full" style={{ boxShadow: `0 0 0 3px ${ring}` }}>
          <ShopImage
            src={shopImageUrl(shop, shop.exterior)}
            variant="exterior"
            label={shop.name}
            alt=""
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15.5px] font-bold text-text">{shop.nameI18n?.[lang] || shop.name}</div>
          <div className="truncate text-[12.5px] font-medium text-neutral-700">
            {CATEGORY_LABEL[shop.category]?.[lang] || shop.category} · {shop.heroDish?.name?.[lang] || ''}
          </div>
          <StatusTag status={shop.status} lang={lang} />
          <span className="ml-1 text-[12px] font-bold text-neutral-700">
            · {shop.walk} {t('min', lang)}
          </span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => toggleFavorite(shop.id)}
        aria-label="favorite"
        className={`press flex h-11 w-11 flex-none items-center justify-center rounded-full text-lg font-bold ${
          saved ? 'bg-accent text-neutral-100' : 'bg-neutral-200 text-neutral-700 hover:bg-accent-200'
        }`}
      >
        {saved ? '♥' : '♡'}
      </button>
    </div>
  )
}

function SavedView({ shops: list, lang, onOpen }) {
  const sorted = [...list].sort((a, b) => a.walk - b.walk)
  return (
    <div className="h-full overflow-y-auto pb-6">
      <div className="px-2 pb-2 pt-1">
        <h2 className="font-heading text-[28px] leading-[1.12] text-white">{t('savedTitle', lang)}</h2>
        {sorted.length > 0 && (
          <p className="mt-1 text-[13.5px] font-semibold text-accent-300">
            {t('savedSum', lang)(sorted.length, Math.max(...sorted.map((s) => s.walk)))}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 px-2 pt-2">
        {sorted.map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-radius-lg bg-neutral-100 p-2">
            <button type="button" onClick={() => onOpen(s.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
              <ShopImage
                src={shopImageUrl(s, s.exterior)}
                variant="exterior"
                label={s.name}
                alt=""
                className="h-[58px] w-[58px] flex-none rounded-[18px]"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-bold text-text">{s.nameI18n?.[lang] || s.name}</div>
                <div className="truncate text-[12.5px] font-medium text-neutral-700">
                  {s.heroDish?.name?.[lang] || ''} · {s.heroDish?.price || ''}
                </div>
                <div className="text-[12px] font-bold text-neutral-700">
                  {s.walk} {t('min', lang)} · {s.status.label}
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(s.id)}
              aria-label="remove"
              className="press flex h-10 w-10 flex-none items-center justify-center rounded-full font-bold text-neutral-600 hover:bg-neutral-200"
            >
              ✕
            </button>
          </div>
        ))}
        {sorted.length === 0 && <p className="px-1 text-sm font-medium text-white/70">{t('empty', lang)}</p>}
      </div>
    </div>
  )
}
