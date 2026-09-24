import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { shops } from '../data/shops.js'
import { LANGUAGES, useLanguage } from '../LanguageContext.jsx'

// 長崎によく来る海外観光客の言語＋日本語。アプリ全体（店舗の説明文など）と共通の言語リストを使う。
// （長崎港は中国発クルーズ船の寄港が多く、地理的に韓国・台湾からの観光客も多いという
// 一般的な傾向にもとづく選定で、公式統計での裏付けはしていない）
const MAP_LANGS = LANGUAGES

// OpenStreetMapの地名データにある言語別フィールド(name:xx)を、優先順位つきで参照する。
// データが無い言語・場所ではより上位の候補（英語→現地語）にフォールバックする。
const NAME_FIELD_CHAINS = {
  en: ['name:en', 'name_en', 'name:latin', 'name'],
  zhCN: ['name:zh-Hans', 'name:zh', 'name:en', 'name'],
  zhTW: ['name:zh-Hant', 'name:zh', 'name:en', 'name'],
  ko: ['name:ko', 'name:en', 'name'],
  ja: ['name:ja', 'name'],
}

function buildTextField(lang) {
  const expr = ['coalesce']
  NAME_FIELD_CHAINS[lang].forEach((f) => expr.push(['get', f]))
  return expr
}

// 実地図（MapLibre GL + OpenFreeMap、APIキー不要）。
// もう一つのプロトタイプアプリ（NagaGo/Dejima Dish）で使っている地図の実装方式を移植したもの:
//   ・OpenFreeMapの「positron」スタイル（シンプルな配色の地図）に、建物データから3D押し出しを追加
//   ・店舗ピンはカテゴリー別の線画アイコンを乗せた丸バッジ
//   ・パン/ズームは長崎駅〜思案橋のエリアだけに制限
// レイアウト・サイズ（aspect-square, rounded-2xl 等）は元のMapViewを踏襲し、
// Home/MapPageなど呼び出し側の見た目は変えていない。

const CATEGORY_ICON_PATHS = {
  Izakaya: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M9 4.2c-.9.9-.9 2 0 2.9M12.3 3.4c-.9.9-.9 2 0 2.9M15.6 4.2c-.9.9-.9 2 0 2.9"/>',
  Bar: '<path d="M5 4h14l-6.2 7.4V18h3"/><path d="M9 18h4"/><path d="M5.8 7.2h12.4"/>',
  Yakiniku: '<path d="M12 21c4 0 6-2.5 6-6 0-3-2-4.5-2-4.5.3 2-1 3-1 3 .3-3.5-2.5-5-2.5-8.5-1.5 1.5-3 3.5-3 6 0 1-1 1.7-1 1.7C7 14 6 15.5 6 17c0 2.5 2 4 6 4Z"/>',
  'Cafe & Bar': '<path d="M5 9h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9Z"/><path d="M16 10.2h1.3a2.4 2.4 0 0 1 0 4.8H16"/><path d="M8.2 5.2c-.8.8-.8 1.8 0 2.6M11.7 4.4c-.8.8-.8 1.8 0 2.6"/>',
}
const DEFAULT_ICON_PATH =
  '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M9 4.2c-.9.9-.9 2 0 2.9M12.3 3.4c-.9.9-.9 2 0 2.9M15.6 4.2c-.9.9-.9 2 0 2.9"/>'

function iconSvg(category, size = 17) {
  const path = CATEGORY_ICON_PATHS[category] || DEFAULT_ICON_PATH
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}">${path}</svg>`
}

// 実際にshopsデータへ登場する順番で、カテゴリーの一覧を作る
// （新しいカテゴリーのお店を追加するだけで、この凡例にも自動で反映される）
const CATEGORIES = shops.reduce((list, shop) => {
  if (!list.includes(shop.category)) list.push(shop.category)
  return list
}, [])

// 長崎駅〜思案橋・銅座・新地中華街をひとつのエリアとしてカバーする範囲に制限する。
// 東西幅が南北幅よりかなり狭いと、maxBoundsに収めるためのズーム制約で
// 東西にはほぼパンできず上下方向だけ動かせる状態になってしまう。
// そのため東西方向に余裕を持たせ、南北とほぼ同じくらいの広さにしてある。
const MAP_BOUNDS = [
  [129.8595, 32.7365], // 南西
  [129.8815, 32.756], // 北東
]

