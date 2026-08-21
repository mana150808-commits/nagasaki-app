import { useState } from 'react'
import { getSurveyResults, clearSurveyResults } from '../services/submitSurvey.js'
import { StarIcon } from '../components/icons/NagasakiIcons.jsx'

// 開発者専用の隠しページ（ルート: /admin-results）。
// アプリ内のどのUIからもリンクを張っていないため、URLを知っている開発者だけが
// アクセスできる。ここで localStorage に溜まったアンケート回答を一覧表示する。
//
// ※ あくまでプロトタイプ用の簡易閲覧。本番では認証付きの管理画面や
//   バックエンドの管理ツールに置き換える想定。
export default function AdminResults() {
  const [results, setResults] = useState(() => getSurveyResults())

  const handleClear = () => {
    if (window.confirm('Delete all survey results?')) {
      clearSurveyResults()
      setResults([])
    }
  }

  // 平均評価
  const avg =
    results.length > 0
      ? (results.reduce((s, r) => s + (r.rating || 0), 0) / results.length).toFixed(2)
      : '—'

  return (
    <main className="flex flex-1 flex-col px-5 pb-10 pt-8">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-widest text-terracotta">
          developer only
        </p>
        <h1 className="font-display text-3xl text-navy">Survey Results</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink/80">
          <span>Responses: <b>{results.length}</b></span>
          <span>Avg: <b>{avg}</b></span>
        </div>
      </header>

      {results.length === 0 ? (
        <p className="card-hand rounded-blob p-6 text-center text-ink/60">
          No responses yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {[...results].reverse().map((r) => (
            <li key={r.id} className="card-hand rounded-blob p-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex gap-0.5 text-vermilion">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <StarIcon key={n} size={18} filled={n <= r.rating} />
                  ))}
                </div>
                <time className="font-jp text-xs text-ink/50">
                  {new Date(r.createdAt).toLocaleString()}
                </time>
              </div>
              {r.comment ? (
                <p className="whitespace-pre-wrap font-jp text-sm text-ink">{r.comment}</p>
              ) : (
                <p className="text-sm italic text-ink/40">(no comment)</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="press mt-6 self-start rounded-blob border-2 border-ink/70 bg-cream px-4 py-2 font-display text-lg text-vermilion shadow-hand"
        >
          Clear all
        </button>
      )}
    </main>
  )
}
