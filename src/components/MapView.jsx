import { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChurchIcon, TramIcon, PortIcon, SlopeIcon, LanternIcon } from './icons/NagasakiIcons.jsx'
import { shops } from '../data/shops.js'

// 長崎市の「仮マップ」。
// 見える枠（ビューポート）は従来どおりの正方形のまま、その中の「地図（ワールド）」を
// 一回り大きく描き、指でスワイプ／ドラッグして上下左右にパンできるようにする。
// これによりピンの間隔を広げても枠内に収まらなくならない。
// 見える範囲の外にあるピンは、枠の縁に「方向マーカー」を出して知らせる
// （マーカーを押すと、そのお店が中央に来るようにマップが移動する）。
//
// ▼ 将来 Google Maps 等に差し替える場合はこのコンポーネントの中身だけを
//   置き換えればよい：地名スポット(LANDMARKS)は装飾なので任意。
//   店舗ピンは shops(data/shops.js) を map して描画しており、
//   実地図化では shop.geo(lat/lng) を使ってピンを置き、
//   クリックで navigate(`/shop/${shop.id}`) する点だけ踏襲すればよい。

// 地図（ワールド）は枠の何倍か。1 より大きいほど広く、パンできる余地が増える。
const WORLD_SCALE = 1.7
// 画面外ピンの方向マーカーを縁からどれだけ内側に置くか（px）
const EDGE_PAD = 18
// クリックとドラッグを区別するしきい値（px）
const DRAG_THRESHOLD = 5

// 地名スポット（装飾・非クリック）
const LANDMARKS = [
  { id: 'port', name: 'Nagasaki Port', x: 26, y: 30, Icon: PortIcon, color: 'text-navy' },
  { id: 'dejima', name: 'Dejima', x: 40, y: 40, Icon: LanternIcon, color: 'text-vermilion' },
  { id: 'church', name: 'Oura Church', x: 30, y: 66, Icon: ChurchIcon, color: 'text-terracotta' },
  { id: 'glover', name: 'Glover Garden', x: 52, y: 88, Icon: SlopeIcon, color: 'text-pine' },
  { id: 'tram', name: 'Tram Line', x: 76, y: 52, Icon: TramIcon, color: 'text-navy' },
]

const LAND_D =
  'M14 18 C14 10 22 8 34 8 C50 8 62 6 76 10 C88 13 92 22 90 34 C92 50 92 64 88 76 C85 88 74 92 62 92 C48 93 32 93 22 90 C12 87 8 76 10 64 C8 50 8 32 14 18 Z'

// カテゴリ別のピン絵柄。新カテゴリは1行足すだけ。未定義は 🍴。
const CATEGORY_ICON = {
  Izakaya: '🍶',
  Bar: '🍺',
  Yakiniku: '🍖',
  'Cafe & Bar': '🍸',
  Cafe: '☕',
  Restaurant: '🍴',
  Ramen: '🍜',
  Sushi: '🍣',
  Sweets: '🍡',
}
const iconForCategory = (category) => CATEGORY_ICON[category] ?? '🍴'

// offset をワールドが必ず枠を覆う範囲にクランプ
const clampOffset = (o, w, h) => {
  const minX = w - w * WORLD_SCALE // 負値（左に寄せられる限界）
  const minY = h - h * WORLD_SCALE
  return {
    x: Math.min(0, Math.max(minX, o.x)),
    y: Math.min(0, Math.max(minY, o.y)),
  }
}

