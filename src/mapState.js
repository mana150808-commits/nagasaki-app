// 「最後に開いたお店」を覚えておくための小さな入れ物。
//
// 目的：店舗ページから Back で地図に戻ったとき、地図が初期位置に戻ってしまうと
// どの店を見ていたのか分からなくなる。そこで直前に開いた店のピンを中心に表示する。
//
// sessionStorage に置いているのは、タブを閉じるまでの一時的な状態でよいため
// （次に来たときは通常どおり初期位置から始まる）。

const KEY = 'nagasaki_last_shop'

export function setLastShopId(id) {
  try {
    sessionStorage.setItem(KEY, id)
  } catch {
    // sessionStorageが使えない環境でも動作は継続する（初期位置で表示される）
  }
}

export function getLastShopId() {
  try {
    return sessionStorage.getItem(KEY)
  } catch {
    return null
  }
}

// 地図をその位置で表示し終えたら消す。
// 残したままだと、ホームに戻って開き直したときも店に寄ったままになるため。
export function clearLastShopId() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // 何もしない
  }
}
