// 「Walk Rings」リデザイン（Map/List/Filter/Place/Saved/Welcome）共通のUI文言。
// Nagasaki Eats Walk Rings 仕様書の support.js にある T テーブルをそのまま移植。

export const T = {
  en: {
    welcome: 'Eat well, a short walk away',
    welcomeSub: '13 places around Dormy Inn Nagasaki Shinchi Chinatown, sorted by how far you want to walk.',
    choose: 'Choose your language', start: 'Start',
    place: 'Dormy Inn · Shinchi Chinatown', title: 'Good food, a short walk away',
    min: 'min', minWalk: 'min walk', all: 'All',
    tabMap: 'Map', tabList: 'List', tabSaved: 'Saved', tabFeedback: 'Feedback',
    save: 'Save', savedL: 'Saved',
    filter: 'Filter', fTitle: 'Narrow it down', openNow: 'Open now', kind: 'Kind of food',
    walk: 'Walking distance', any: 'Any', reset: 'Reset', show: (n) => `Show ${n} places`,
    bands: ['Under 3 min', '3–6 min', '6–10 min', '10 min or more'],
    listTitle: 'Closest first', none: 'Nothing matches. Try another filter.',
    order: 'Order this', staff: 'Show this to the staff', meaning: '“One of these, please.”',
    taxi: 'Show this to your taxi driver', go: 'Directions', today: 'Today',
    savedTitle: 'Your list', savedSum: (n, m) => `${n} places · farthest is ${m} min`,
    empty: 'Tap ♡ on a place to keep it here.', closedDay: 'Closed',
  },
  zhCN: {
    welcome: '步行即达的美食', welcomeSub: '多米饭店长崎新地中华街周边的13家店，按步行距离挑选。',
    choose: '选择语言', start: '开始',
    place: '多米饭店 · 新地中华街', title: '步行即达的美食',
    min: '分钟', minWalk: '分钟步行', all: '全部',
    tabMap: '地图', tabList: '列表', tabSaved: '收藏', tabFeedback: '反馈',
    save: '收藏', savedL: '已收藏',
    filter: '筛选', fTitle: '筛选条件', openNow: '正在营业', kind: '料理类型',
    walk: '步行距离', any: '不限', reset: '重置', show: (n) => `显示 ${n} 家`,
    bands: ['3分钟以内', '3–6分钟', '6–10分钟', '10分钟以上'],
    listTitle: '由近到远', none: '没有符合条件的店。',
    order: '推荐点这个', staff: '请出示给店员', meaning: '“请给我一份这个。”',
    taxi: '请出示给出租车司机', go: '路线', today: '今天',
    savedTitle: '我的收藏', savedSum: (n, m) => `${n} 家 · 最远 ${m} 分钟`,
    empty: '点击 ♡ 即可收藏到这里。', closedDay: '休息',
  },
  zhTW: {
    welcome: '步行即達的美食', welcomeSub: '多米飯店長崎新地中華街周邊的13家店，依步行距離挑選。',
    choose: '選擇語言', start: '開始',
    place: '多米飯店 · 新地中華街', title: '步行即達的美食',
    min: '分鐘', minWalk: '分鐘步行', all: '全部',
    tabMap: '地圖', tabList: '列表', tabSaved: '收藏', tabFeedback: '意見回饋',
    save: '收藏', savedL: '已收藏',
    filter: '篩選', fTitle: '篩選條件', openNow: '正在營業', kind: '料理種類',
    walk: '步行距離', any: '不限', reset: '重設', show: (n) => `顯示 ${n} 家`,
    bands: ['3分鐘以內', '3–6分鐘', '6–10分鐘', '10分鐘以上'],
    listTitle: '由近到遠', none: '沒有符合條件的店。',
    order: '推薦點這個', staff: '請出示給店員', meaning: '「請給我一份這個。」',
    taxi: '請出示給計程車司機', go: '路線', today: '今天',
    savedTitle: '我的收藏', savedSum: (n, m) => `${n} 家 · 最遠 ${m} 分鐘`,
    empty: '點擊 ♡ 即可收藏到這裡。', closedDay: '公休',
  },
  ko: {
    welcome: '걸어서 갈 수 있는 맛집', welcomeSub: '도미인 나가사키 신치 차이나타운 주변 13곳, 걷는 거리로 골라 보세요.',
    choose: '언어를 선택하세요', start: '시작하기',
    place: '도미인 · 신치 차이나타운', title: '걸어서 갈 수 있는 맛집',
    min: '분', minWalk: '분 도보', all: '전체',
    tabMap: '지도', tabList: '목록', tabSaved: '저장', tabFeedback: '피드백',
    save: '저장', savedL: '저장됨',
    filter: '필터', fTitle: '조건 선택', openNow: '영업 중', kind: '음식 종류',
    walk: '도보 거리', any: '상관없음', reset: '초기화', show: (n) => `${n}곳 보기`,
    bands: ['3분 이내', '3–6분', '6–10분', '10분 이상'],
    listTitle: '가까운 순', none: '조건에 맞는 곳이 없어요.',
    order: '이 메뉴를 추천해요', staff: '직원에게 보여주세요', meaning: '“이거 하나 주세요.”',
    taxi: '택시 기사님께 보여주세요', go: '길찾기', today: '오늘',
    savedTitle: '내 목록', savedSum: (n, m) => `${n}곳 · 가장 먼 곳 ${m}분`,
    empty: '♡를 누르면 여기에 저장돼요.', closedDay: '휴무',
  },
  ja: {
    welcome: 'ホテルから歩いて行ける店', welcomeSub: 'ドーミーイン長崎新地中華街の周辺13店を、歩く距離で選べます。',
    choose: '言語を選んでください', start: 'はじめる',
    place: 'ドーミーイン · 新地中華街', title: 'ホテルから歩いて行ける店',
    min: '分', minWalk: '分・徒歩', all: 'すべて',
    tabMap: '地図', tabList: 'リスト', tabSaved: '保存', tabFeedback: 'フィードバック',
    save: '保存', savedL: '保存済み',
    filter: '絞り込み', fTitle: '条件を選ぶ', openNow: '営業中', kind: '料理の種類',
    walk: '歩く距離', any: '指定なし', reset: 'リセット', show: (n) => `${n}件を表示`,
    bands: ['3分以内', '3〜6分', '6〜10分', '10分以上'],
    listTitle: '近い順', none: '条件に合う店がありません。',
    order: 'おすすめの一品', staff: '店員さんに見せてください', meaning: '「これをひとつください」',
    taxi: 'タクシーの運転手さんに見せてください', go: '道順', today: '今日',
    savedTitle: '保存した店', savedSum: (n, m) => `${n}店 · いちばん遠い店まで${m}分`,
    empty: '♡を押すとここに保存されます。', closedDay: '定休日',
  },
}

