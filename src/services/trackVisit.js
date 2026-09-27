// 利用者数を数えるための記録。
//
// 1つの端末につき1回だけ送る（初めてアプリを開いたとき）。
// QRから開いても、URLを直接開いても、ホーム画面のアイコンから起動しても記録される。
// 2回目以降は送らないので、スプレッドシートの行数がそのまま利用者数になる。
//
// 端末IDはこのアプリ用のランダムな文字列で、端末内(localStorage)にだけ保存する。
// 個人を特定する情報（名前・メール・位置・広告IDなど）は一切送らない。
//
// 開発中（localhost等）のアクセスは送らない。手元の動作確認が利用者数に混ざるため。
//
// 【この数え方の限界】
//  ・同じ人が2台で開けば2人として数える。
//  ・端末のデータを消すと、同じ人がもう一度数えられる。
//  ・localStorageが使えない設定（プライベートブラウズ等）では、開くたびに数えられる。
//  よって、あくまで目安の数値として扱う。

const DEVICE_KEY = 'nagasaki_device_id'
const ENDPOINT = import.meta.env.VITE_SURVEY_URL

// 開発中のアクセス（localhostやプレビュー）は利用者数に混ぜない。
// これが無いと、手元での動作確認がそのまま利用者として数えられてしまう。
function isDevAccess() {
  const host = window.location.hostname
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.local') ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) // 同一Wi-Fi内で --host 起動して確認する場合
  )
}

function platform() {
  const ua = window.navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
    return 'ios'
  }
  if (/Android/.test(ua)) return 'android'
  return 'other'
}

// ブラウザで見ているのか、ホーム画面のアイコンから起動したのか
function displayMode() {
  try {
    const standalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    return standalone ? 'app' : 'browser'
  } catch {
    return 'browser'
  }
}

// QRコードのURLに ?src=front のように付けておくと、どの掲示から来たかが分かる。
// 例）フロント=front、客室=room、エレベーター=elevator
function source() {
  try {
    return new URLSearchParams(window.location.search).get('src') || ''
  } catch {
    return ''
  }
}

// アプリ起動時に1回だけ呼ぶ。初回の端末以外は何もしない。
export function trackVisit() {
  if (!ENDPOINT || isDevAccess()) return

  let deviceId
  try {
    if (localStorage.getItem(DEVICE_KEY)) return // 記録済みの端末 → 送らない
    deviceId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
    // 送信の成否に関わらず、二重に数えないよう先に保存する
    localStorage.setItem(DEVICE_KEY, deviceId)
  } catch {
    // localStorageが使えない環境。重複する可能性がある点は上記のとおり。
    deviceId = 'unknown'
  }

  fetch(ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      type: 'visit',
      deviceId,
      platform: platform(),
      display: displayMode(),
      source: source(),
      lang: navigator.language || '',
      // どのドメインから開かれたか（本番か、プレビュー用のURLかを後から見分けるため）
      host: window.location.hostname,
      createdAt: new Date().toISOString(),
    }),
  }).catch(() => {
    // 送信できなくてもアプリの利用は妨げない
  })
}
