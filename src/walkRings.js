// 「Walk Rings」リデザイン共通のロジック（ホテルからの徒歩分数・営業ステータス）。
// Map（ホーム）・List・Place・Saved など複数画面で同じ計算を使うため、ここに集約する。
// 数値・ロジックは Nagasaki Eats Walk Rings 仕様書の support.js 準拠。

// ホテル（ドーミーイン長崎新地中華街）の座標
export const HOTEL = { lat: 32.74223140320781, lng: 129.87632802131992 }

// 徒歩速度の近似（分速75m ÷ 1.3 の補正＝信号待ち等を考慮した体感速度）
const WALK_SPEED_PER_MIN = 75 / 1.3

// 実ルートが取れるまでの概算。直線距離（ハバーサイン簡易版）から徒歩分数を出す。
export function walkMinutes(fromLat, fromLng, toLat, toLng) {
  const dy = (toLat - fromLat) * 111000
  const dx = (toLng - fromLng) * 93700 * Math.cos((fromLat * Math.PI) / 180)
  const meters = Math.hypot(dx, dy)
  return Math.max(1, Math.round(meters / WALK_SPEED_PER_MIN))
}

// 徒歩分数 → その分数で届く半径（メートル）
export function minutesToMeters(min) {
  return min * WALK_SPEED_PER_MIN
}

export const WALK_BANDS = [3, 6, 10]

// 中心点＋半径(m)から、円を近似する多角形の座標列(lng,lat)を作る。
// MapLibreの circle レイヤーはピクセル半径しか指定できず、ズームすると実距離とズレるため、
// 実際の地理座標で円を描いて GeoJSON の fill/line レイヤーとして表示する。
export function circlePolygon(centerLat, centerLng, radiusMeters, steps = 64) {
  const coords = []
  const latRad = (centerLat * Math.PI) / 180
  const degPerMeterLat = 1 / 111320
  const degPerMeterLng = 1 / (111320 * Math.cos(latRad))
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI
    const dLat = Math.sin(angle) * radiusMeters * degPerMeterLat
    const dLng = Math.cos(angle) * radiusMeters * degPerMeterLng
    coords.push([centerLng + dLng, centerLat + dLat])
  }
  return coords
}

// 中心点から北へ radiusMeters だけ離れた地点（リングの上端＝ラベルの置き場所）
export function pointNorthOf(centerLat, centerLng, radiusMeters) {
  const degPerMeterLat = 1 / 111320
  return { lat: centerLat + radiusMeters * degPerMeterLat, lng: centerLng }
}

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

function toMin(hm) {
  const [h, m] = hm.split(':').map(Number)
  return h * 60 + m
}

// hours[day] を [開始分, 終了分] の配列にする。深夜またぎ（例: 19:00–03:00）は終了分に1440を足す。
function rangesFor(hours, dayKey) {
  const slots = hours?.[dayKey]
  if (!slots) return []
  return slots.map((s) => {
    const [a, b] = s.split(/[–-]/).map((t) => toMin(t.trim()))
    return [a, b <= a ? b + 1440 : b]
  })
}

function fmt(totalMin) {
  const h = Math.floor(totalMin / 60) % 24
  const m = totalMin % 60
  return `${h}:${String(m).padStart(2, '0')}`
}

const STATUS_TEXT = {
  en: { until: (t) => `Open until ${t}`, opensAt: (t) => `Opens at ${t}`, closedToday: 'Closed today', closedNow: 'Closed for today' },
  zhCN: { until: (t) => `营业至 ${t}`, opensAt: (t) => `${t} 开始营业`, closedToday: '今日休息', closedNow: '今日已打烊' },
  zhTW: { until: (t) => `營業至 ${t}`, opensAt: (t) => `${t} 開始營業`, closedToday: '今日公休', closedNow: '今日已打烊' },
  ko: { until: (t) => `${t}까지 영업`, opensAt: (t) => `${t} 영업 시작`, closedToday: '오늘 휴무', closedNow: '오늘 영업 종료' },
  ja: { until: (t) => `${t}まで営業`, opensAt: (t) => `${t}から営業`, closedToday: '本日定休', closedNow: '本日の営業終了' },
}

// 現在時刻（デフォルトは実時刻）を基準に、営業中かどうかと表示用の文言を返す。
// 戻り値: { open, closingSoon, label, todayRanges }
export function getOpenStatus(hours, lang, now = new Date()) {
  const dayKey = DAY_KEYS[now.getDay()]
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const ranges = rangesFor(hours, dayKey)
  const current = ranges.find(([a, b]) => nowMin >= a && nowMin < b)
  const next = ranges.find(([a]) => a > nowMin)
  const text = STATUS_TEXT[lang] || STATUS_TEXT.en

  const open = !!current
  const closingSoon = open && current[1] - nowMin <= 45
  let label
  if (current) label = text.until(fmt(current[1]))
  else if (ranges.length === 0) label = text.closedToday
  else if (next) label = text.opensAt(fmt(next[0]))
  else label = text.closedNow

  return { open, closingSoon, label, todayRanges: ranges }
}