export default function MapView({ className = '' }) {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const labelLayerIdsRef = useRef([])
  const markersRef = useRef([]) // { shop, el }[]
  const { lang, setLang } = useLanguage() // アプリ全体と共有の言語（店舗の説明文もこれに連動する）
  const [activeCategory, setActiveCategory] = useState(null) // nullは「すべて」
  const activeCategoryRef = useRef(null)

  // ピンの絞り込みを、既に作成済みのマーカーの表示/非表示だけで行う（作り直さない）
  const applyCategoryFilter = () => {
    markersRef.current.forEach(({ shop, el }) => {
      const show = !activeCategoryRef.current || shop.category === activeCategoryRef.current
      el.style.display = show ? 'flex' : 'none'
    })
  }

  useEffect(() => {
    let cancelled = false

    async function init() {
      const style = await fetch('https://tiles.openfreemap.org/styles/positron').then((r) => r.json())
      if (cancelled || !containerRef.current) return

      // 地名・道路名などのラベルレイヤーを見つけて、初期言語のテキストに差し替えておく
      const labelLayerIds = []
      style.layers.forEach((layer) => {
        const tf = layer.layout && layer.layout['text-field']
        if (tf && JSON.stringify(tf).includes('"name')) {
          labelLayerIds.push(layer.id)
          layer.layout['text-field'] = buildTextField(lang)
        }
      })
      labelLayerIdsRef.current = labelLayerIds

      // 建物データにrender_height/render_min_heightがあるため、3D押し出しレイヤーを追加する
      const buildingIndex = style.layers.findIndex((l) => l.id === 'building')
      if (buildingIndex !== -1) {
        style.layers.splice(buildingIndex + 1, 0, {
          id: 'building-3d',
          type: 'fill-extrusion',
          source: 'openmaptiles',
          'source-layer': 'building',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': ['coalesce', ['get', 'colour'], '#d9d3c6'],
            'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 5],
            'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': 0.85,
          },
        })
      }

      const map = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: [129.8712, 32.7455],
        zoom: 14.6,
        pitch: 50,
        bearing: -14,
        maxBounds: MAP_BOUNDS,
        attributionControl: true,
      })
      mapRef.current = map
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
      // 現在地ボタン。押すと現在地の許可を求め、許可されれば地図上に自分の位置を表示する
      const geolocate = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      })
      map.addControl(geolocate, 'top-right')
      // ボタンを押させず、地図を開いた瞬間に位置情報の許可ダイアログを出す
      // （trigger()はボタンを押したのと同じ動作をコードから呼び出すメソッド）
      map.on('load', () => geolocate.trigger())

      map.on('load', () => {
        markersRef.current = []
        shops.forEach((shop) => {
          if (shop.geo?.lat == null || shop.geo?.lng == null) return

          const el = document.createElement('button')
          el.type = 'button'
          el.setAttribute('aria-label', `${shop.name} (${shop.category})`)
          el.className =
            'flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-vermilion shadow-hand ring-2 ring-white'
          el.innerHTML = iconSvg(shop.category)
          el.addEventListener('click', (e) => {
            e.stopPropagation()
            navigate(`/shop/${shop.id}`)
          })

          new maplibregl.Marker({ element: el, anchor: 'bottom' })
            .setLngLat([shop.geo.lng, shop.geo.lat])
            .addTo(map)

          markersRef.current.push({ shop, el })
        })
        // 凡例で既に選ばれている種類があれば、マーカー作成直後にも反映する
        applyCategoryFilter()
      })
    }

    init()

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [navigate])

  // 言語ボタンが押されたら、地図上の地名ラベルだけを差し替える（ピン・店舗データには影響しない）
  const handleLangChange = (code) => {
    setLang(code)
    const map = mapRef.current
    if (!map) return
    const expr = buildTextField(code)
    labelLayerIdsRef.current.forEach((id) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'text-field', expr)
    })
  }

  // 凡例のアイコンが押されたら、その種類のピンだけを表示する（もう一度押すと解除）
  const handleCategoryClick = (category) => {
    const next = activeCategory === category ? null : category
    activeCategoryRef.current = next
    setActiveCategory(next)
    applyCategoryFilter()
  }

  return (
    <div className={className}>
      {/* この内側のrelativeが地図カードそのもの。言語ボタンをこの角に重ねるので、
          凡例（この下に続く別要素）の高さに影響されず常に地図の左下に留まる。 */}
      <div className="relative">
        <div
          ref={containerRef}
          className="aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-white/10"
        />

        {/* 地図上の地名の表示言語切り替え */}
        <div className="absolute bottom-3 left-3 z-10 flex gap-1 rounded-full bg-white/95 p-1 shadow-hand">
          {MAP_LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleLangChange(l.code)}
              className={`press flex h-6 w-6 items-center justify-center rounded-full font-hand text-[11px] font-bold ${
                lang === l.code ? 'bg-vermilion text-white' : 'text-navy/70'
              }`}
              aria-pressed={lang === l.code}
              aria-label={`Map labels: ${l.label}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 種類別の凡例。押すとその種類のピンだけが地図上に残る */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => handleCategoryClick(null)}
          className={`press flex items-center gap-1.5 rounded-full px-3 py-1.5 font-hand text-xs font-semibold shadow-hand ${
            activeCategory === null ? 'bg-vermilion text-white' : 'bg-white text-navy/70'
          }`}
          aria-pressed={activeCategory === null}
        >
          All
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className={`press flex items-center gap-1.5 rounded-full px-3 py-1.5 font-hand text-xs font-semibold shadow-hand ${
              activeCategory === category ? 'bg-vermilion text-white' : 'bg-white text-navy/70'
            }`}
            aria-pressed={activeCategory === category}
            dangerouslySetInnerHTML={{
              __html: `${iconSvg(category, 14)}<span>${category}</span>`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
