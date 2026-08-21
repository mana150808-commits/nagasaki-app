import { useState } from 'react'
import { StarIcon } from './icons/NagasakiIcons.jsx'
import { submitSurvey } from '../services/submitSurvey.js'

// このアプリ自体への評価アンケート。
// ①5段階評価（星）②自由記述 ③送信 → 送信後にお礼メッセージを表示。
export default function SurveyForm() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0 || submitting) return
    setSubmitting(true)
    try {
      await submitSurvey({ rating, comment })
      setDone(true)
    } catch (err) {
      console.error(err)
      alert('Sorry, something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  // 送信完了後のお礼メッセージ
  if (done) {
    return (
      <div className="card-hand rounded-blob2 p-8 text-center">
        <div className="mb-3 flex justify-center gap-1 text-vermilion">
          {[1, 2, 3, 4, 5].map((n) => (
            <StarIcon key={n} size={30} filled={n <= rating} />
          ))}
        </div>
        <h2 className="font-display text-4xl text-terracotta">Thank you!</h2>
        <p className="mt-4 text-sm text-ink/60">
          Your feedback helps us make Nagasaki trips better.
        </p>
      </div>
    )
  }

  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Love it!']

  return (
    <form onSubmit={handleSubmit} className="card-hand rounded-blob2 p-6">
      {/* ① 5段階評価（星） */}
      <fieldset className="mb-6">
        <legend className="mb-3 font-display text-2xl text-navy">How was it?</legend>
        <div className="flex items-center justify-center gap-1.5 text-vermilion">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="press p-1 transition-transform hover:scale-110"
            >
              <StarIcon size={40} filled={n <= (hover || rating)} />
            </button>
          ))}
        </div>
        <p className="mt-2 h-5 text-center font-jp text-sm text-terracotta">
          {labels[hover || rating]}
        </p>
      </fieldset>

      {/* ② 自由記述 */}
      <div className="mb-6">
        <label htmlFor="comment" className="mb-2 block font-display text-xl text-navy">
          Comments <span className="text-sm text-ink/60">(optional)</span>
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Tell us anything…"
          className="w-full resize-none rounded-blob border-2 border-ink/60 bg-cream/60 p-3 text-base text-ink outline-none placeholder:text-ink/40 focus:border-navy"
        />
      </div>

      {/* ③ 送信ボタン */}
      <button
        type="submit"
        disabled={rating === 0 || submitting}
        className="press w-full rounded-blob border-2 border-ink/80 bg-vermilion py-3 font-display text-2xl text-cream shadow-hand disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? 'Sending…' : 'Send'}
      </button>
      {rating === 0 && (
        <p className="mt-2 text-center text-xs text-ink/50">
          Please pick a star rating.
        </p>
      )}
    </form>
  )
}
