import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { shops, shopImageUrl } from '../data/shops.js'
import { useLanguage } from '../LanguageContext.jsx'
import { getLastShopId, clearLastShopId } from '../mapState.js'
import { HOTEL, WALK_BANDS, minutesToMeters, circlePolygon, pointNorthOf } from '../walkRings.js'
import { CATEGORY_COLOR, FAVORITES_FILTER } from '../walkRingsText.js'

// 実地図（MapLibre GL + OpenFreeMap、APIキー不要）。
// 「Walk Rings」リデザイン仕様の 02 Map 画面の中核。
// 仕様書の参照デザイン（Nagasaki Eats Walk Rings.dc.html）内のマップは、見やすさ優先で
// ピンを力学的にばらけさせた模式図だが、アプリ側は実際のMapLibre地図の上に
// 実座標でピン・徒歩時間リングを描く（README「02 Mapは模式図、アプリでは実地図」の指示通り）。
//
// チップ類（言語切替・カテゴリー絞り込み）やタブバー、選択中の店舗カードは
// このコンポーネントの外（Home.jsxなど呼び出し側）が持つ。MapViewは
// 「地図そのもの」と、選択/絞り込みの状態をpropsで受け取って反映するところまでを担当する。

const DEFAULT_COLOR = '#c67139'
const UNVERIFIED_COLOR = '#2563eb'
// 店名ラベルを出す拡大率のしきい値。初期表示では出さず、寄ったときだけ名前が並ぶようにする。
const LABEL_MIN_ZOOM = 15.8
const labelFor = (shop, code) => shop.nameI18n?.[code] || shop.name

// OpenStreetMapの地名データにある言語別フィールド(name:xx)を、優先順位つきで参照する。
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

// 長崎市中心部の観光エリア全体をカバーする範囲に制限する。
const MAP_BOUNDS = [
  [129.835, 32.72],
  [129.905, 32.79],
]
function isInsideBounds(lng, lat) {
  const [[west, south], [east, north]] = MAP_BOUNDS
  return lng >= west && lng <= east && lat >= south && lat <= north
}

const NOTE_TEXT = {
  outside: {
    en: 'You are outside this map area.',
    zhCN: '您当前位置在本地图范围之外。',
    zhTW: '您目前位置在本地圖範圍之外。',
    ko: '현재 위치가 이 지도 범위 밖입니다.',
    ja: '現在地はこの地図の範囲外です。',
  },
  denied: {
    en: 'Location is off. Turn it on in your browser settings.',
    zhCN: '定位已关闭，请在浏览器设置中开启。',
    zhTW: '定位已關閉，請在瀏覽器設定中開啟。',
    ko: '위치 정보가 꺼져 있습니다. 브라우저 설정에서 켜 주세요.',
    ja: '位置情報がオフです。ブラウザの設定でオンにしてください。',
  },
  unavailable: {
    en: 'Could not get your location.',
    zhCN: '无法获取您的位置。',
    zhTW: '無法取得您的位置。',
    ko: '위치를 가져올 수 없습니다.',
    ja: '現在地を取得できませんでした。',
  },
}

const RING_LABEL = { min: { en: 'min', zhCN: '分钟', zhTW: '分鐘', ko: '분', ja: '分' } }

function buildRingsGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: WALK_BANDS.map((min) => ({
      type: 'Feature',
      properties: { min },
      geometry: {
        type: 'Polygon',
        coordinates: [circlePolygon(HOTEL.lat, HOTEL.lng, minutesToMeters(min))],
      },
    })),
  }
}

