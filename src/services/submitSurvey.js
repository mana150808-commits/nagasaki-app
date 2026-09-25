// アンケート送信処理を1か所に分離したサービス。
//
// 【送信先：Googleスプレッドシート（Apps Script のウェブアプリ）】
//  回答は VITE_SURVEY_URL へ POST し、スプレッドシートの1行として追記される。
//  これにより端末をまたいで集計できる。
//  （以前は端末内のlocalStorageのみで、回答は答えた人のスマホから出ず、誰も集計できなかった）
//
//  URLは .env.local に VITE_SURVEY_URL として置く（*.local は .gitignore 済み）。
//  未設定のときは送信せず、開発用にコンソールへ出すだけにする。
//
// 【mode: 'no-cors' と text/plain について】
//  Apps Script のウェブアプリはCORSのプリフライト要求に応答しないため、
//  プリフライトが発生しない形（no-cors ＋ text/plain）で送る必要がある。
//  この方式では応答内容を読めないので、送信の成否はHTTP応答からは判定できない
//  （ネットワーク自体が失敗した場合のみ例外になる）。

const ENDPOINT = import.meta.env.VITE_SURVEY_URL

// アンケートを送信する。
// @param {{ rating: number, comment: string }} answer
// @returns {Promise<{ ok: boolean, entry: object }>}
export async function submitSurvey({ rating, comment }) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    rating,
    comment: (comment || '').trim(),
    createdAt: new Date().toISOString(),
  }

  // 送信先が未設定（ローカル開発など）のときは送らずにログだけ残す。
  if (!ENDPOINT) {
    console.log('[survey] VITE_SURVEY_URL is not set; not sent:', entry)
    return { ok: true, entry }
  }

  await fetch(ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(entry),
  })

  return { ok: true, entry }
}
