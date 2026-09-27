import { useEffect, useState } from 'react'

// お気に入りのお店（端末内に保存）。
//
// 旅行者がその場で「あとで行きたい店」を残しておくための機能なので、
// ログインは作らず localStorage に置く。端末を変えると引き継がれない。
//
// 画面が複数（店舗ページのハートと、地図の絞り込み）から同じ状態を見るため、
// 変更時に独自イベントを飛ばして互いに更新できるようにしている。

const KEY = 'nagasaki_favorites'
const EVENT = 'nagasaki-favorites-changed'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function isFavorite(shopId) {
  return getFavorites().includes(shopId)
}

// 登録／解除を切り替える。戻り値は切り替え後の状態（true＝登録済み）。
export function toggleFavorite(shopId) {
  const list = getFavorites()
  const next = list.includes(shopId) ? list.filter((id) => id !== shopId) : [...list, shopId]
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // localStorageが使えない環境では保存されない（その場限りの表示になる）
  }
  window.dispatchEvent(new CustomEvent(EVENT))
  return next.includes(shopId)
}

// お気に入りの変化を受け取るためのフック。
export function useFavorites() {
  const [favorites, setFavorites] = useState(getFavorites)

  useEffect(() => {
    const update = () => setFavorites(getFavorites())
    window.addEventListener(EVENT, update)
    // 別タブで変更された場合にも追従する
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener('storage', update)
    }
  }, [])

  return favorites
}

// MapViewなど、Reactの外側（DOM操作）から変化を知りたいとき用。
export function subscribeFavorites(handler) {
  window.addEventListener(EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}