export default function MapView({
  className = '',
  selectedId = null,
  onSelect,
  categoryFilter = null,
  favoriteIds = null,
  showRings = true,
}) {
  const containerRef = useRef(null)
  const controlsWrapperRef = useRef(null)
  const mapRef = useRef(null)
  const labelLayerIdsRef = useRef([])
  const markersRef = useRef([]) // { shop, el }[]
  const [note, setNote] = useState(null) // 'outside' | 'denied' | 'unavailable' | null
  const { lang } = useLanguage()
  const langRef = useRef(lang)
  langRef.current = lang
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  // ピンの絞り込みを、既に作成済みのマーカーの表示/非表示だけで行う（作り直さない）
  const applyFilters = () => {
    markersRef.current.forEach(({ shop, el }) => {
      const matchesCategory =
        !categoryFilter ||
        (categoryFilter === FAVORITES_FILTER ? favoriteIds?.includes(shop.id) : shop.category === categoryFilter)
      el.style.display = matchesCategory ? 'flex' : 'none'
      el.classList.toggle('wr-pin-selected', shop.id === selectedId)
    })
  }

  // 拡大率に応じて、ピンの下に店名ラベルを出し入れする（広域表示では名前が重なるため拡大時だけ）。
  // 言語が変わったときも、表示中のラベル文字を合わせて差し替える。
  const applyLabels = () => {
    const map = mapRef.current
    if (!map) return
    const show = map.getZoom() >= LABEL_MIN_ZOOM
    const code = langRef.current
    markersRef.current.forEach(({ shop, labelEl }) => {
      if (!labelEl) return
      labelEl.textContent = labelFor(shop, code)
      labelEl.style.display = show ? 'block' : 'none'
    })
  }

  useEffect(() => {
    let cancelled = false

    async function init() {
      const style = await fetch('https://tiles.openfreemap.org/styles/positron').then((r) => r.json())
      if (cancelled || !containerRef.current) return

      const labelLayerIds = []
      style.layers.forEach((layer) => {
        const tf = layer.layout && layer.layout['text-field']
        if (tf && JSON.stringify(tf).includes('"name')) {
          labelLayerIds.push(layer.id)
          layer.layout['text-field'] = buildTextField(langRef.current)
        }
      })
      labelLayerIdsRef.current = labelLayerIds

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

      // 直前に店舗ページを開いていたら、その店のピンを中心に表示する。
      const lastShop = shops.find((s) => s.id === getLastShopId())
      clearLastShopId()

      const map = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: lastShop?.geo ? [lastShop.geo.lng, lastShop.geo.lat] : [HOTEL.lng, HOTEL.lat],
        zoom: lastShop ? 16.5 : 15.6,
        pitch: 45,
        bearing: -14,
        maxBounds: MAP_BOUNDS,
        attributionControl: true,
      })
      mapRef.current = map
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

      const geolocate = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      })
      map.addControl(geolocate, 'top-right')
      geolocate.on('geolocate', (e) => {
        setNote(isInsideBounds(e.coords.longitude, e.coords.latitude) ? null : 'outside')
      })
      geolocate.on('error', (err) => setNote(err?.code === 1 ? 'denied' : 'unavailable'))
      map.on('load', () => geolocate.trigger())

      map.on('load', () => {
        // 右上のズーム＋現在地ボタンは、別のフェードのかからないレイヤーへ移す
        const topRightCtrl = containerRef.current?.querySelector('.maplibregl-ctrl-top-right')
        if (topRightCtrl && controlsWrapperRef.current) {
          controlsWrapperRef.current.appendChild(topRightCtrl)
        }

        // 徒歩3/6/10分のリング（実座標の円）
        if (showRings) {
          map.addSource('walk-rings', { type: 'geojson', data: buildRingsGeoJSON() })
          map.addLayer({
            id: 'walk-rings-line',
            type: 'line',
            source: 'walk-rings',
            paint: { 'line-color': '#e0453e', 'line-width': 2.5, 'line-opacity': 0.9, 'line-dasharray': [2, 2] },
          })

          WALK_BANDS.forEach((min) => {
            const p = pointNorthOf(HOTEL.lat, HOTEL.lng, minutesToMeters(min))
            const el = document.createElement('div')
            el.className =
              'rounded-full bg-neutral-200/95 px-2 py-0.5 font-body text-[11px] font-bold text-accent-700 shadow-organic-sm whitespace-nowrap'
            el.textContent = `${min} ${RING_LABEL.min[langRef.current] || RING_LABEL.min.en}`
            el.dataset.ringLabel = String(min)
            new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat([p.lng, p.lat]).addTo(map)
          })
        }

        // ホテルの現在地点（基準点）
        const hotelEl = document.createElement('div')
        hotelEl.className = 'h-5 w-5 rounded-full border-4 border-bg bg-text shadow-organic-md box-border'
        new maplibregl.Marker({ element: hotelEl, anchor: 'center' }).setLngLat([HOTEL.lng, HOTEL.lat]).addTo(map)

        // 店舗ピン（写真の丸バッジ）
        markersRef.current = []
        shops.forEach((shop) => {
          if (shop.geo?.lat == null || shop.geo?.lng == null) return

          // 新規追加・未確認の店舗は、確認しやすいようカテゴリー色ではなく青で表示する
          const ring = shop.unverified ? UNVERIFIED_COLOR : CATEGORY_COLOR[shop.category] || DEFAULT_COLOR
          const el = document.createElement('button')
          el.type = 'button'
          el.setAttribute('aria-label', `${shop.name} (${shop.category})`)
          el.className = 'wr-pin'
          el.style.setProperty('--wr-ring', ring)
          el.innerHTML = `<span class="wr-pin-photo"><img src="${shopImageUrl(shop, shop.exterior)}" alt="" /></span>`
          el.addEventListener('click', (e) => {
            e.stopPropagation()
            onSelectRef.current?.(shop)
          })

          // 店名のラベル。ピンの真下に重ねる（広域表示では隠し、拡大したときだけ出す）。
          const labelEl = document.createElement('span')
          labelEl.className =
            'pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-neutral-100/95 px-2 py-0.5 font-body text-[11px] font-bold leading-tight text-text shadow-organic-sm'
          labelEl.style.display = 'none'
          el.appendChild(labelEl)

          new maplibregl.Marker({ element: el, anchor: 'bottom' })
            .setLngLat([shop.geo.lng, shop.geo.lat])
            .addTo(map)

          markersRef.current.push({ shop, el, labelEl })
        })
        applyFilters()
        applyLabels()
      })

      // 拡大率が変わるたびに店名ラベルの出し入れを判定する
      map.on('zoom', applyLabels)
    }

    init()

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 言語が変わったら、地図上の地名ラベル・リングのラベルだけ差し替える
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.getStyle()) return
    const expr = buildTextField(lang)
    labelLayerIdsRef.current.forEach((id) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'text-field', expr)
    })
    document.querySelectorAll('[data-ring-label]').forEach((el) => {
      el.textContent = `${el.dataset.ringLabel} ${RING_LABEL.min[lang] || RING_LABEL.min.en}`
    })
    applyLabels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  // 絞り込み・選択状態が変わるたびに、既存のピンの表示/選択だけを更新する
  useEffect(() => {
    applyFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, selectedId, favoriteIds])

  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden rounded-radius-lg shadow-organic-md">
        <div ref={containerRef} className="h-full w-full" />
        <div ref={controlsWrapperRef} className="pointer-events-none absolute inset-0 z-10" />

        {/* 現在地についての一言（範囲外・許可なし・取得失敗）。押すと消える。 */}
        {note && (
          <button
            type="button"
            onClick={() => setNote(null)}
            className="press absolute left-1/2 top-3 z-10 max-w-[85%] -translate-x-1/2 rounded-full bg-neutral-100/95 px-3 py-1.5 font-body text-[11px] font-semibold leading-snug text-text shadow-organic-sm"
          >
            {NOTE_TEXT[note][lang] || NOTE_TEXT[note].en}
          </button>
        )}
      </div>
    </div>
  )
}
