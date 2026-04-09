export type SimContent = {
  heading: string
  side: string
  attack: string
  defense: string
  preset: string
  facilityNames: string[]
  turretLabel: string
  siegeLabel: string
  buffLabel: string
  multiplierLabel: string
  siegeBonus: string
  progress: string
  remainingPt: string
  timeSec: string
  timeFormatted: string
  sec: string
  min: string
  attackBuffs: string[]
  defenseBuffs: string[]
}

const contents: Record<string, SimContent> = {
  ja: {
    heading: '占領時間シミュレーター',
    side: '陣営',
    attack: '攻撃側',
    defense: '防衛側',
    preset: '施設プリセット',
    facilityNames: ['小型拠点', '大都市', '中型拠点', '軍事要塞', 'ゴールデンパレス'],
    turretLabel: '砲塔（0〜4）',
    siegeLabel: '攻城強化装置（0〜2）',
    buffLabel: 'バフ',
    multiplierLabel: '速度倍率',
    siegeBonus: '攻城強化',
    progress: '進行度',
    remainingPt: '残りPt',
    timeSec: '占領時間（秒）',
    timeFormatted: '占領時間',
    sec: '秒',
    min: '分',
    attackBuffs: ['デフォルト（+30%）', '+バフ1段（+37.5%）', '+バフ2段（+45%）', '+バフ3段（+52.5%）'],
    defenseBuffs: ['デフォルト（+0%）', '+バフ1段（+7.5%）', '+バフ2段（+15%）', '+バフ3段（+22.5%）'],
  },
  en: {
    heading: 'Occupation Time Simulator',
    side: 'Side',
    attack: 'Attack',
    defense: 'Defense',
    preset: 'Facility Preset',
    facilityNames: ['Small Stronghold', 'Large City', 'Medium Stronghold', 'Military Fortress', 'Golden Palace'],
    turretLabel: 'Cannons (0–4)',
    siegeLabel: 'Siege Boosters (0–2)',
    buffLabel: 'Buff',
    multiplierLabel: 'Speed Multiplier',
    siegeBonus: 'Siege Boost',
    progress: 'Progress',
    remainingPt: 'Remaining Pt',
    timeSec: 'Time (sec)',
    timeFormatted: 'Time',
    sec: 's',
    min: 'm',
    attackBuffs: ['Default (+30%)', '+Buff Lv1 (+37.5%)', '+Buff Lv2 (+45%)', '+Buff Lv3 (+52.5%)'],
    defenseBuffs: ['Default (+0%)', '+Buff Lv1 (+7.5%)', '+Buff Lv2 (+15%)', '+Buff Lv3 (+22.5%)'],
  },
  ko: {
    heading: '점령 시간 시뮬레이터',
    side: '진영',
    attack: '공격측',
    defense: '방어측',
    preset: '시설 프리셋',
    facilityNames: ['소형 요새', '대형 도시', '중형 요새', '군사 요새', '황금 궁전'],
    turretLabel: '포탑 (0~4)',
    siegeLabel: '공성 강화 장치 (0~2)',
    buffLabel: '버프',
    multiplierLabel: '속도 배율',
    siegeBonus: '공성 강화',
    progress: '진행도',
    remainingPt: '남은 Pt',
    timeSec: '점령 시간 (초)',
    timeFormatted: '점령 시간',
    sec: '초',
    min: '분',
    attackBuffs: ['기본 (+30%)', '+버프 1단 (+37.5%)', '+버프 2단 (+45%)', '+버프 3단 (+52.5%)'],
    defenseBuffs: ['기본 (+0%)', '+버프 1단 (+7.5%)', '+버프 2단 (+15%)', '+버프 3단 (+22.5%)'],
  },
  'zh-TW': {
    heading: '佔領時間模擬器',
    side: '陣營',
    attack: '進攻方',
    defense: '防守方',
    preset: '設施預設',
    facilityNames: ['小型據點', '大型城市', '中型據點', '軍事要塞', '掘金城'],
    turretLabel: '巨砲（0〜4）',
    siegeLabel: '攻城強化裝置（0〜2）',
    buffLabel: '增益',
    multiplierLabel: '速度倍率',
    siegeBonus: '攻城強化',
    progress: '進度',
    remainingPt: '剩餘 Pt',
    timeSec: '佔領時間（秒）',
    timeFormatted: '佔領時間',
    sec: '秒',
    min: '分',
    attackBuffs: ['預設（+30%）', '+增益1階（+37.5%）', '+增益2階（+45%）', '+增益3階（+52.5%）'],
    defenseBuffs: ['預設（+0%）', '+增益1階（+7.5%）', '+增益2階（+15%）', '+增益3階（+22.5%）'],
  },
  'zh-CN': {
    heading: '占领时间模拟器',
    side: '阵营',
    attack: '进攻方',
    defense: '防守方',
    preset: '设施预设',
    facilityNames: ['小型据点', '大型城市', '中型据点', '军事要塞', '掘金城'],
    turretLabel: '巨炮（0〜4）',
    siegeLabel: '攻城强化装置（0〜2）',
    buffLabel: '增益',
    multiplierLabel: '速度倍率',
    siegeBonus: '攻城强化',
    progress: '进度',
    remainingPt: '剩余 Pt',
    timeSec: '占领时间（秒）',
    timeFormatted: '占领时间',
    sec: '秒',
    min: '分',
    attackBuffs: ['默认（+30%）', '+增益1阶（+37.5%）', '+增益2阶（+45%）', '+增益3阶（+52.5%）'],
    defenseBuffs: ['默认（+0%）', '+增益1阶（+7.5%）', '+增益2阶（+15%）', '+增益3阶（+22.5%）'],
  },
  ar: {
    heading: 'محاكي وقت الاحتلال',
    side: 'الفريق',
    attack: 'الهجوم',
    defense: 'الدفاع',
    preset: 'إعداد المنشأة',
    facilityNames: ['قاعدة صغيرة', 'مدينة كبرى', 'قاعدة متوسطة', 'حصن عسكري', 'القصر الذهبي'],
    turretLabel: '(0-4) المدفع',
    siegeLabel: '(0-2) معزز الحصار',
    buffLabel: 'تعزيز',
    multiplierLabel: 'مضاعف السرعة',
    siegeBonus: 'تعزيز الحصار',
    progress: 'التقدم',
    remainingPt: 'النقاط المتبقية',
    timeSec: 'الوقت (ثانية)',
    timeFormatted: 'الوقت',
    sec: 'ث',
    min: 'د',
    attackBuffs: ['افتراضي (+30%)', '+تعزيز 1 (+37.5%)', '+تعزيز 2 (+45%)', '+تعزيز 3 (+52.5%)'],
    defenseBuffs: ['افتراضي (+0%)', '+تعزيز 1 (+7.5%)', '+تعزيز 2 (+15%)', '+تعزيز 3 (+22.5%)'],
  },
}

export function getSimContent(locale: string): SimContent {
  return contents[locale] ?? contents['en']
}
