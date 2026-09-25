import { useState } from 'react'
import { useLanguage } from '../LanguageContext.jsx'

// 営業時間の表示（日〜土）。
// 常に出すと説明文より目立ってしまうため、ボタンを押したときだけ一覧を開く。
// データは shops.js の hours（曜日ごとの時間帯の配列。null は定休日）。
//
// 時刻は「17:00–24:00」のように24時間表記で持たせている。
// 深夜1時までの店は「19:00–25:00」ではなく「19:00–01:00」と書き、翌日分をまたぐ表記にしている。

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const DAY_LABEL = {
  sun: { en: 'Sun', zhCN: '周日', zhTW: '週日', ko: '일', ja: '日' },
  mon: { en: 'Mon', zhCN: '周一', zhTW: '週一', ko: '월', ja: '月' },
  tue: { en: 'Tue', zhCN: '周二', zhTW: '週二', ko: '화', ja: '火' },
  wed: { en: 'Wed', zhCN: '周三', zhTW: '週三', ko: '수', ja: '水' },
  thu: { en: 'Thu', zhCN: '周四', zhTW: '週四', ko: '목', ja: '木' },
  fri: { en: 'Fri', zhCN: '周五', zhTW: '週五', ko: '금', ja: '金' },
  sat: { en: 'Sat', zhCN: '周六', zhTW: '週六', ko: '토', ja: '土' },
}

const TEXT = {
  open: { en: 'Opening hours', zhCN: '营业时间', zhTW: '營業時間', ko: '영업시간', ja: '営業時間' },
  hide: { en: 'Hide hours', zhCN: '收起营业时间', zhTW: '收合營業時間', ko: '영업시간 닫기', ja: '営業時間を閉じる' },
  closed: { en: 'Closed', zhCN: '休息', zhTW: '公休', ko: '휴무', ja: '定休日' },
  today: { en: 'Today', zhCN: '今天', zhTW: '今天', ko: '오늘', ja: '今日' },
  note: {
    en: 'Hours may change on holidays. Please check before visiting.',
    zhCN: '节假日营业时间可能变动，请提前确认。',
    zhTW: '假日營業時間可能變動，請事先確認。',
    ko: '공휴일에는 영업시간이 달라질 수 있습니다.',
    ja: '祝日などは変更になる場合があります。',
  },
}

function pick(dict, lang) {
  return dict[lang] || dict.en
}

export default function OpeningHours({ hours }) {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)

  if (!hours) return null

  const todayKey = DAYS[new Date().getDay()]

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="press inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 font-hand text-sm font-bold text-white shadow-hand"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        {open ? pick(TEXT.hide, lang) : pick(TEXT.open, lang)}
      </button>

      {open && (
        <div className="mt-3 rounded-2xl bg-white/70 p-3 ring-1 ring-navy/10">
          <table className="w-full text-[15px]">
            <tbody>
              {DAYS.map((d) => {
                const isToday = d === todayKey
                const slots = hours[d]
                return (
                  <tr key={d} className={isToday ? 'font-bold text-navy' : 'text-ink/85'}>
                    <th scope="row" className="w-16 py-1 text-left font-normal">
                      <span className={isToday ? 'font-bold' : ''}>{pick(DAY_LABEL[d], lang)}</span>
                      {isToday && (
                        <span className="ml-1 text-[11px] font-bold uppercase text-vermilion">
                          {pick(TEXT.today, lang)}
                        </span>
                      )}
                    </th>
                    <td className="py-1">
                      {slots && slots.length > 0 ? (
                        slots.join(' / ')
                      ) : (
                        <span className="text-vermilion">{pick(TEXT.closed, lang)}</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="mt-2 text-xs leading-snug text-ink/60">{pick(TEXT.note, lang)}</p>
        </div>
      )}
    </div>
  )
}