export function t(key, lang) {
  const dict = T[lang] || T.en
  return dict[key] ?? T.en[key]
}

export const CATEGORY_KEYS = ['Chinese', 'Izakaya', 'Yakiniku', 'Bar', 'Cafe', 'Ramen', 'Sushi', 'Japanese']

export const CATEGORY_LABEL = {
  Chinese: { en: 'Chinese', zhCN: '中餐', zhTW: '中餐', ko: '중식', ja: '中華' },
  Izakaya: { en: 'Izakaya', zhCN: '居酒屋', zhTW: '居酒屋', ko: '이자카야', ja: '居酒屋' },
  Yakiniku: { en: 'Yakiniku', zhCN: '烤肉', zhTW: '燒肉', ko: '야키니쿠', ja: '焼肉' },
  Bar: { en: 'Bar', zhCN: '酒吧', zhTW: '酒吧', ko: '바', ja: 'バー' },
  Cafe: { en: 'Café', zhCN: '咖啡', zhTW: '咖啡', ko: '카페', ja: 'カフェ' },
  Ramen: { en: 'Ramen', zhCN: '拉面', zhTW: '拉麵', ko: '라멘', ja: 'ラーメン' },
  Sushi: { en: 'Sushi', zhCN: '寿司', zhTW: '壽司', ko: '스시', ja: '寿司' },
  Japanese: { en: 'Japanese', zhCN: '日式料理', zhTW: '日式料理', ko: '일식', ja: '和食' },
}

export const CATEGORY_COLOR = {
  Chinese: '#d67f48',
  Izakaya: '#728157',
  Yakiniku: '#b2622d',
  Bar: '#aebf92',
  Cafe: '#a19786',
  Ramen: '#9c4a7a',
  Sushi: '#3b6e8f',
  Japanese: '#8a7a4e',
}

export const FAVORITES_FILTER = '__favorites__'
