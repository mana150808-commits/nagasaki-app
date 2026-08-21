// アンケート送信処理を1か所に分離したサービス。
//
// 【実装方針：案A ＋ 案B の併用】
//  - 案B: 現段階はバックエンド未接続のプロトタイプのため、将来のAPI接続を
//         見据えて「送信処理」をこの関数に切り出しておく。今は console 出力＋
//         localStorage 保存にとどめる。将来はこの関数内を fetch(...) に
//         差し替えるだけでよく、呼び出し側（SurveyForm）は変更不要。
//  - 案A: 保存先は端末ローカルの localStorage。開発者（自分）だけが
//         非公開の隠しルート `/admin-results` から一覧を閲覧する。
//         一般ユーザーがアプリ内から他人の回答を見る導線は一切作らない。
//
// この方式を採った理由：バックエンドもホスティングも無いプロトタイプ段階で
// 最も実装が軽く、かつ将来のサーバー接続への移行が容易なため。

const STORAGE_KEY = 'nagasaki_survey_results'

// 保存済みの回答一覧を取得（新しい順ではなく保存順）。
export function getSurveyResults() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('[survey] failed to read results:', e)
    return []
  }
}

// 全回答を削除（開発者用）。
export function clearSurveyResults() {
  localStorage.removeItem(STORAGE_KEY)
}

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

  // --- 現段階の実装：console 出力 ＋ localStorage 保存 ---
  console.log('[survey] submitted:', entry)

  const results = getSurveyResults()
  results.push(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results))

  // --- 将来のバックエンド接続イメージ（今はコメントアウト）---
  // await fetch('/api/survey', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(entry),
  // })

  return { ok: true, entry }
}