export default function MapView({ className = '' }) {
  const navigate = useNavigate()
  const viewportRef = useRef(null)
  const dragRef = useRef(null) // { startX, startY, baseX, baseY, moved }
  const movedRef = useRef(false) // 直近の操作がドラッグだったか（ピンの誤クリック防止）
  const userPannedRef = useRef(false) // ユーザーが一度でも動かしたか（＝以後は中央寄せしない）

  const [size, setSize] = useState({ w: 0, h: 0 }) // 枠のピクセルサイズ
  const [offset, setOffset] = useState(null) // ワールドの平行移動(px)。中央位置が決まるまで null
  const [dragging, setDragging] = useState(false)

  const worldW = size.w * WORLD_SCALE
  const worldH = size.h * WORLD_SCALE
  const ready = offset !== null
  const off = offset ?? { x: 0, y: 0 }

  // 枠サイズを測り、初回は「地図の中央」が枠の中央に来るよう offset を決める。
  // useLayoutEffect なので描画（ペイント）前に確定 → 左上からのチラつきなく中央表示。
  // ユーザーが動かした後のリサイズでは中央へ戻さず、現在位置を再クランプするだけ。
  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (w === 0 || h === 0) return
      setSize({ w, h })
      setOffset((prev) => {
        if (prev === null || !userPannedRef.current) {
          // 中央：ワールドの中心を枠の中心に合わせる
          return clampOffset({ x: (w - w * WORLD_SCALE) / 2, y: (h - h * WORLD_SCALE) / 2 }, w, h)
        }
        return clampOffset(prev, w, h)
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // お店を枠の中央へ運ぶ（方向マーカーを押したとき）
  const focusPin = useCallback(
    (shop) => {
      userPannedRef.current = true
      setOffset(
        clampOffset(
          {
            x: size.w / 2 - (shop.map.x / 100) * worldW,
            y: size.h / 2 - (shop.map.y / 100) * worldH,
          },
          size.w,
          size.h,
        ),
      )
    },
    [size.w, size.h, worldW, worldH],
  )

  // ▼ ドラッグ（パン）操作
  const onPointerDown = (e) => {
    const el = viewportRef.current
    el?.setPointerCapture?.(e.pointerId)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: off.x,
      baseY: off.y,
      moved: false,
    }
    movedRef.current = false
    setDragging(true)
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      d.moved = true
      movedRef.current = true
      userPannedRef.current = true
    }
    setOffset(clampOffset({ x: d.baseX + dx, y: d.baseY + dy }, size.w, size.h))
  }
  const onPointerUp = (e) => {
    const wasTap = dragRef.current && !dragRef.current.moved
    dragRef.current = null
    setDragging(false)
    if (!wasTap) return
    // ポインタをキャプチャしていると click がピンに届かないため、
    // タップ（ドラッグしていない指離し）は指の真下の要素を自前で判定して遷移する。
    const target = document.elementFromPoint(e.clientX, e.clientY)
    const focus = target?.closest?.('[data-focus-id]')
    if (focus) {
      const shop = shops.find((s) => s.id === focus.getAttribute('data-focus-id'))
      if (shop) focusPin(shop)
      return
    }
    const pin = target?.closest?.('[data-shop-id]')
    if (pin) navigate(`/shop/${pin.getAttribute('data-shop-id')}`)
  }

  // 画面外ピンの方向マーカーを計算
  const cx = size.w / 2
  const cy = size.h / 2
  const offscreen =
    ready && size.w > 0
      ? shops
          .map((shop) => {
            const vx = (shop.map.x / 100) * worldW + off.x // 枠内でのピン位置(px)
            const vy = (shop.map.y / 100) * worldH + off.y
            const isOff = vx < 0 || vx > size.w || vy < 0 || vy > size.h
            if (!isOff) return null
            const ix = Math.min(size.w - EDGE_PAD, Math.max(EDGE_PAD, vx)) // 縁に貼り付ける
            const iy = Math.min(size.h - EDGE_PAD, Math.max(EDGE_PAD, vy))
            const angle = (Math.atan2(vy - cy, vx - cx) * 180) / Math.PI // 外向き矢印の角度
            return { shop, ix, iy, angle }
          })
          .filter(Boolean)
      : []

  return (
    <div className={`relative ${className}`}>
      {/* 枠（ビューポート）：この中でワールドをパンする。枠外はクリップ。 */}
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`relative aspect-square w-full touch-none select-none overflow-hidden rounded-2xl ring-1 ring-white/10 ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* ワールド（枠より一回り大きい地図本体） */}
        <div
          className="absolute left-0 top-0"
          style={{
            width: worldW,
            height: worldH,
            transform: `translate3d(${off.x}px, ${off.y}px, 0)`,
            // 初期の中央寄せ・ドラッグ中はアニメさせない（マーカー押下の移動だけ滑らかに）
            transition: dragging || !ready ? 'none' : 'transform 0.4s ease-out',
            visibility: ready ? 'visible' : 'hidden',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              {/* 陸地：夜になじむよう砂色を大きくミュート。外周は背景の夜ネイビーへ。 */}
              <radialGradient id="land" cx="50%" cy="48%" r="72%">
                <stop offset="0%" stopColor="#7c7358" />
                <stop offset="40%" stopColor="#5f5a44" />
                <stop offset="66%" stopColor="#3a3f45" />
                <stop offset="85%" stopColor="#182740" />
                <stop offset="100%" stopColor="#0a1830" />
              </radialGradient>
              <linearGradient id="bay" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2c4655" />
                <stop offset="100%" stopColor="#1e3546" />
              </linearGradient>
              <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.6" />
              </filter>
            </defs>

            {/* 陸地（中心=砂色 → 外周=背景色。外周は軽くぼかして境界を目立たなくする） */}
            <path d={LAND_D} fill="url(#land)" filter="url(#soften)" />

            {/* 等高線（丘の街・長崎の坂をうっすら表現） */}
            {['M20 40 Q40 30 62 38', 'M22 56 Q44 48 68 58', 'M60 66 Q74 70 82 82'].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#8a8163" strokeOpacity="0.45" strokeWidth="0.5" />
            ))}

            {/* 湾（長崎港の細長い入り江。陸地を切り込む＝海岸線はくっきり） */}
            <path
              d="M52 6 C48 22 40 34 30 46 C22 56 16 70 14 88 L30 90 C32 74 40 60 50 46 C58 34 62 20 60 8 C58 4 54 3 52 6 Z"
              fill="url(#bay)"
            />
            {/* 水面のきらめき */}
            {['M24 78 q3 -2 6 0', 'M28 66 q3 -2 6 0', 'M34 54 q3 -2 6 0', 'M42 40 q3 -2 6 0'].map(
              (d, i) => (
                <path key={i} d={d} fill="none" stroke="#9fb6c2" strokeOpacity="0.45" strokeWidth="0.6" />
              ),
            )}

            {/* 路面電車ライン（赤の点線ルート） */}
            <path
              d="M26 34 Q40 44 46 44 Q60 46 70 56 Q78 64 74 78"
              fill="none"
              stroke="#c0553b"
              strokeWidth="1"
              strokeDasharray="1.8 2.2"
              strokeLinecap="round"
            />
          </svg>

          {/* 地名スポット（装飾・非クリック） */}
          {LANDMARKS.map(({ id, name, x, y, Icon, color }) => (
            <div
              key={id}
              className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-hand ring-2 ring-white ${color}`}
              >
                <Icon size={20} />
              </div>
              <span className="mt-1 whitespace-nowrap text-[10px] font-semibold text-ink drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
                {name}
              </span>
            </div>
          ))}

          {/* 店舗ピン（タップで詳細ページへ）。遷移は onPointerUp 側で data-shop-id を見て行う。
              shops を map するので追加は data だけで反映 */}
          {shops.map((shop) => (
            <button
              key={shop.id}
              type="button"
              data-shop-id={shop.id}
              aria-label={`${shop.name} (${shop.category})`}
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
              style={{ left: `${shop.map.x}%`, top: `${shop.map.y}%` }}
            >
              {/* 朱色の雫型ピン */}
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full rounded-br-none bg-vermilion text-white shadow-hand ring-2 ring-white [rotate:45deg]">
                <span className="text-sm [rotate:-45deg]">{iconForCategory(shop.category)}</span>
              </span>
              <span className="mt-1 whitespace-nowrap rounded-full bg-white/95 px-1.5 text-[10px] font-bold text-vermilion shadow-hand">
                {shop.name}
              </span>
            </button>
          ))}
        </div>

        {/* 画面外ピンの方向マーカー（枠に固定・ワールドとは独立） */}
        {offscreen.map(({ shop, ix, iy, angle }) => (
          <button
            key={`off-${shop.id}`}
            type="button"
            data-focus-id={shop.id}
            aria-label={`Show ${shop.name} on the map`}
            className="press absolute z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vermilion text-white shadow-hand ring-2 ring-white"
            style={{ left: ix, top: iy }}
          >
            <span className="text-xs">{iconForCategory(shop.category)}</span>
            {/* 外向きの矢印（ピンの方向を指す） */}
            <span
              className="pointer-events-none absolute text-[13px] leading-none text-vermilion drop-shadow-[0_0_1px_rgba(255,255,255,0.9)]"
              style={{ transform: `rotate(${angle}deg) translateX(15px)` }}
              aria-hidden="true"
            >
              ➤
            </span>
          </button>
        ))}

        {/* 操作ヒント */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-sm">
          Drag to explore
        </div>
      </div>
    </div>
  )
}
